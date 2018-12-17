<template>
    <div class="menu-wrapper">
        <template v-for="(item,index) in menu">
            <el-menu-item v-if="item.list.length===0 || item.type ==1" :index="item.menuId" @click="open(item)" :key="item.name">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-else :index="filterPath(item.name,index)" :key="item.name">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title" :class="{'el-menu--display':isCollapse}">{{item.name}}</span>
                </template>
                <template v-for="(child,cindex) in item.list">
                    <el-menu-item :index="child.menuId" @click="open(child)" v-if="child.list.length==0" :key="cindex">
                        <i :class="child.icon"></i>
                        <span slot="title">{{child.name}}</span>
                    </el-menu-item>
                    <sidebar-item :menu="[child]" :key="cindex" :isCollapse="isCollapse"></sidebar-item>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<script>
//import { resolveUrlPath } from "@/util/util";
export default {
    name: "sidebar-item",
    data() {
        return {};
    },
    props: {
        menu: {
            type: Array
        },
        isCollapse: {
            type: Boolean
        }
    },
    created() {

    },
    mounted() {},
    computed: {},
    methods: {
        filterPath(path, index) {
            return path == null ? index + "" : path;
        },
        open(item) {
            if (item.url != '') {
                this.$router.push({
                    name: item.url
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
</style>