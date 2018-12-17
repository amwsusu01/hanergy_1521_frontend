<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/canteenPurchase'}">1521报表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/canteenOrder'}">1521数据汇总统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="box">
            <div class="rightline">更新时间: 2018-01-01</div>
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini">
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <el-select v-model="form.region" multiple collapse-tags placeholder="请选择部门" size="mini">
                        <el-option v-for="item in this.deptList" :key="item" :label="item" :value="item" style="width: 220px">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职级:" size="mini" class="zhiji" prop="rankname">
                    <el-select v-model="form.rankname" multiple collapse-tags placeholder="请选择职级" size="mini">
                        <el-option v-for="item in this.rankOptions" :key="item" :label=item :value=item>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:120px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" @change="changeTime(form.date.date1)" v-model="form.date.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:120px;display: inline-block">
                        <el-date-picker size="mini" type="month" :placeholder=initTime @change="changeEndTime(form.date.date2)" :picker-options="pickerOptions" v-model="form.date.date2" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <div style="display: inline-block">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </div>
            </el-form>
        </div>
        <div>
            <div id="assemblyChart" class="relationShipChart"></div>
            <!--<div class="download"></div>-->
            <div id="assemblyFiveChart" class="relationShipChart"></div>
            <div id="assemblyThreeChart" class="relationShipChart"></div>
            <div id="assemblyFourChart" class="relationShipChart"></div>
            <div id="assemblyTwoChart" class="relationShipChart"></div>
            <div id="assemblySixChart" class="relationShipChart"></div>
        </div>
    </div>
