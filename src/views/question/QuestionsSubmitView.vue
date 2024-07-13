<template>
  <div id="questionsSubmitView">
    <div style="margin-bottom: 16px">
      <a-form :model="searchParams" layout="inline" style="min-width: 280px">
        <a-form-item label="编程语言" field="language" style="min-width: 240px">
          <a-select
            v-model="searchParams.language"
            :style="{ width: '320px' }"
            placeholder="请选择编程语言"
          >
            <a-option>java</a-option>
            <a-option>cpp</a-option>
            <a-option>go</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="loadData">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-divider></a-divider>
    <a-table
      :loading="loading"
      :columns="columns"
      :data="dataList"
      @page-change="onPageChange"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
    >
      <template #judgeInfo="{ record }">
        <vue-json-pretty :data="record.judgeInfo" />
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status === 0" color="cyan" bordered>等待中</a-tag>
        <a-tag v-if="record.status === 1" color="arcoblue" bordered
          >判题中</a-tag
        >
        <a-tag v-if="record.status === 3" color="magenta" bordered>失败</a-tag>
        <a-tag v-if="record.status === 2" color="green" bordered>成功</a-tag>
      </template>
      <template #user="{ record }">
        {{ record.userVO.userName }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

const show = ref(true);
const loading = ref(false);
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  language: "",
  pageSize: 10,
  current: 1,
});

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    content: 1,
  };
  loadData();
};

const loadData = async () => {
  loading.value = true;
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("获取数据失败");
  }
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目 ID",
    dataIndex: "questionId",
  },
  {
    title: "提交者名称",
    slotName: "user",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
];

const router = useRouter();

watchEffect(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 跳转到作题界面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
    // path: `/manage/question`,
  });
};
</script>

<style scoped>
#questionsSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
