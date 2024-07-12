<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 700px"></div>
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
  editorTheme: string;
  handleChange: (value: string) => void;
}

// 设定默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  editorTheme: () => "vs-dark",
  handleChange: (value: string) => {
    console.log(value);
  },
});

const minHeight = ref(0);

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

watch(
  () => props.editorTheme,
  () => {
    monaco.editor.setTheme(props.editorTheme);
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
      scale: 5,
    },
    lineNumbers: "on",
    codeLens: true, // 代码镜头
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs",
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });

  if (codeEditorRef.value && codeEditorRef.value.parentNode) {
    minHeight.value = codeEditorRef.value.parentNode.clientHeight;
  }
});

// 可以添加一个resize监听器，以便在窗口大小改变时更新高度
window.addEventListener("resize", () => {
  if (codeEditorRef.value && codeEditorRef.value.parentNode) {
    minHeight.value = codeEditorRef.value.parentNode.clientHeight;
  }
});
</script>

<style scoped></style>
