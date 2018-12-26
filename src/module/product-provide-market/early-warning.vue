<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" :label-width="shortLabel" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="product" label="产品系列" :label-width="shortLabel">
                            <product-select :productList="productList" ref="productList" @getWarningDetailed="getWarningDetailed()"></product-select>
                            <!--<el-select v-model="form.product" placeholder="无限制" style="width: 100%">-->
                            <!--<el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>-->
                            <!--</el-select>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="date" label="日期" :label-width="shortLabel">
                            <el-date-picker type="date" placeholder="无限制" @change="changeDate" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>一级预警次数</p>
                            <h5 @click="earlyWarning(1)">{{oneLevel}}</h5>
                        </div>
                        <div class="line-chart-level" id="lineChart1"></div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>二级预警次数</p>
                            <h5  @click="earlyWarning(2)">{{twoLevel}}</h5>
                        </div>
                        <div class="line-chart-level" id="lineChart2"></div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>三级预警次数</p>
                            <h5  @click="earlyWarning(3)">{{threeLevel}}</h5>
                        </div>
                        <div class="line-chart-level" id="lineChart3"></div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <!-- <div>
                        <label style="font-size: 14px;color: #606266;">预警节点</label>
                        <el-select v-model="selectLevel" multiple size="mini" placeholder="无限制" :collapse-tags="true">
                            <el-option v-for="item in options.levels" :label="item" :value="item"></el-option>
                        </el-select>
                    </div> -->
                    <div size="small" class="radio-button-groups">
                        <span :class="{'tab-span':true,'active':selectLevel==1}" @click="handelSelectLevel(1,'10%')" >一级预警</span>
                        <span :class="{'tab-span':true,'active':selectLevel==2}" @click="handelSelectLevel(2,'30%')">二级预警</span>
                        <span :class="{'tab-span':true,'active':selectLevel==3}" @click="handelSelectLevel(3,'50%')">三级预警</span>
                    </div>
                    <div class="right-line-chart" id="rightLineChart1"></div>
                </el-col>
            </el-row>
            <div style="width:100%;max-width: 1200px;position: relative;">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="dataList" border style="width: 100%">
                    <el-table-column prop="month" label="到期明细表" label-class-name="table-title title-th">
                        <el-table-column prop="FD_CAIGOUSHENQING" label="采购申请" label-class-name="title-th" min-width="30%" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="fd_shiyebu" label="事业部" label-class-name="title-th" min-width="10%" width="100px">
                        </el-table-column>
                        <el-table-column prop="FD_WULIAOBIANHAO" label="物料号" label-class-name="title-th" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="FD_WULIAOMIAOSHU" label="物料描述" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="fd_name" label="提交人" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="new_stage" label="最新阶段" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="new_jihua" label="最新计划" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="daoqi" label="到期预警" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pagesize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import productSelect from '../../components/common/product-select';