</template>
<script>
import Paging from '../../../components/common/Paging';
export default {
    name: "canteenOrder",
    components: {
        //Paging
    },
    data() {
        return {
            //图一
            chartOption: {
                title: {
                    text: '超过4次(含)未请假未提报统计报表',
                    textStyle: {
                        fontSize: 16,
                    }
                },
                legend: { //图例位置
                    data: ['提报人数', '占比'],
                    top: 30,
                    // bottom: -7
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        // nameTextStyle:{
                        //     width: 20%
                        // },
                        // nameLocation: 'center', //坐标名称位置
                        // nameGap: 42,
                        // nameRotate: -90,
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        // nameLocation: 'center',
                        // nameRotate: -90,
                        // nameGap: 35,
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per
                    }
                ]
            },
            assemblyChart: null,
            //图二
            chartTwoOption: {
                title: {
                    text: '提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)',
                    textStyle: {
                        fontSize: 16
                    }
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month2
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt2
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per2,
                    }
                ]
            },
            assemblyFiveChart: null,
            //图三
            chartThreeOption: {
                title: {
                    text: '提报月平均条数小于5',
                    textStyle: {
                        fontSize: 16
                    }
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month3
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt3
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per3,
                    }
                ]
            },
            assemblyThreeChart: null,
            //图四
            chartFourOption: {
                title: {
                    text: '提报月平均字数小于5',
                    textStyle: {
                        fontSize: 16
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month4
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt4
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per4,
                    }
                ]
            },
            assemblyFourChart: null,
            //图五
            chartFiveOption: {
                title: {
                    text: '9点之前提报统计报表/一个月累计出现3次(含)9点',
                    textStyle: {
                        fontSize: 14
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month5
                },
                yAxis: [{
                        type: 'value',
                        // min: 0,
                        // max: 10,
                        // interval: 1,
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        // min: 0,
                        // max: 100,
                        // interval: 10,
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];
                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt5
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per5
                    }
                ]
            },
            assemblyTwoChart: null,
            //图六
            chartSixOption: {
                title: {
                    text: '12点之前提报统计报表/一个月累计出现3次(含)12点',
                    textStyle: {
                        fontSize: 16
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month6
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }

                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt6
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: this.per6,
                    }
                ]
            },
            assemblySixChart: null,

            dzq: [],
            jdzqarray: [], //九点之前
            cnt: [],
            per: [],
            in_month: [],
            cnt2: [],
            per2: [],
            in_month2: [],
            cnt3: [],
            per3: [],
            in_month3: [],
            cnt4: [],
            per4: [],
            in_month4: [],
            cnt5: [],
            per5: [],
            in_month5: [],
            cnt6: [],
            per6: [],
            in_month6: [],
            initTime: "2018-12-01 00:00:00", //初始化的时间
            startTimeUnix: 0,
            deptList: [],
            rankOptions: ["21-24", "15-20", "10-14", "05-09", "01-04"],
            form: {
                rankname: '', //职级
                region: [], //部门
                date: {
                    date1: "",
                    date2: ""
                }
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return new Date(time) < this.startTimeUnix;
                }
            },
            orderList: [], // 订单列表
            response: false, // 加载完成
            page: {
                pageShowNum: 10, // 每页展示多少条
                totalNumber: '', // 总条数
                thisPage: 1, // 当前第几页
                thisTotalNumber: '', // 当前页总条数
            }
        }
    },
    mounted() {
        this.init();
        // this.queryList(); //查询
        this.getSelectPermission(); //获取部门
        this.form.date.date1 = this.initTime; //默认显示时间
        this.form.date.date2 = this.initTime; //默认显示时间
        // this.changeTime(); //时间改变
    },
    methods: {
        init() {
            //一图
            this.assemblyChart = this.echarts.init(document.getElementById('assemblyChart'));
            let options = this.chartOption;
            this.assemblyChart.setOption(options, true);
            //二图
            this.assemblyFiveChart = this.echarts.init(document.getElementById('assemblyFiveChart'));
            let optionsFive = this.chartTwoOption;
            this.assemblyFiveChart.setOption(optionsFive, true);
            //三图
            this.assemblyThreeChart = this.echarts.init(document.getElementById('assemblyThreeChart'));
            let optionsThree = this.chartThreeOption;
            this.assemblyThreeChart.setOption(optionsThree, true);
            //四图
            this.assemblyFourChart = this.echarts.init(document.getElementById('assemblyFourChart'));
            let optionsFour = this.chartFourOption;
            this.assemblyFourChart.setOption(optionsFour, true);
            //五图
            this.assemblyTwoChart = this.echarts.init(document.getElementById('assemblyTwoChart'));
            let optionsTwo = this.chartFiveOption;
            this.assemblyTwoChart.setOption(optionsTwo, true);
            //六图
            this.assemblySixChart = this.echarts.init(document.getElementById('assemblySixChart'));
            let optionsSix = this.chartSixOption;
            this.assemblySixChart.setOption(optionsSix, true);
            this.queryList()
        },
        //点击查询调用接口
        queryList() {
            var params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.date1.substring(0, 7),
                endDate: this.form.date.date2.substring(0, 7),
            }
            this.$api.canteen.getQueryList(params).then(res => {
                var objList = res || {};
                var cgscarray = []
                var cgltarray = []
                var sedzqarray = []
                var jdzqarray = []
                var tsxywarray = []
                var jdzqarray = []

                var cgscarray = JSON.parse(objList.cgsc)
                var cgltarray = JSON.parse(objList.cglt)
                var sedzqarray = JSON.parse(objList.sedzq)
                var jdzqarray = JSON.parse(objList.jdzq)
                var tsxywarray = JSON.parse(objList.tsxyw)
                var zsxywarray = JSON.parse(objList.zsxyw)
                ////图五
                this.cnt5 = [] //人数
                this.per5 = [] //百分比
                this.in_month5 = []
                for (let i in jdzqarray) {
                    this.cnt5.push(jdzqarray[i].cnt) //人数
                    this.per5.push(jdzqarray[i].per) //百分比
                    this.in_month5.push(jdzqarray[i].in_month) //月份
                }
                var temp = this.chartFiveOption;
                temp.series[0].data = this.cnt5;
                temp.series[1].data = this.per5
                temp.xAxis.data = this.in_month5;
                this.assemblyTwoChart.setOption(temp, true);
                ///图一
                this.cnt = [] //人数
                this.per = [] //百分比
                this.in_month = []
                for (let i in cgscarray) {
                    this.cnt.push(cgscarray[i].cnt) //人数
                    this.per.push(cgscarray[i].per) //百分比
                    this.in_month.push(cgscarray[i].in_month) //月份
                }
                var tempFive = this.chartOption;
                tempFive.series[0].data = this.cnt;
                tempFive.series[1].data = this.per
                tempFive.xAxis.data = this.in_month;
                this.assemblyChart.setOption(tempFive, true);
                ///图二
                this.cnt2 = [] //人数
                this.per2 = [] //百分比
                this.in_month2 = []
                for (let i in cgltarray) {
                    this.cnt2.push(cgltarray[i].cnt) //人数
                    this.per2.push(cgltarray[i].per) //百分比
                    this.in_month2.push(cgltarray[i].in_month) //月份
                }
                var tempTwo = this.chartTwoOption;
                tempTwo.series[0].data = this.cnt2;
                tempTwo.series[1].data = this.per2
                tempTwo.xAxis.data = this.in_month2;
                this.assemblyFiveChart.setOption(tempTwo, true);

                ///图三
                this.cnt3 = [] //人数
                this.per3 = [] //百分比
                this.in_month3 = []
                for (let i in tsxywarray) {
                    this.cnt3.push(tsxywarray[i].cnt) //人数
                    this.per3.push(tsxywarray[i].per) //百分比
                    this.in_month3.push(tsxywarray[i].in_month) //月份
                }
                var tempThree = this.chartThreeOption;
                tempThree.series[0].data = this.cnt3;
                tempThree.series[1].data = this.per3
                tempThree.xAxis.data = this.in_month3;
                this.assemblyThreeChart.setOption(tempThree, true);

                ///图四
                this.cnt4 = [] //人数
                this.per4 = [] //百分比
                this.in_month4 = []
                for (let i in zsxywarray) {
                    this.cnt4.push(zsxywarray[i].cnt) //人数
                    this.per4.push(zsxywarray[i].per) //百分比
                    this.in_month4.push(zsxywarray[i].in_month) //月份
                }
                var tempFour = this.chartFourOption;
                tempFour.series[0].data = this.cnt4;
                tempFour.series[1].data = this.per4
                tempFour.xAxis.data = this.in_month4;
                this.assemblyFourChart.setOption(tempFour, true);

                ///图六
                this.cnt6 = [] //人数
                this.per6 = [] //百分比
                this.in_month6 = []
                for (let i in sedzqarray) {
                    this.cnt6.push(sedzqarray[i].cnt) //人数
                    this.per6.push(sedzqarray[i].per) //百分比
                    this.in_month6.push(sedzqarray[i].in_month) //月份
                }
                var tempSix = this.chartSixOption;
                tempSix.series[0].data = this.cnt6;
                tempSix.series[1].data = this.per6
                tempSix.xAxis.data = this.in_month6;
                this.assemblySixChart.setOption(tempSix, true);
                // this.response = true;
            })
        },
        //部门接口
        getSelectPermission() {
            var params = {
                userCode: 2
            }
            this.$api.canteen.getSelectPermission(params).then(res => {
                let user = JSON.parse(res.user) || [];
                for (let j = 0; j < user.length; j++) {
                    let deptName = user[j].dept_name;
                    this.deptList.push(deptName)
                    let dept_id = user[j].dept_id;
                }
            })
        },
        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            this.form.date.date1 = this.initTime; //默认显示时间
            this.form.date.date2 = this.initTime; //默认显示时间
        },
        //开始时间选择改变的函数
        changeTime(startDateTime) {
            if (startDateTime) {
                let changeTimechuo = startDateTime + '-01 00:00:00';
                changeTimechuo = Date.parse(startDateTime.replace(/-/g, "/"));
                this.startTimeUnix = changeTimechuo;
            }
        },
        //结束时间选择改变的函数
        changeEndTime(startDateTime) {
            if (startDateTime) {
                this.form.date.date2 = startDateTime.getTime();
                let dateEnd = new Date(this.form.date.date2);
                let Y = dateEnd.getFullYear() + '-';
                let M = (dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1) : dateEnd.getMonth() + 1);
                this.form.date.date2 = Y + M;
                return this.form.date.date2;
            }

        }
    },
    /**
     * 监控数据
     */
    watch: {
        $route(to, from) {
            this.routeFrom = (from && from.name) || "";
        }
    }

}
</script>
<style scoped>
.box {}

.rightline {
    margin-top: 15px;
    margin-right: 25px;
    text-align: right;
}

.contain {
    margin-top: 10px;
    display: inline-block;
}

.zhiji {
    margin-top: 6px;
    display: inline-block;
}

.query {
    margin-left: 30px;
    display: inline-block;
}

.reset {
    display: inline-block;
    /*margin-left: 30px;*/
}

.relationShipChart {
    width: 500px;
    height: 330px;
    margin-top: 4px;
    margin-bottom: 20px;
    margin-right: 30px;
    position: relative;
    display: inline-block;
}

.download {
    background: url("../../../assets/img/noSearch.png") no-repeat;
    background-size: cover;
    width: 30px;
    height: 30px;
    position: relative;
    top: -430px;
    right: -380px;
}
</style>