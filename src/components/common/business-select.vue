<template>
    <el-select v-model="values"  @change="changeSelect(val)"  multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
        <el-option-group v-for="group in deptGroup" :key="group.label" :label="group.label" @click.native="checkAllOpts">
            <el-option v-for="item in group.groups" :key="item.shiyebu_name" :label="item.shiyebu_name" :value="item.shiyebu_name" style="width: 251px">
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script type="text/javascript">
    export default {
        name: 'business-select',
        data() {
            return {
                checkAll: true, //选中当前所有的部门
                values: []
            }
        },
        props: {
            businessList: Array
        },
        mounted() {},
        computed: {
            deptGroup: {
                get() {
                    return [{
                        label: '全部',
                        groups: this.businessList
                    }]
                }
            },
        },
        watch:{
            'businessList':function(newval,val) {
                if(newval.length > 0 && (!val || val.length ==0 )) {
                    this.values = newval.map((a)=>a.shiyebu_name);
                }
            }
        },
        methods: {
            checkAllOpts() {
                if (this.checkAll == true) {
                    this.values = [];
                    this.checkAll = false;
                } else {
                    this.values = this.businessList.map((a) => a.shiyebu_name);
                    this.checkAll = true;
                }
            },
            changeSelect(val) {
                //this.values = val;
                this.$emit('getWarningDetailed')
            }
        }
    }
</script>
<style lang="less" type="text/less" scoped>
</style>