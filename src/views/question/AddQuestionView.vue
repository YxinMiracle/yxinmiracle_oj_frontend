<template>
  <div id="addQuestionView">
    <h2>创建题目页</h2>
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题"></a-input>
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <div style="min-height: 400px">
          <MdEditor
            :value="form.content"
            :handle-change="onContentChange"
          ></MdEditor>
        </div>
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="onAnswerChange"
        ></MdEditor>
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical">
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              placeholder="请输入内存限制"
              v-model="form.judgeConfig.memoryLimit"
              mode="button"
              :min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              placeholder="请输入内存限制"
              v-model="form.judgeConfig.stackLimit"
              mode="button"
              :min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              placeholder="请输入内存限制"
              v-model="form.judgeConfig.timeLimit"
              mode="button"
              :min="0"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :label="`测试用例-${index + 1}`"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试用例（输入用例）"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试用例（输出用例）"
              />
            </a-form-item>
            <a-button
              @click="handleDelete(index)"
              status="danger"
              :style="{ marginLeft: '10px', float: 'right' }"
              >删除
            </a-button>
            <a-divider />
          </a-space>
        </a-form-item>
        <div>
          <a-button type="outline" @click="handleAdd">添加用例</a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");

const form = ref<QuestionAddRequest>({
  answer: "",
  content: "",
  judgeCase: [],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
  title: "",
});

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res.code === 0) {
    form.value = res.data;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [];
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig.timeLimit = Number(
        res.data?.judgeConfig?.timeLimit
      );
      form.value.judgeConfig.memoryLimit = Number(
        res.data?.judgeConfig.memoryLimit
      );
      form.value.judgeConfig.stackLimit = Number(
        res.data?.judgeConfig.stackLimit
      );
    }
  } else {
    Message.error("数据加载失败", res.message);
  }
};

onMounted(() => {
  loadData();
});

const onContentChange = (v: string) => {
  form.value.content = v;
};

const onAnswerChange = (v: string) => {
  form.value.answer = v;
};

const handleAdd = () => {
  if (form.value.judgeCase) {
    form.value.judgeCase.push({
      input: "",
      output: "",
    });
  }
};

const handleDelete = (index: number) => {
  if (form.value.judgeCase) {
    form.value.judgeCase.splice(index, 1);
  }
};

const doSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新题目失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value as QuestionAddRequest
    );
    if (res.code === 0) {
      Message.success("创建题目成功");
    } else {
      Message.error("创建题目失败" + res.message);
    }
  }
};
</script>

<style scoped>
#addQuestionView {
}
</style>
