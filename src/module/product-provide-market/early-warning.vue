<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" :label-width="shortLabel" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="xilie" label="产品系列" :label-width="shortLabel">
                            <el-select v-model="form.xilie" placeholder="无限制" style="width: 100%">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="date" label="日期" :label-width="shortLabel">
                            <el-date-picker type="date" placeholder="无限制" v-model="form.date" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>一级预警次数</p>
                            <h5>1000</h5>
                        </div>
                        <div class="line-chart-level" id="lineChart1"></div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>二级预警次数</p>
                            <h5>1000</h5>
                        </div>
                        <div class="line-chart-level" id="lineChart2"></div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="left-line-chart">
                        <div class="top-box">
                            <p>二级预警次数</p>
                            <h5>1000</h5>
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
                        <span :class="{'tab-span':true,'active':selectLevel==1}" @click="selectLevel=1" >一级预警</span>
                        <span :class="{'tab-span':true,'active':selectLevel==2}" @click="selectLevel=2">二级预警</span>
                        <span :class="{'tab-span':true,'active':selectLevel==3}" @click="selectLevel=3">三级预警</span>
                    </div>
                    <div class="right-line-chart" id="rightLineChart1"></div>
                </el-col>
            </el-row>
            <div style="width:100%;max-width: 1200px;position: relative;">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="data" border style="width: 100%">
                    <el-table-column prop="month" label="到期明细表" label-class-name="table-title title-th">
                        <el-table-column prop="username" label="采购申请" label-class-name="title-th" min-width="30%" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="department" label="事业部" label-class-name="title-th" min-width="10%" width="100px">
                        </el-table-column>
                        <el-table-column prop="jobNumber" label="物料号" label-class-name="title-th" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="email" label="物料描述" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="email" label="提交人" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="email" label="最新阶段" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="email" label="最新计划" label-class-name="title-th" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                        <el-table-column prop="email" label="到期预警" label-class-name="title-th" show-overflow-tooltip min-width="10%">
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
export default {
    name: 'early-warning',
    data() {
        return {
            data: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                keyword: ''
            },
            shortLabel: 80,
            options: {
                options1: [{
                    label: '全部',
                    value: 1
                }, {
                    label: '全部',
                    value: 2
                }, {
                    label: '全部',
                    value: 3
                }],
                levels: ['10%', '30%', '50%']
            },
            selectLevel: 1,

            chartDataOption: {
                xAxis: [{
                    type: 'category',
                    //position: 'bottom',
                    //nameRotate: 45,
                    //interval:0,
                    axisLabel: {
                        rotate: 45,
                    },
                    data: ['2018-12-18', '2018-12-19', '2018-12-20']
                }],
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 6,
                    splitNumber: 2
                },
                grid: {
                    x: 20
                },
                legend: {
                    data: ['预警数'],
                    top: 20
                },
                series: [{
                    name: '预警数',
                    data: [0, 1, 3],
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
                // grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '46',
                //     containLabel: true
                // },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: ['采购合同签署', '预付款', '生产', '提货款', '交付']
                },
                yAxis: [{
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 1,
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '百分比(%)',
                        min: -1,
                        max: 7,
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
                        data: [0, 1, 0, 0, 0]
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
                        data: [0.2, 5.88, 0.3, 0.8, 0.9]
                    }
                ]
            }
        }
    },
    methods: {
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val

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
        }
    },
    mounted() {
        this.getData();
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
        text-align:center;
        .tab-span {
            display: inline-block;
            font-size:14px;
            color:#666666;
            width:73px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            cursor: pointer;

            &.active,&:hover {
                background-color: rgba(30,144,254,0.1);
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