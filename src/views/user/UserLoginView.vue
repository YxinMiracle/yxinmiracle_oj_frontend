<template>
  <div class="userlogin">
    <a-card class="card">
      <h2>用户登录</h2>
      <a-form
        label-align="left"
        auto-label-width
        :model="loginForm"
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
    </a-card>
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
const route = useRoute(); // 获取当前路由对象

const handleSubmit = async () => {
  loading.value = true;
  const res = await UserControllerService.userLoginUsingPost(loginForm);
  if (res.code === 0) {
    const redirectUrl = route.query.redirect || "/"; // 从当前路由的query中获取redirect参数
    await store.dispatch("user/getLoginUser");
    router.push({
      path: redirectUrl,
      replace: true,
    });
    Message.success("登录成功");
  } else {
    Message.error("登录失败" + res.message);
  }
  loading.value = false;
};
</script>

<style scoped>
.userlogin {
  --content-width-size: 90;
  --page-width: 100vw;
  --page-heigh: 100vh;
  --card-height: 146.98px;
  --header-height: 67.09px;
}

/* 如果屏幕宽度至少为600px，适用于中等大小的屏幕 */
@media (min-width: 700px) {
  .userlogin {
    --content-width-size: 80;
  }
}

/* 如果屏幕宽度至少为1000px，适用于大屏幕 */
@media (min-width: 1200px) {
  .userlogin {
    --content-width-size: 70;
  }
}

.userlogin .card {
  width: calc(var(--page-width) * (var(--content-width-size) / 100));
  margin: 0 auto;
  margin-top: calc(
    (var(--page-heigh) - var(--header-height)) / 2 - var(--card-height) * 1.5
  );
}
</style>
