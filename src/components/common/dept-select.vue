<template>
    <el-select v-model="values"  @change="changeSelect"  multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
        <el-option  :label="deptGroup[0].label" value="deptGroup[0].label" @click.native="checkAllOpts">
        </el-option>
            <el-option v-for="item in deptGroup[0].groups" :key="item.dept_name" :label="item.dept_name" :value="item.dept_name" style="width: 251px">
            </el-option>
    </el-select>
</template>
<script type="text/javascript">
export default {
    name: 'dept-select',
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
    watch:{
    	'deptList':function(newval,val) {

    		if(newval.length > 0 && (!val || val.length ==0 )) {
                this.values = newval.map((a)=>a.dept_name);
    		}
    	}
    },
    methods: {
        checkAllOpts() {
            if (this.checkAll == true) {
                this.values = [];
                this.checkAll = false;
            } else {
                this.values = this.deptList.map((a) => a.dept_name);
                console.log('this.values....', this.values);
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