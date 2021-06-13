<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <MenuView />
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <HeaderView />
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <FooterView />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import MenuView from "./components/menu.vue";
import HeaderView from "./components/header.vue";
import FooterView from "./components/footer.vue";
export default defineComponent({
  components: {
    MenuView,
    HeaderView,
    FooterView,
  },
});
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-footer {
  margin: 30px 0;
  text-align: center;
}
</style>