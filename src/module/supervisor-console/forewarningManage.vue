<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="一级预警" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="二级预警" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="三级预警" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "forewarning-manage",
        data(){
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>