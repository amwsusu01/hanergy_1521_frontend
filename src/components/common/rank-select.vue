<template>
    <el-select v-model="values" style="width: 251px;" multiple collapse-tags placeholder="无限制" size="mini" @change="changeRank">
        <el-option v-for="item in this.rankOptions" :key="item.name" :label=item.name :value=item.name :disabled="item.disabled">
        </el-option>
    </el-select>
</template>
<script type="text/javascript">
export default {
    name: 'rank-select',
    data() {
        return {
            values:[],
            rankOptions: [{
                name:'21-24',
                disabled:false
            },{
                name:'15-20',
                disabled:false
            },{
                name:'5-14',
                disabled:false
            },
            {
                name:'1-4',
                disabled:true
            }],
        }
    },
    mounted() {
        this.values = ['21-24','15-20'];
    },
    methods: {
        //修改职级,默认搜索所有的职级,后两个职级不能选择,但是作为搜索条件
        changeRank(val){
            console.log('职级。。。。', this.values);
            // let res = [];
            // res.push(rankOptions.slice(2,3));
            // this.$emit('rankChanged',res);
            // console.log(res);
        }
    }
}
</script>
<style lang="less" type="text/less" scoped>
</style>