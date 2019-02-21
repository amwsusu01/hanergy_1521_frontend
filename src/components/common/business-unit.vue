<template>
    <el-select v-model="values"  @change="changeSelect" style="width: 251px;" multiple collapse-tags size="mini">
      <el-option v-for="item in businessList" :key="item" :label=item :value=item>
      </el-option>
    </el-select>
</template>
<script type="text/javascript">
export default {
    name: 'rank-select',
    props: {
      businessList: Array
    },
    data() {
        return {
            values:[]
        }
    },
    computed: {
      
    },
    mounted() {
        // this.values = ['21-24','15-20'];
        
    },
    methods: {
        changeSelect(val) {
            //this.values = val;
            this.$emit('updataOrgData', {type: 'shiyebu', val: val});
            this.$emit('getWarningDetailed')
        } 
    }
}
</script>
<style lang="less" type="text/less" scoped>
</style>