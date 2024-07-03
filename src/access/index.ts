import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import { routes } from "@/router/routes";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 如果之前没有登录过，或者之前登录过可以进行自动登录
  if (!loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  // 如果这个页面不需要访问权限
  const needAccess = (to?.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  const pathString: string[] = [];
  routes.forEach((route) => {
    const nextPath = route?.children || [];
    nextPath.forEach((path: any) => {
      pathString.push(path.path);
    });
    if (route.path.endsWith("/:id")) {
      pathString.push(route.path.substring(0, route.path.indexOf("/:id")));
    }
    pathString.push(route.path);
  });

  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN ||
      !loginUser ||
      !loginUser.userRole
    ) {
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
