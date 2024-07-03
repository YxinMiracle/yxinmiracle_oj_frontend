<template>
  <a-row id="globalHeader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">YxinMiracle Oj</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div class="loginNameShow">
        <div>{{ userName }}</div>
        <div class="subLoginCard">
          <span class="userName" @click="userLoginStateClick">{{
            store.state.user?.loginUser?.userRole === ACCESS_ENUM.NOT_LOGIN
              ? "进行登录"
              : "退出登录"
          }}</span>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const store = useStore();
const selectedKeys = ref(["/"]);

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({ path: key });
};

const userName = computed(() => {
  return store.state.user?.loginUser?.userRole === ACCESS_ENUM.NOT_LOGIN
    ? "未登录"
    : store.state.user?.loginUser?.userName;
});

// 可展示的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

const userLoginStateClick = async () => {
  const isLogin =
    store.state.user?.loginUser?.userRole === ACCESS_ENUM.NOT_LOGIN
      ? "进行登录"
      : "退出登录";
  if (isLogin === "退出登录") {
    const res = await UserControllerService.userLogoutUsingPost();
    if (res.code === 0) {
      Message.success("用户退出成功");
      await store.dispatch("user/getLoginUser");
    } else {
      Message.error("用户退出失败");
    }
  }
  if (isLogin === "进行登录") {
    router.push({ path: "/user/login" });
  }
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 40px;
}

.loginNameShow {
  position: relative;
}

.loginNameShow:hover .subLoginCard {
  visibility: visible;
  opacity: 1; /* 完全不透明 */
  transform: translateY(0); /* 移动到最终位置 */
}

.subLoginCard {
  z-index: 100;
  background: white;
  position: absolute;
  width: 100px;
  height: 60px;
  border: #c7c7c7 1px solid;
  font-size: 18px;
  text-align: center;
  top: 41px;
  right: 24px;
  visibility: hidden; /* 默认隐藏 */
  opacity: 0; /* 开始时透明 */
  transform: translateY(-20px); /* 初始位置稍微向上 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25); /* 添加阴影 */
}

.userName {
  line-height: 60px;
  font-family: Inter, "-apple-system", BlinkMacSystemFont, "PingFang SC",
    "Hiragino Sans GB", "noto sans", "Microsoft YaHei", "Helvetica Neue",
    Helvetica, Arial, sans-serif;
}

.subLoginCard .userName:hover {
  background: #c7c7c7;
  cursor: pointer;
}
</style>
