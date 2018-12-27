<template>
    <el-select v-model="values" multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
        <el-option-group v-for="group in submitterGroup" :key="group.label" :label="group.label" @click.native="checkAllOpts">
            <el-option v-for="item in group.groups" :key="item.FD_NAME" :label="item.FD_NAME" :value="item.FD_NAME" style="width: 251px">
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script type="text/javascript">
    export default {
        name: "submitter-select",
        data() {
            return {
                checkAll: true, //选中当前所有的部门
                values: []
            }
        },
        props: {
            submitterList: Array
        },
        mounted() {},
        computed: {
            submitterGroup: {
                get() {
                    return [{
                        label: '全部',
                        groups: this.submitterList
                    }]
                }
            },
        },
        watch:{
            'submitterList':function(newval,val) {
                if(newval.length > 0 && (!val || val.length ==0 )) {
                    this.values = newval.map((a)=>a.FD_NAME);
                }
            }
        },
        methods: {
            checkAllOpts() {
                if (this.checkAll == true) {
                    this.values = [];
                    this.checkAll = false;
                } else {
                    this.values = this.submitterList.map((a) => a.FD_NAME);
                    this.checkAll = true;
                }
            },
        }
    }
</script>
<style lang="less" type="text/less" scoped>
</style>