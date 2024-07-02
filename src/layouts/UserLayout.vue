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
        <a-card class="card">
          <router-view />
        </a-card>
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

#userlayout .content {
  margin-bottom: 16px;
  padding-left: 4%;
  padding-right: 4%;
  margin-top: 60px;
}

#userlayout .card {
  width: 70%;
  padding: 32px;
  margin: 0 auto;
}

/*!* 适用于整个.sticky-column类的自定义滚动条样式 *!*/
/*#userlayout::-webkit-scrollbar {*/
/*  width: 8px; !* 设置滚动条的宽度 *!*/
/*  background-color: #f5f5f5; !* 滚动条的背景色 *!*/
/*}*/

/*#userlayout::-webkit-scrollbar-thumb {*/
/*  border-radius: 10px; !* 滚动条的圆角 *!*/
/*  background-color: #555; !* 滚动条本身的颜色 *!*/
/*  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); !* 滚动条的阴影效果 *!*/
/*}*/

/*#userlayout::-webkit-scrollbar-track {*/
/*  border-radius: 10px; !* 滚动轨道的圆角 *!*/
/*  background-color: #f5f5f5; !* 滚动轨道的背景色 *!*/
/*  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1); !* 滚动轨道的阴影效果 *!*/
/*}*/

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
