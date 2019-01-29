<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" label-width="130px" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="date1" label="统计日期"  :label-width="shortLabel">
                            <el-date-picker type="date" placeholder="统计日期" v-model="form.date1" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="contain-form-item" prop="caigoushenqing" label="采购申请" :label-width="shortLabel">
                            <el-input v-model="form.caigoushenqing"  placeholder="请填写采购申请" style="width: 251px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="contain-form-item" prop="wuliaomiaoshu" label="物料描述" :label-width="shortLabel">
                            <el-input v-model="form.wuliaomiaoshu"  placeholder="请填写物料描述"  style="width: 251px;" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="contain-form-item" prop="product" label="产品系列" :label-width="shortLabel">
                            <product-select :productList="productList" ref="productList" @getProductDetailed="getProductDetailed()" style="width: 251px;"></product-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="contain-form-item" prop="business" label="事业部" :label-width="shortLabel">
                            <business-select :businessList="businessList" ref="businessList" @getProductDetailed="getProductDetailed()" ></business-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="contain-form-item" prop="submitter" label="提交人" :label-width="shortLabel">
                            <submitter-select :submitterList="submitterList" ref="submitterList" @getProductDetailed="getProductDetailed()" ></submitter-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="PR计划区间"  prop="date2" class="contain-time-form-item">
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
                        <el-form-item label="PR实际区间"  prop="date4" class="contain-time-form-item">
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
                    <el-col :span="12">
                        <el-form-item label="采购合同计划区间"  prop="date6" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date6" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date7" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购合同实际区间"  prop="date8"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date8" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date9" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="预付款计划区间"  prop="date10"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date10" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date11" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预付款实际区间"  prop="date12"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date12" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date13" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生产计划区间"  prop="date14"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date14" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date15" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生产实际区间"  prop="date16"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date16" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date17" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="提货款计划区间"  prop="date18"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date18" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date19" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="提货款实际区间"  prop="date20"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date20" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date21" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="交付计划区间" prop="date22"  class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date22" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date23" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交付实际区间"  prop="date24" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date24" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date25" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
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
                   <!--  <el-table-column label="明细表" fixed  label-class-name="table-title title-th"> -->
                        <el-table-column label='' label-class-name="title-th">
                            <el-table-column prop="index" label-class-name="title-th" label="序号" width="50">
                            </el-table-column>
                            <el-table-column prop="CHANPIN_NAME" label-class-name="title-th" label="产品系列" width="150">
                            </el-table-column>
                            <el-table-column prop="FD_CAIGOUSHENQING" label-class-name="title-th" label="采购申请号" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="FD_SHIYEBU" label-class-name="title-th" label="事业部" width="100">
                            </el-table-column>
                            <el-table-column prop="FD_WULIAOBIANHAO" label-class-name="title-th" label="物料号" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="FD_WULIAOMIAOSHU" label-class-name="title-th" label="物料描述" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="FD_NAME" label-class-name="title-th" label="提交人" show-overflow-tooltip width="100">
                            </el-table-column>

                            <el-table-column prop="WARNING" label-class-name="title-th"  label="预警" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='PR'  align="center"     label-class-name="title-th">
                            <el-table-column prop="PRJIHUA" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="PRSHIJI" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='采购合同' align="center" label-class-name="title-th">
                            <el-table-column prop="CAIGOUJIHUA" label="签署计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="CAIGOUBIANGENG" label="签署变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="CAIGOUSHIJI" label="签署实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='预付款'  align="center"  label-class-name="title-th">
                            <el-table-column prop="YUFUKUANJIHUA" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="YUFUKUANBIANGENG" label="变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="YUFUKUANSHIJI" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='生产'  align="center" label-class-name="title-th">
                            <el-table-column prop="SHENGCHANJIHUA" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="SHENGCHANBIANGENG" label="变更"  label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="SHENGCHANSHIJI" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='提货款'  align="center" label-class-name="title-th">
                            <el-table-column prop="TIHUOKUANJIHUA" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="TIHUOKUANBIANGENG" label="变更"  label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="TIHUOKUANSHIJI" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='交付'  align="center"  label-class-name="title-th">
                            <el-table-column prop="JIAOFUJIHUA" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="JIAOFUBIANGENG" label="变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="JIAOFUSHIJI" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                    <!-- </el-table-column> -->
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
            isInit:false, //第一次打开初始false,记录日志，否则不记录
            dataList: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                date1: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
                date2: "",
                date3: "",
                date4: "",
                date5: "",
                date6: "",
                date7: "",
                date8: "",
                date9: "",
                date10: "",
                date11: "",
                date12: "",
                date13: "",
                date14: "",
                date15: "",
                date16: "",
                date17: "",
                date18: "",
                date19: "",
                date20: "",
                date21: "",
                date22: "",
                date23: "",
                date24: "",
                date25: "",
                submitter: "",
                business: "",
                product: "",
                caigoushenqing:"",
                wuliaomiaoshu: ""
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
        userObj: {
            get(){
                return this.$store.state.common.user;
            }
        }
    },
    methods: {
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.isInit=true;
            this.page.currentPage = val;
            this.getProductDetailed();
        },
        //产供销一体化明细报表 接口
        getProductDetailed() {
            let params = {
                countDate: this.form.date1,	//#统计时间
                products: this.getProduct(), //#产品系列
                caigoushenqing: this.form.caigoushenqing,//#采购申请
                shiyebu: this.getBusiness(),     	//#事业部
                wuliaomiaoshu: this.form.wuliaomiaoshu,  	//#物料描述
                name: this.getSubmitter(), //	#提交人
                prjihua: this.form.date2, prjihuaend: this.form.date3,	//#PR计划区间
                prshiji: this.form.date4, prshijiend: this.form.date5, //#PR实际区间
                caigoujihua: this.form.date6, caigoujihuaend: this.form.date7, //#采购合同签署计划区间
                caigoushiji: this.form.date8, caigoushijiend: this.form.date9,   //#采购合同签署实际区间

                yufukuanjihua: this.form.date10, yufukuanjihuaend: this.form.date11,  //#预付款计划区间
                yufukuanshiji: this.form.date12, yufukuanshijiend: this.form.date13, //#预付款实际区间

                shengchanjihua: this.form.date14, shengchanjihuaend: this.form.date15,//#生产完成计划区间
                shengchanshiji: this.form.date16, shengchanshijiend: this.form.date17, //#生产完成实际区间

                tihuokuanjihua: this.form.date18, tihuokuanjihuaend: this.form.date19, //#提货款计划区间
                tihuokuanshiji: this.form.date20, tihuokuanshijiend: this.form.date21,  //#提货款实际区间

                jiaofujihua:  this.form.date22, jiaofujihuaend: this.form.date23,//#交付计划区间
                jiaofubiangeng: this.form.date24, jiaofubiangengend:  this.form.date25,//#交付实际区间
                page: this.page.currentPage,
                pageSize: this.page.pagesize,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "101",
                menuName: "产供销一体化明细",
                proType: 4,
                isNo:this.isInit
        };
            this.$api.common.getProductDetailed(params).then(res => {
                this.page.totalNumber = res.count;
                    this.dataList = res.list || [];
                    for(let i in this.dataList){
                        this.dataList[i].index = Number(i)+1
                    }
            })

        },
        //查询
        querySelect(){
            this.isInit=false;
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
                this.isInit=false;
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
                countDate: this.form.date1,	//#统计时间
                products: this.getProduct(), //#产品系列
                caigoushenqing: this.form.caigoushenqing,//#采购申请
                shiyebu: this.getBusiness(),     	//#事业部
                wuliaomiaoshu: this.form.wuliaomiaoshu,  	//#物料描述
                name: this.getSubmitter(), //	#提交人
                prjihua: this.form.date2, prjihuaend: this.form.date3,	//#PR计划区间
                prshiji: this.form.date4, prshijiend: this.form.date5, //#PR实际区间
                caigoujihua: this.form.date6, caigoujihuaend: this.form.date7, //#采购合同签署计划区间
                caigoushiji: this.form.date8, caigoushijiend: this.form.date9,   //#采购合同签署实际区间

                yufukuanjihua: this.form.date10, yufukuanjihuaend: this.form.date11,  //#预付款计划区间
                yufukuanshiji: this.form.date12, yufukuanshijiend: this.form.date13, //#预付款实际区间

                shengchanjihua: this.form.date14, shengchanjihuaend: this.form.date15,//#生产完成计划区间
                shengchanshiji: this.form.date16, shengchanshijiend: this.form.date17, //#生产完成实际区间

                tihuokuanjihua: this.form.date18, tihuokuanjihuaend: this.form.date19, //#提货款计划区间
                tihuokuanshiji: this.form.date20, tihuokuanshijiend: this.form.date21,  //#提货款实际区间

                jiaofujihua:  this.form.date22, jiaofujihuaend: this.form.date23,//#交付计划区间
                jiaofubiangeng: this.form.date24, jiaofubiangengend:  this.form.date25,//#交付实际区间
                page: this.page.currentPage,
                pageSize: this.page.pagesize,
                isExprot: '1',
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "101",
                menuName: "产供销一体化明细",
                proType: 6

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
        this.isInit  = false;
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