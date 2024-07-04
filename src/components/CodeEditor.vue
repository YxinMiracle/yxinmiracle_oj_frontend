<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 600px; height: 70vh"
  ></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

/**
 * 定义组件属性的类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (value: string) => void;
}

// 设定默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (value: string) => {
    console.log(value);
  },
});

watch(
  () => props.language,
  () => {
    monaco.editor.setModelLanguage(
      // 踩坑一定要使用toRaw
      toRaw(codeEditor.value).getModel(),
      props.language
    );
  }
);

const codeEditorRef = ref();
const codeEditor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 10,
    },
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
