<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24"> xx </a-col>
      <a-col :md="12" :xs="24">
        <CodeEditor></CodeEditor>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import CodeEditor from "@/components/CodeEditor.vue";

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    Message.error("获取数据失败");
  }
};

onMounted(() => {
  loadData();
});

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#viewQuestionsView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
