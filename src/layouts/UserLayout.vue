<template>
  <div id="userlayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" class="logo" alt="" />
          <div>YxinMiracle Oj</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        YxinMiracle Oj By YxinMiracle
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userlayout {
  text-align: center;
  background: linear-gradient(to right, #fcfcfc, #fff);
}

#userlayout .logo {
  width: 64px;
  height: 64px;
}

#userlayout .header {
  box-shadow: #eee 1px 1px 5px;
  text-align: left;
  background: white;
  margin-bottom: 16px;
  padding-left: 4%;
  padding-right: 4%;
}

#userlayout .header div {
  color: #444;
  margin-left: 12px;
  font-weight: bold;
}

#userlayout .footer {
  background: #efefef;
  padding: 16px;
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script></script>
