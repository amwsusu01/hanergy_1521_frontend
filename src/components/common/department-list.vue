<template>
    <el-select v-model="values" @focus="aa" @change="changeSelect" multiple filterable collapse-tags placeholder="无限制"
               size="mini" style="width: 251px;">
        <el-option label="全部" value="1" @click.native="checkAllOpts" style="width: 251px">
        </el-option>
        <el-option v-for="item in deptGroup[0].groups" :key="item" :label="item" :value="item" style="width: 251px">
        </el-option>
        <!-- </el-option-group> -->
    </el-select>
</template>
<script type="text/javascript">
    export default {
        name: 'department-list',
        data() {
            return {
                checkAll: true, //选中当前所有的部门
                values: []
            }
        },
        props: {
            deptList: Array
        },
        mounted() {
        },
        computed: {
            deptGroup: {
                get() {
                    return [{
                        label: '全部',
                        groups: this.deptList
                    }]
                }
            },
        },
        watch: {
            'deptList': function (newval, val) {
                if (newval.length > 0 && (!val || val.length == 0)) {
                    // this.values = newval.map((a)=>a.dept_name);
                    this.values = newval.map((a) => a);
                }
            }
        },
        methods: {
            checkAllOpts() {
                if (this.checkAll == true) {
                    this.values = [];
                    this.checkAll = false;
                } else {
                    this.values = this.deptList.map((a) => a);
                    this.checkAll = true;
                }
            },
            changeSelect(val) {
                //console.log('目前选种植。。。。', val);
                //this.values = val;
                this.$emit('updateOrgData', {type: 'bumen', val: val})
                this.$emit('getWarningDetailed')
            },
            aa(obj) {
                console.log('数据信息。。。。', obj)
                console.log(this.deptList);
            }
        }
    }
</script>
<style lang="less" type="text/less" scoped>
</style>