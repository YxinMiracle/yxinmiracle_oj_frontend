<template>
  <div class="userlogin">
    <h2>用户登录</h2>
    <a-form
      label-align="left"
      auto-label-width
      :model="loginForm"
      style="max-width: 60%; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" tooltip="请输入帐号" label="用户帐号">
        <a-input v-model="loginForm.userAccount" placeholder="请输入帐号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="loginForm.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const loading = ref(false);

const loginForm = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

const handleSubmit = async () => {
  loading.value = true;
  const res = await UserControllerService.userLoginUsingPost(loginForm);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    Message.success("登录成功");
  } else {
    Message.error("登录失败" + res.message);
  }
  loading.value = false;
};
</script>
