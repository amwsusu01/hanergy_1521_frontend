
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {

    },
    /**
     * 数据绑定后还未生成Dom时执行（初次构建页面）
     */
    created: function () {


    },

    /**
     * keep-alive,组件被激活时执行
     */
   /* activated(){
        this.init()
    },*/
    /**
     * vue的DOM挂载之后执行
     */
    mounted(){
    },

    // vue内挂载其他方法
    methods: {
        /**
         * 页面加载
         */
        init1(){
            //一图
            let assemblyChart = this.echarts.init(document.getElementById('assemblyChart'));
            let options = {
                title: {
                    text: '超过4次(含)未请假未提报统计报表',
                },
                legend: {
                    data:['提报人数', '占比'],
                    top: 30
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                     splitLine: {show:false}, //横轴的线
                     data : ['2018-11','2018-12','2018-04','2018-03','2018-01','2018-09']
                    },
                yAxis: [{
                    type : 'value',
                    min: 0,
                    max: 3000,
                    interval: 500,
                    name: '人数',
                    splitLine: {show:true}, //纵轴的线
                },
                    {
                        type : 'value',
                        name: '(%)',
                        min: 0,
                        max: 100,
                        interval: 10,
                        nameLocation: 'end',
                        splitLine: {show:false}, //纵轴的线
                    }
                ],
                series: [
                    {
                        name: '提报人数',
                        type: 'bar',
                        stack:  '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        itemStyle: {
                        color: function (params) {
                            var colorList = [ '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                            return colorList[params.dataIndex];
                        },
                    },
                        data: [0, 2700, 1400, 1200, 300, 0]
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        data:[11, 1, 33, 45, 22, 4]
                    }
                ]
            };
            assemblyChart.setOption(options);
            //二图
            let assemblyTwoChart = this.echarts.init(document.getElementById('assemblyTwoChart'));
            let optionsTwo = {
                title: {
                    text:'12点之前提报统计报表/一个月累计出现3次(含)9点',
                },
                legend: {
                    data:['提报人数', '占比'],
                    top: 30
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                    splitLine: {show:false}, //横轴的线
                    data : ['2018-11','2018-12','2018-04','2018-03','2018-01','2018-09']
                },
                yAxis: [{
                    type : 'value',
                    min: 0,
                    max: 3000,
                    interval: 500,
                    name: '人数',
                    splitLine: {show:true}, //纵轴的线
                },
                    {
                        type : 'value',
                        name: '(%)',
                        min: 0,
                        max: 100,
                        interval: 10,
                        nameLocation: 'end',
                        splitLine: {show:false}, //纵轴的线
                    }
                ],
                series: [
                    {
                        name: '提报人数',
                        type: 'bar',
                        stack:  '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        itemStyle: {
                            color: function (params) {
                                var colorList = [ '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: [0, 2700, 1400, 1200, 300, 0]
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        data:[11, 1, 33, 45, 22, 4]
                    }
                ]
            };
            assemblyTwoChart.setOption(optionsTwo);
            //三图
            let assemblyThreeChart = this.echarts.init(document.getElementById('assemblyThreeChart'));
            let optionsThree = {
                title: {
                    text:'提报月平均条数小于5',
                },
                legend: {
                    data:['提报人数', '占比'],
                    top: 30
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                    splitLine: {show:false}, //横轴的线
                    data : ['2018-11','2018-12','2018-04','2018-03','2018-01','2018-09']
                },
                yAxis: [{
                    type : 'value',
                    min: 0,
                    max: 3000,
                    interval: 500,
                    name: '人数',
                    splitLine: {show:true}, //纵轴的线
                },
                    {
                        type : 'value',
                        name: '(%)',
                        min: 0,
                        max: 100,
                        interval: 10,
                        nameLocation: 'end',
                        splitLine: {show:false}, //纵轴的线
                    }
                ],
                series: [
                    {
                        name: '提报人数',
                        type: 'bar',
                        stack:  '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        itemStyle: {
                            color: function (params) {
                                var colorList = [ '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: [0, 2700, 1400, 1200, 300, 0]
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        data:[11, 1, 33, 45, 22, 4]
                    }
                ]
            };
            assemblyThreeChart.setOption(optionsThree);
            //四图
            let assemblyFourChart = this.echarts.init(document.getElementById('assemblyFourChart'));
            let optionsFour = {
                title: {
                    text: '提报月平均字数小于5',
                },
                legend: {
                    data:['提报人数', '占比'],
                    top: 30
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                    splitLine: {show:false}, //横轴的线
                    data : ['2018-11','2018-12','2018-04','2018-03','2018-01','2018-09']
                },
                yAxis: [{
                    type : 'value',
                    min: 0,
                    max: 3000,
                    interval: 500,
                    name: '人数',
                    splitLine: {show:true}, //纵轴的线
                },
                    {
                        type : 'value',
                        name: '(%)',
                        min: 0,
                        max: 100,
                        interval: 10,
                        nameLocation: 'end',
                        splitLine: {show:false}, //纵轴的线
                    }
                ],
                series: [
                    {
                        name: '提报人数',
                        type: 'bar',
                        stack:  '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        itemStyle: {
                            color: function (params) {
                                var colorList = [ '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: [0, 2700, 1400, 1200, 300, 0]
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        data:[11, 1, 33, 45, 22, 4]
                    }
                ]
            };
            assemblyFourChart.setOption(optionsFour);
            //五图
            let assemblyFiveChart = this.echarts.init(document.getElementById('assemblyFiveChart'));
            let optionsFive = {
                title: {
                    text:'提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)',
                },
                legend: {
                    data:['提报人数', '占比'],
                    top: 30
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                    splitLine: {show:false}, //横轴的线
                    data : ['2018-11','2018-12','2018-04','2018-03','2018-01','2018-09']
                },
                yAxis: [{
                    type : 'value',
                    min: 0,
                    max: 3000,
                    interval: 500,
                    name: '人数',
                    splitLine: {show:true}, //纵轴的线
                },
                    {
                        type : 'value',
                        name: '(%)',
                        min: 0,
                        max: 100,
                        interval: 10,
                        nameLocation: 'end',
                        splitLine: {show:false}, //纵轴的线
                    }
                ],
                series: [
                    {
                        name: '提报人数',
                        type: 'bar',
                        stack:  '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        itemStyle: {
                            color: function (params) {
                                var colorList = [ '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7', '#56CEFB', '#7297E7'];

                                return colorList[params.dataIndex];
                            },
                        },
                        data: [0, 2700, 1400, 1200, 300, 0]
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        data:[11, 1, 33, 45, 22, 4]
                    }
                ]
            };
            assemblyFiveChart.setOption(optionsFive);
            },


        /**
         * 分页选择
         * @param index
         */
        showPageClick(index){
            this.searchData.page = index;
            this.getGoodsFun()
        },
    },
    /**
     * 监控数据
     */
    watch: {
        $route(to, from){
            
        }
    }


}
