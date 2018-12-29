<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一级预警" name="first">一级预警</el-tab-pane>
            <el-tab-pane label="二级预警" name="second">二级预警</el-tab-pane>
            <el-tab-pane label="三级预警" name="third">三级预警</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "forewarning-manage"
    }
</script>

<style scoped>

</style>