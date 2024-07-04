<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question?.content || ''"></MdViewer>
              <template #extra>
                <a-tag
                  v-for="(tag, index) in question.tags"
                  :key="index"
                  color="green"
                >
                  {{ tag }}
                </a-tag>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" disabled title="评论"> xxx</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            label="编程语言"
            field="language"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="请选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handleChange="changeCode"
        ></CodeEditor>
        <a-divider />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

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

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
  questionId: props.id,
});

const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  if (res.code === 0) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败" + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
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
