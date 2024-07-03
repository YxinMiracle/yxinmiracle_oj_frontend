<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性的类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (value: string) => void;
}
// 设定默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: "split",
  handleChange: (value: string) => {
    console.log(value);
  },
});

const plugins = [
  gfm(),
  // Add more plugins here
];
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child svg {
  display: none !important;
}
</style>
