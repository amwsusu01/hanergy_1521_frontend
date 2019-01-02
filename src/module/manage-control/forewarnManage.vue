<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="一级预警" name="first">
                <forewarnTable></forewarnTable>
            </el-tab-pane>
            <el-tab-pane label="二级预警" name="second">
                <forewarnTable></forewarnTable>
            </el-tab-pane>
            <el-tab-pane label="三级预警" name="third">
                <forewarnTable></forewarnTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import forewarnTable from '../../components/common/forewarnTable.vue'
    export default {
        name: "forewarning-manage",
        data(){
            return {
                activeName: 'first',
            }
        },
        methods: {
            handleClick(tab) {
                 if(tab.name == 'first'){
                     this.templateId = "1000001"; // 一级预警
                 }
                 if(tab.name == 'second'){
                     this.templateId = "1000002"; // 二级预警
                 }
                 if(tab.name == 'third'){
                     this.templateId = "1000003"; // 三级预警
                 }
            },
        },
        computed: {
            templateId: {
                get() { return this.$store.state.common.templateId },
                set(val) { this.$store.commit('saveTemplateId', val) }
            },
        },
        components:{
            forewarnTable
        }
    }
</script>

<style scoped>
</style>