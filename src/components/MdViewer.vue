<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import highlight from "@bytemd/plugin-highlight";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性的类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

// 设定默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child svg {
  display: none !important;
}
</style>
