import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import { routes } from "@/router/routes";
import checkAccess from "@/access/checkAccess";
import * as path from "node:path";

router.beforeEach(async (to, from, next) => {
  const loginUser = store.state.user.loginUser;
  // 如果之前没有登录过，或者之前登录过可以进行自动登录
  if (!loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  // 如果这个页面不需要访问权限
  const needAccess = (to?.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  const pathString: string[] = [];
  routes.forEach((route) => {
    const nextPath = route?.children || [];
    nextPath.forEach((path: any) => {
      pathString.push(path.path);
    });
    pathString.push(route.path);
  });
  console.log(pathString);
  if (pathString.lastIndexOf(to.path) === -1) {
    // 表示这个用户访问的地方并不存在于我们的路由中，直接进行访问首页
    next("/");
    return;
  }
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN || !loginUser) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
