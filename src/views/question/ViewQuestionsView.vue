<template>
  <div id="viewQuestionsView">
    <div class="viewQuestionsPage">
      <a-split class="yxinmiracle-split" v-model:size="size">
        <template #first>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" title="题目">
              <a-card
                class="yxinmiracle-card"
                v-if="question"
                :title="question.title"
              >
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
                  <a-space>
                    <a-tag
                      v-for="(tag, index) in question.tags"
                      :key="index"
                      color="green"
                    >
                      {{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="comment" disabled title="评论"> xxx</a-tab-pane>
            <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
          </a-tabs>
        </template>
        <template #second>
          <a-form :model="form" layout="inline">
            <a-form-item label="编程语言" field="language">
              <a-select v-model="form.language" placeholder="请选择编程语言">
                <a-option
                  v-for="(item, index) of tagData"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                  :disabled="item.disable"
                />
              </a-select>
            </a-form-item>
            <a-form-item label="编辑器样式" field="language">
              <a-select v-model="themeName" placeholder="请选择编辑器样式">
                <a-option
                  v-for="(item, index) of editorThemeList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </a-select>
            </a-form-item>
          </a-form>
          <a-card class="yxinmiracle-code-card" title="代码区域" hoverable>
            <div>
              <CodeEditor
                :value="form.code"
                :language="form.language"
                :handleChange="changeCode"
                :editorTheme="themeName"
              >
              </CodeEditor>
              <div>
                <div style="text-align: right; margin-right: 14px">
                  <a-button type="primary" @click="doSubmit">
                    提交代码
                  </a-button>
                </div>
              </div>
            </div>
          </a-card>
        </template>
      </a-split>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";

const size = ref<number>(0.5);
const themeName = ref("vs");

const tagData = [
  {
    value: "java",
    label: "Java",
    disable: false,
  },
  {
    value: "cpp",
    label: "C++",
    disable: true,
  },
  {
    value: "go",
    label: "GoLand",
    disable: true,
  },
  {
    value: "ts",
    label: "TypeScript",
    disable: true,
  },
];

const editorThemeList = [
  {
    value: "vs",
    label: "Visual Studio(白色)",
  },
  {
    value: "vs-dark",
    label: "Visual Studio Dark(黑色)",
  },
  {
    value: "hc-black",
    label: "High Contrast Dark",
  },
];

const router = useRouter();

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
  const res = await QuestionControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  if (res.code === 0) {
    // router.push({ path: "/question_submit" });
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

<style>
.arco-tabs-content {
  padding-top: 0 !important;
}
</style>

<style scoped>
#viewQuestionsView {
  --maxPageWidth: 100vw;
  --mxPageHeight: 100vh;
  --heaherHeight: 200px;
  --maxViewPre: 90;
}

@media (max-width: 1100px) {
  #viewQuestionsView {
    --maxViewPre: 96;
  }
}

#viewQuestionsView .yxinmiracle-split {
  width: calc(var(--maxPageWidth) * var(--maxViewPre) / 100);
  margin: 0 auto;
  height: calc(var(--mxPageHeight) - var(--heaherHeight));
  border: 1px solid var(--color-border);
}

#viewQuestionsView .yxinmiracle-card {
  min-height: calc(var(--mxPageHeight) - var(--heaherHeight) - 44px);
}

.yxinmiracle-code-card {
  min-height: calc(var(--mxPageHeight) - var(--heaherHeight) - 3000px);
}

.arco-form {
  display: flex;
  flex-wrap: wrap; /* 允许项目在需要时换行 */
  justify-content: space-between; /* 保持间隔 */
}

.arco-form-item {
  flex: 1 1 50%; /* 默认情况下每个表单项占一半的宽度 */
  box-sizing: border-box; /* 边框盒模型，边框和内填充不会增加宽度 */
  padding: 0 10px; /* 可以根据需要调整间隙 */
  margin-right: 0;
  padding-right: 0;
}

.code-position {
  position: absolute;
}

.code-position .code-position-btn {
  position: relative;
  top: 20px;
  right: 20px;
}

/* 当屏幕宽度小于800px时，每个表单项占一行 */
@media (max-width: 1200px) {
  .arco-form-item {
    flex: 0 0 100%; /* 不允许收缩和扩展，固定占满一行 */
  }
}
</style>
