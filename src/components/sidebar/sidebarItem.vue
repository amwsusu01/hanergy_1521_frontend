<template>
    <div class="menu-wrapper">
        <template v-for="(item,index) in menu">
            <el-menu-item v-if="item.list.length===0" :index="item.menuId" @click="open(item)" :key="item.menuId">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-else :index="`${item.menuId}`" :key="item.menuId" :class="{'el-submenu--display':isCollapse}">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title" :class="{'el-menu--display':isCollapse}">{{item.name}}</span>
                </template>
                <template v-for="(child,cindex) in item.list">
                    <!-- <el-menu-item :index="`${child.menuId}`" @click="open(child)" v-if="child.list.length==0" :key="child.menuId">
                            <i :class="child.icon"></i>
                            <span slot="title">{{child.name}}</span>
                        </el-menu-item> -->
                    <sidebar-item :menu="[child]" :name="item.name" :key="child.menuId" :isCollapse="isCollapse"></sidebar-item>
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
        name:String,
        isCollapse: {
            type: Boolean
        }
    },
    mounted() {},
    computed: {},
    methods: {
        filterPath(path, index) {
            return path == null ? index + "" : path;
        },
        open(item) {
            if (item.url != '' && item.url != "‘’") {
                this.$store.commit('setBreadcrumbMenu', [this.name||'', item.name]);
                this.$router.push({
                    name: item.url
                });
            }
        }
    }
};
</script>
<style lang="less">
.el-menu--display {
    display: none;
}

.el-submenu--display .el-submenu__icon-arrow {
    display: none !important;
}
</style>