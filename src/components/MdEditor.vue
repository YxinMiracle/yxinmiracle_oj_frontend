<template>
  <Editor
    :value="value"
    :mode="mode"
    style="height: 100%"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.min.css";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import gemoji from "@bytemd/plugin-gemoji";

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
  highlight(),
  breaks(),
  footnotes(),
  frontmatter(),
  mediumZoom(),
  gemoji(),
  // Add more plugins here
];
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child svg {
  display: none !important;
}
</style>
