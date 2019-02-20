<template>
    <el-select v-model="values" style="width: 251px;" multiple collapse-tags size="mini">
      <el-option v-for="item in careerList" :key="item" :label=item :value=item>
      </el-option>
    </el-select>
</template>
<script type="text/javascript">
export default {
    name: 'rank-select',
    props: {
      careerList: Array
    },
    data() {
        return {
            values:[]
        }
    },
    computed: {
      
    },
    mounted() {
      console.log('this.careerList...', this.careerList);
        // this.values = ['21-24','15-20'];
        
    },
    methods: {
        
    }
}
</script>
<style lang="less" type="text/less" scoped>
</style>