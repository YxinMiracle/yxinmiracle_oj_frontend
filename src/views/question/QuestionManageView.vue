<template>
  <div id="questionManageView">
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
      <template #content="{ record }">
        {{
          record.content.length > 50
            ? record.content.substring(0, 50) + "..."
            : record.content
        }}
      </template>
      <template #tags="{ record }">
        <vue-json-pretty :data="JSON.parse(record.tags)" />
      </template>
      <template #judgeConfig="{ record }">
        <vue-json-pretty :data="JSON.parse(record.judgeConfig)" />
      </template>
      <template #judgeCase="{ record }">
        <vue-json-pretty :deep="2" :data="JSON.parse(record.judgeCase)" />
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import VueJsonPretty from "vue-json-pretty";

const show = ref(true);
const loading = ref(false);
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 12,
  current: 1,
});

const loadData = async () => {
  loading.value = true;
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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
    title: "id",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 100,
  },
  {
    title: "内容",
    slotName: "content",
    width: 100,
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
  },
  {
    title: "判题用例",
    slotName: "judgeCase",
  },
  {
    title: "用户Id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
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

const doUpdate = async (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    Message.success("删除数据成功");
    loadData();
  } else {
    Message.error("删除数据失败", res.message);
  }
  console.log(question);
};
</script>

<style scoped>
#questionManageView {
  max-width: 80%;
  margin: 0 auto;
}
</style>