export default {
    name: 'early-warning',
    data() {
        return {
            dataList: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                keyword: '',
                product: [],
                date: this.$moment().subtract(1, 'days').format('YYYY-MM-DD')
            },
            shortLabel: 80,
            // options: {
            //     options1: [],
            //     levels: ['10%', '30%', '50%']
            // },
            selectLevel: 1,
            oneLevel: "",
            twoLevel: "",
            threeLevel: "",
            process: [], //阶段
            sumCount: [], //数量
            processCount: [], //百分比
            warningType: "",
            dataChart: [],
            warnChart: [],
            chartDataOption: {
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        rotate: 45,
                    },
                    data: this.dataChart
                }],
                yAxis: {
                    type: 'value',
                    // min: 0,
                    // max: 6,
                    splitNumber: 2
                },
                grid: {
                    x: 25
                },
                legend: {
                    data: ['预警数'],
                    top: 20
                },
                series: [{
                    name: '预警数',
                    data: this.warnChart,
                    type: 'line'
                }]
            },
            lineChartOption: {
                title: {
                    // text: '预警订单延迟点',
                    // textStyle: {
                    //     fontSize: 14,
                    //     color: '#606266',
                    //     fontWeight: 'normal'
                    // }
                },
                legend: { //图例位置
                    data: ['数量', '百分比'],
                    top: 30,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                // dataZoom: [{
                //     id: 'dataZoomX',
                //     type: 'slider',
                //     xAxisIndex: [0],
                //     filterMode: 'filter'
                // }, ],
                grid: {
                    //containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        rotate: 45,
                    },
                    splitLine: { show: false }, //横轴的线
                    data: this.process
                },
                yAxis: [{
                        type: 'value',
                        name: '数量',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '百分比(%)',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '数量',
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
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.sumCount
                    },
                    {
                        name: '百分比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: '#7a70c2'
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.processCount
                    }
                ]
            }
        }
    },
    components: {
        productSelect,
    },
    methods: {
        handelSelectLevel(type, per) {
            this.selectLevel = type;
            this.getWarning();
        },
        changeDate(val) {
            this.form.date = val
            this.getWarning();
            this.getWarningDetailed();

        },
        earlyWarning(type) {
            switch (type) {
                case 1:
                    this.warningType = "yujing1";
                    break;
                case 2:
                    this.warningType = "yujing2";
                    break;
                case 3:
                    this.warningType = "yujing3";
                    break;
            }
            this.getWarningDetailed();
        },
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val
            this.getWarningDetailed();
        },
        getData() {
            let oneOption = Object.assign(this.chartDataOption, {
                /*title: {
                    text: '一级预警趋势',
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        color: '#606266',
                        fontWeight: 'normal'
                    }
                }*/
            });
            let twoOption = Object.assign(this.chartDataOption, {
                /*title: {
                    text: '二级预警趋势',
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        color: '#606266',
                        fontWeight: 'normal'
                    }
                }*/
            })
            let threeOption = Object.assign(this.chartDataOption, {
                /*title: {
                    text: '三级预警趋势',
                    show: true,
                    textStyle: {
                        fontSize: 14,
                        color: '#606266',
                        fontWeight: 'normal'
                    }
                }*/
            })
            this.oneLevelChart = this.echarts.init(document.getElementById('lineChart1'));
            this.oneLevelChart.setOption(oneOption, true);
            this.twoLevelChart = this.echarts.init(document.getElementById('lineChart2'));
            this.twoLevelChart.setOption(twoOption, true);
            this.threeLevelChart = this.echarts.init(document.getElementById('lineChart3'));
            this.threeLevelChart.setOption(threeOption, true);

            this.lineChart = this.echarts.init(document.getElementById('rightLineChart1'));
            this.lineChart.setOption(this.lineChartOption, true);
        },
        getWarning() {
            let warning = "10%"
            switch (this.selectLevel) {
                case 1:
                    warning = '10%';
                    break;
                case 2:
                    warning = '30%';
                    break;
                case 3:
                    warning = '50%';
                    break;
            }
            let params = {
                Product: this.getProduct(),
                Date: this.form.date,
                Warning: warning
            }
            //预警统计图
            this.$api.common.getWarning(params).then(res => {
                let yjcs = JSON.parse(res.yjcs) || []; //预警次数
                this.oneLevel = yjcs[0].one_count;
                this.twoLevel = yjcs[0].two_count;
                this.threeLevel = yjcs[0].three_count;

                let yjqs = JSON.parse(res.yjqs) || []; //预警趋势图
                var dataChart = [];
                var warnChart1 = [];
                var warnChart2 = [];
                var warnChart3 = [];
                for (let i = 0; i < yjqs.length; i++) {
                    warnChart1.push(yjqs[i].one_count);
                    warnChart2.push(yjqs[i].two_count);
                    warnChart3.push(yjqs[i].three_count);
                    dataChart.push(this.$moment(yjqs[i].in_date_qs).format("YYYY-MM-DD"));
                }
                this.oneLevelChart = this.echarts.init(document.getElementById('lineChart1'));
                this.oneLevelChart.setOption(Object.assign(this.chartDataOption, {
                    series: [{
                        name: '预警数',
                        data: warnChart1,
                        type: 'line'
                    }],
                    xAxis: [{
                        type: 'category',
                        axisLabel: {
                            rotate: 45,
                        },
                        data: dataChart
                    }],
                }), true);

                this.twoLevelChart = this.echarts.init(document.getElementById('lineChart2'));
                this.twoLevelChart.setOption(Object.assign(this.chartDataOption, {
                    series: [{
                        name: '预警数',
                        data: warnChart2,
                        type: 'line'
                    }],
                    xAxis: [{
                        type: 'category',
                        axisLabel: {
                            rotate: 45,
                        },
                        data: dataChart
                    }],
                }), true);

                this.threeLevelChart = this.echarts.init(document.getElementById('lineChart3'));
                this.threeLevelChart.setOption(Object.assign(this.chartDataOption, {
                    series: [{
                        name: '预警数',
                        data: warnChart3,
                        type: 'line'
                    }],
                    xAxis: [{
                        type: 'category',
                        axisLabel: {
                            rotate: 45,
                        },
                        data: dataChart
                    }],
                }), true);
                //this.lineChart.setOption(this.lineChartOption, true);

                let yjjd = JSON.parse(res.yjjd) //预警节点柱状图
                this.process = [];
                this.sumCount = [];
                this.processCount = [];
                for (let i in yjjd) {
                    this.process.push(yjjd[i].process) //阶段
                    this.sumCount.push(yjjd[i]['sum(process_count)']) //数量
                    this.processCount.push(yjjd[i]['sum(process_count)/sum(all_count)']) //百分比
                }
                var temp = this.lineChartOption;
                temp.xAxis.data = this.process;
                temp.series[0].data = this.sumCount;
                temp.series[1].data = this.processCount;
                this.lineChart = this.echarts.init(document.getElementById('rightLineChart1'));
                this.lineChart.setOption(temp, true);

            })
        },
        getWarningDetailed() {
            let param = {
                countDate: this.form.date, //统计日期
                products: this.getProduct(), // 产品列
                type: this.warningType, // 预警类型 // yujing1: 一级 yujing2: 二级 yujing3: 三级
                page: this.page.currentPage, //分页
                pageSize: this.page.pagesize //   分页
            }
            //预警详细
            this.$api.common.warningDetailed(param).then(res => {
                this.dataList = res.list || [];
                this.page.totalNumber = res.count;
            })
        },
        getProduct() {
            if (this.$refs['productList']) {
                this.form.product = this.$refs['productList'].values.concat();
            }
            let resProducts = '';
            if (this.form.product.length > 0) {
                resProducts = this.form.product.join(',');
            } else {
                let productNames = this.productList.map((a) => {
                    return a.chanpin_name;
                })

                resProducts = productNames.join(',');
            }
            return resProducts;
        },
        init() {
            if (this.productList.length > 0) {
                this.form.product = this.productList.map((a) => a.chanpin_name);
                if (this.$refs['productList']) {
                    this.$refs['productList'].values = this.form.product.concat();
                }
            }
        }
    },
    computed: {
        setPsmDept: {
            get() {
                return this.$store.state.common.dept;
            },
            set(val) {
                this.$store.commit('setPsmDept', val);
            }
        },
        productList: {
            get() {
                return this.$store.state.common.product || [];
            },
            set(val) {
                this.$store.commit('productList', val);
            }
        },
        setPsmUser: {
            get() {
                return this.$store.state.common.psmuser;
            },
            set(val) {
                this.$store.commit('setPsmUser', val);
            }
        },
    },
    mounted() {
        //this.getData();
        //this.init(); //产品/事业/提交人表

        this.$nextTick(() => {
            if (this.productList.length > 0) {
                this.getWarning(); //预警接口
                this.getWarningDetailed(); //预警明细
            }
        })
    },
    watch: {
        'productList': function(newVal, oldVal) {
            if (newVal.length > 0 && oldVal && oldVal.length == 0) {

                this.getWarning(); //预警接口
                this.getWarningDetailed(); //预警明细
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}

.left-line-chart {
    .top-box {
        width: 80%;
        margin: 0 10%;
        padding: 5%;
        height: 80px;

        /* background: yellow; */
        & p {
            font-size: 14px;
            color: #444444;
        }

        & h5 {
            margin-top: 5px;
            font-size: 24px;
            color: #1c8ffe;
            cursor: pointer;
        }
    }

    .line-chart-level {
        height: 240px;
    }
}

.right-line-chart {
    height: 290px;
    width: 100%;
    margin-top: 3px;
}

.box {
    /deep/ .radio-button-groups {
        width: 100%;
        text-align: center;

        .tab-span {
            display: inline-block;
            font-size: 14px;
            color: #666666;
            width: 73px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            cursor: pointer;

            &.active,
            &:hover {
                background-color: rgba(30, 144, 254, 0.1);
                color: #1e90fe;
            }
        }

    }
}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 8px;
}

.table-title {
    color: white;
}
</style>