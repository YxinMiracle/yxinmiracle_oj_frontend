<template>
  <div class="home">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor>
    <MdEditor :value="mdValue" :handle-change="onMdChange"></MdEditor>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref();
const mdValue = ref();

const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};

const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
</script>
