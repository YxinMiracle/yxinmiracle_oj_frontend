<template>
  <div id="app">
    <BasicLayout></BasicLayout>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  if (to?.meta?.access == "canAdmin") {
    if (store.state?.user.loginUser?.role !== "admin") {
      next("noAuth");
      return;
    }
  }
  next();
});

// 全局初始化函数
const doInit = () => {
  console.log("xxx");
};
// document.body.setAttribute("arco-theme", "dark");

onMounted(() => {
  doInit();
});
</script>

<style></style>
