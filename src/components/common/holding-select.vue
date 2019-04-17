<template>
    <el-select v-model="values" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
      <el-option v-for="item in holdList" :key="item" :label='item' :value='item'>
      </el-option>
    </el-select>
</template>
<script type="text/javascript">
export default {
    name: 'holding-select',
    props: {
      holdList: Array
    },
    data() {
        return {
            values:[]
        }
    },
    computed: {
      
    },
    mounted() {
    },
    methods: {
       selectChange(val) {
         this.$emit('updataOrgData', {type: 'konggu', val: val});
    },
       checkAllOpts() {
       }
    }
}
</script>
<style lang="less" type="text/less" scoped>
</style>