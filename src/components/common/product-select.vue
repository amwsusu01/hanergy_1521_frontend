<template>
    <el-select v-model="values"   @change="changeSelect(val)" multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
        <el-option-group v-for="product in productGroup" :key="product.label" :label="product.label" @click.native="checkAllOpts">
            <el-option v-for="item in product.products" :key="item.chanpin_name" :label="item.chanpin_name" :value="item.chanpin_name" style="width: 251px">
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script type="text/javascript">
    export default {
        name: "product-select",
        data() {
            return {
                checkAll: true, //选中当前所有的产品
                values: []
            }
        },
        props: {
            productList: Array
        },
        mounted() {},
        computed: {
            productGroup: {
                get() {
                    return [{
                        label: '全部',
                        products: this.productList
                    }]
                }
            },
        },
        watch:{
            'productList':function(newval,val) {
                if(newval.length > 0 && (!val || val.length ==0 )) {
                    this.values = newval.map((a)=>a.chanpin_name);
                }
            }
        },
        methods: {
            checkAllOpts() {
                if (this.checkAll == true) {
                    this.values = [];
                    this.checkAll = false;
                } else {
                    this.values = this.productList.map((a) => a.chanpin_name);
                    this.checkAll = true;
                }
            },
            changeSelect(val){
                this.values = val
                this.$emit('getWarningDetailed')
            }
        }
    }
</script>
<style lang="less" type="text/less" scoped>
</style>