<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="close-logo" key="0">
        <!-- 缩起 -->
        <template>
          <img src= '../../../assets/img/close.png' width="65" height="60"/>
        </template>
      </span>
    </transition>
    <transition name="fade">
      <!-- 展开 -->
      <span v-if="!isCollapse" class="open-logo" key="2">
         <template>
          <img src= '../../../assets/img/open.png' width="230" height="60"/>
        </template>
      </span>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  props: ["isCollapse"],
  created() {},
  computed: {
    ...mapGetters(["website"]),
    },
  methods: {}
};
</script>
<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.close-logo {
  margin-top: 21px;
  margin-left: -168px;
  display: inline-block;
}
.open-logo {
  padding-top: 21px;
}
.is-text {
  position: absolute;
  top: 0;
  left: 10px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}

</style>
