<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" label-width="130px" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="申请日期"  prop="date2" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date3" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="完成日期"  prop="date4" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date4" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date5" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-col :span="8"><el-button type="primary" size="mini" @click.prevent="querySelect()">查询</el-button></el-col>
                        <el-col :span="8"><el-button type="primary" size="mini" @click.prevent="resetForm('form')">重置</el-button></el-col>
                    </el-form-item>
                </el-row>
            </el-form>
            <div style="width:100%;max-width: 1200px;position: relative;" class="table-container">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="dataList" border style="width: 100%" height="355" max-height="700">
                        <el-table-column label='' label-class-name="title-th">
                            <el-table-column prop="tichubumen" label-class-name="title-th" label="提出部门" show-overflow-tooltip width="150">
                            </el-table-column>
                            <el-table-column prop="tichuren" label-class-name="title-th" label="提出人" width="80">
                            </el-table-column>
                            <el-table-column prop="tichubumenfuzeren" label-class-name="title-th" label="提出部门负责人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="shenqingriqi" label-class-name="title-th" label="提出时间" width="100">
                            </el-table-column>
                            <el-table-column prop="wentileixing" label-class-name="title-th" label="问题类型" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanrenquerenwentizhuan" label-class-name="title-th" label="问题状态" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="wentimiaoshu" label-class-name="title-th" label="问题描述" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="jianyi" label-class-name="title-th"  label="建议" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanbumen" label-class-name="title-th"  label="承办部门" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanbumenfuzeren" label-class-name="title-th"  label="承办部门负责人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanren" label-class-name="title-th"  label="承办人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="wanchengshijian" label-class-name="title-th"  label="承办完成时间" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="cuoshijishuoming" label-class-name="title-th"  label="实施措施及结果说明" show-overflow-tooltip width="100">
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
    import { exportExl } from '../../utils';
    import productSelect from '../../components/common/product-select';
    import businessSelect from "../../components/common/business-select";
    import submitterSelect from "../../components/common/submitter-select";
    export default {
        name: 'detail',
    data() {
        return {
            dataList: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                date1: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
                date2: "",
                date3: ""

            },
            shortLabel: "70",
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.startTime);
                }
            },
        }
    },
    components: {
        businessSelect,
        submitterSelect,
        productSelect,
    },
    computed: {
        businessList: {
            get() {
                return this.$store.state.common.dept || [];
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
                this.$store.commit('setPsmProduct', val);
            }
        },
        submitterList: {
            get() {
                return this.$store.state.common.psmuser || [];
            },
            set(val) {
                this.$store.commit('setPsmUser', val);
            }
        },
    },
    methods: {
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val;
            this.getProductDetailed();
        },
        //产供销一体化明细报表 接口
        getProductDetailed() {
            let params = {
                //prjihua: this.form.date2, prjihuaend: this.form.date3,	//#PR计划区间
                //prshiji: this.form.date4, prshijiend: this.form.date5, //#PR实际区间
                //pageNo: this.page.currentPage,
                //pageSize: this.page.pagesize,
                pageNo:1,
                pageSize:3
        };
            this.$api.common.prosearch(params).then(res => {
                this.page.totalNumber = res.count;
                    this.dataList = res.data || [];
                    for(let i in this.dataList){
                        this.dataList[i].index = Number(i)+1
                    }
            })

        },
        //查询
        querySelect(){
            this.getProductDetailed();
        },
        //重置
        resetForm(){
            let _this = this;
            _this.$refs.form.resetFields();
            _this.form.date3 = "";
            _this.form.date5 = "";
            _this.form.date7 = "";
            _this.form.date9 = "";
            _this.form.date11 = "";
            _this.form.date13 = "";
            _this.form.date15 = "";
            _this.form.date17 = "";
            _this.form.date19 = "";
            _this.form.date21 = "";
            _this.form.date23 = "";
            _this.form.date25 = "";
            _this.form.date1= this.$moment().subtract(1, 'days').format('YYYY-MM-DD');
            this.$refs['productList'].values = [];
            this.$refs['businessList'].values = [];
            this.$refs['submitterList'].values = [];
            this.$nextTick(() => {
                this.getProductDetailed();
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
        getBusiness() {
            if (this.$refs['businessList']) {
                this.form.business = this.$refs['businessList'].values.concat();
            }
            let resProducts = '';
            if (this.form.business.length > 0) {
                resProducts = this.form.business.join(',');
            } else {
                let productNames = this.businessList.map((a) => {
                    return a.shiyebu_name;
                })

                resProducts = productNames.join(',');
            }
            return resProducts;
        },
        getSubmitter() {
            if (this.$refs['submitterList']) {
                this.form.submitter = this.$refs['submitterList'].values.concat();
            }
            let resProducts = '';
            if (this.form.submitter.length > 0) {
                resProducts = this.form.submitter.join(',');
            } else {
                let productNames = this.submitterList.map((a) => {
                    return a.FD_NAME;
                });

                resProducts = productNames.join(',');
            }
            return resProducts;
        },
        exportExl(type) {
            let count = 0;
            switch (type) {
                case '67':
                    count = this.page.totalNumber;
                    break;
            }
            if (count >= 10000) {
                this.$confirm('当前导出行数超过1万行， 是否继续?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.exportExlOk(type);
                }).catch(() => {});
            } else {
                this.exportExlOk(type);
            }
        },

        exportExlOk(type) {
            let filename = '';
            switch (type) {
                case '67':
                    filename = "产供销一体化明细表.xls";
                    break;
            }
            let params = {
                prjihua: this.form.date2, prjihuaend: this.form.date3,	//#PR计划区间
                prshiji: this.form.date4, prshijiend: this.form.date5, //#PR实际区间
                page: this.page.currentPage,
                pageSize: this.page.pagesize,
                isExprot: '1'
            };
            this.$api.common.getProductExportDetailed(params).then(res => {
                exportExl(res, filename);
            })
        },
        init(){
            if (this.productList.length > 0) {
                this.form.product = this.productList.map((a) => a.chanpin_name);
                if (this.$refs['productList']) {
                    this.$refs['productList'].values = this.form.product.concat();
                }
            }
            if (this.submitterList.length > 0) {
                this.form.submitter = this.submitterList.map((a) => a.FD_NAME);
                if (this.$refs['submitterList']) {
                    this.$refs['submitterList'].values = this.form.submitter.concat();
                }
            }
            if (this.businessList.length > 0) {
                this.form.business = this.businessList.map((a) => a.shiyebu_name);
                if (this.$refs['businessList']) {
                    this.$refs['businessList'].values = this.form.business.concat();
                }
            }
        }
    },
    mounted() {
        this.init();
        this.$nextTick(() => {
            if (this.productList.length > 0 && this.submitterList.length > 0 && this.businessList.length > 0) {
                this.getProductDetailed();
            }
        });
    },
        watch: {
            'productList': function(newVal, oldVal) {
                if (newVal.length > 0 && oldVal && oldVal.length == 0) {
                    this.getProductDetailed();
                }
            },
            'submitterList': function(newVal, oldVal) {
                if (newVal.length > 0 && oldVal && oldVal.length == 0) {
                    this.getProductDetailed();
                }
            },
            'businessList': function(newVal, oldVal) {
                if (newVal.length > 0 && oldVal && oldVal.length == 0) {
                    this.getProductDetailed();
                }
            }
        }
}
</script>
<style lang="less">
.contain-form-item .el-form-item__content {
    width: 125px !important
}

.contain-time-form-item .el-form-item__content {
    width: 377px !important
}
</style>
<style type="text/css" scoped>
.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}

.table-title {
    color:white;
}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 0px;
}
.table-container {
    padding-top:45px;
}
</style>