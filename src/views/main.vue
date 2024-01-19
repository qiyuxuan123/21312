<template>
  <el-container>
    <el-aside width="200px" style="height: 100vh;">
      <el-menu default-active="2">
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-sub-menu :index="item.title" v-for="item in menu" :key="item.id">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item :index="ite.title" v-for="ite in item.children" :key="ite.id" @click="go(ite.title)">{{ ite.title
          }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #ccc;">
        <div style="float: right;"><el-button type="info" @click="tc">退出登录</el-button>
          <span>管理员</span>
        </div>

      </el-header>
      <el-main style="background-color: #ccc;"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { menusApi } from "@/api/index";
import { useRouter } from "vue-router";
const router = useRouter()
import { ref, reactive } from "vue";
const menu = ref([])

const go = (item: string) => {
  if (item === '月卡管理') {
    router.push('/car')
  }
}

const menus = () => {
  menusApi().then(res => {
    console.log(res);
    menu.value = res.data
  })
}
const tc = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
menus()
</script>

<style lang="scss" scoped></style>