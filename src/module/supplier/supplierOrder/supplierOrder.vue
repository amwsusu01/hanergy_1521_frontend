<template>
  <div>
      系统管理首页
  </div>
</template>

<script>
    import {analyseTime, _sessionStorage} from '../../../assets/js/util'
    import RecevierOrder from '../../../components/common/recevierOrder'
    import Paging from '../../../components/common/Paging'

    export default {
        name: "supplierOrder",
        components: {
            RecevierOrder,Paging
        },
        data() {
            return {
                //"takeStatus": "是否确认收货-0待收货1采购方确认收货2供应方确认收货4.已取消",
                orderList: [], // 订单列表
                response: false, // 加载完成
                orderSearch: '', // 搜索字段
                page: {
                    pageShowNum: 10, // 每页展示多少条
                    totalNumber: 100, // 总条数
                    thisPage: 1, // 当前第几页
                    thisTotalNumber: '', // 当前页总条数
                },
                dialogOrder: false, // 查看收货单弹窗
                myOrderList: {}, // 我的收货单弹窗list
            }
        },
        mounted() {
            this.init()
        },
        computed: {}, // 计算属性
        filters: {}, // 过滤器
        methods: {
            init() {
                this.getOrderList();
            },
            searchOrder() {
                this.page.thisPage = 1;
                this.getOrderList()
            }, // 搜索
            getOrderList() {
                let param = {
                    goodsName: this.orderSearch, // 查询 商品名
                    // orderId: "",  // 大订单id
                    // orderNum: "",  // 大订单号
                    pageNum: this.page.thisPage,  //  当前页
                    pageSize: this.page.pageShowNum,  //  每页展示多少条
                    // receiverId: 0, // 收货人id
                    // subOrderId: "",  // 小订单id
                    // subOrderNum: "", // 小订单号
                    supplierId: _sessionStorage('userId'),  // 供应商id
                    // supplierName: "",  // 供应商名
                    takeStatus: 0  // 0:我的订单 1：历史订单 2：我的收货单v     返回值中takeStatus 0-未确认收货  1-采购商确认收货  2-供应商收货
                };
                this.$api.supplier.getOrderList(param).then(res => {
                    if (res.meta.code == 0) {
                        if(res.data&&res.data.list){
                            this.orderList = res.data.list;
                            this.page.thisPage = res.data.pageNum;  // 当前第几页
                            // this.page.pageShowNum = res.data.pageSize; // 每页展示多少条
                            this.page.totalNumber = res.data.total; // 总条数
                            this.page.thisTotalNumber = res.data.size; // 当前页总条数
                        }
                        this.response = true;
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 获取订单列表
            showOrderDialog(item, parentItem) {
                let param = {
                    "subOrderId": item.id // 小订单id
                };
                this.$api.canteen.getOrderDetail(param).then(res => {
                    if (res.meta.code == 0) {
                        this.myOrderList = res.data;
                        this.dialogOrder = true;
                    }else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                });
            }, // 展示收货单弹窗
            closeOrderDialog() {
                this.dialogOrder = false;
            }, // 关闭收货单弹窗
            submitOrder(item) {
                // console.log(item)
                let param = {
                    "orderId": item.orderId,
                    "id": item.id  //  小订单id
                };
                this.$api.supplier.orderReceiver(param).then(res => {
                    if (res.meta.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '成功!'
                        });
                        this.closeOrderDialog();
                        this.getOrderList();
                    } else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })
            }, // 供应商点确认，订单完成，订单进到历史订单中
            showPage(thisPage,selectShowNumber){
                this.page.thisPage = thisPage;
                this.getOrderList();
            }, // 分页
        }
    }
</script>

<style lang="less" scoped>
    .supplier-order {

    }
</style>