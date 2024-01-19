<template>
  <div class="home">
    <div class="left"></div>
    <div class="right">
      <el-form ref="ruleFormRef" style="width: 100%;" :model="ruleForm" :rules="rules" label-width="60px"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="密码" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="账号" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi } from "@/api/index";
import { useRouter } from "vue-router";
const router = useRouter()
interface RuleForm {
  username: string,
  password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: 'demo',
  password: 'zh@hm#23',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi(ruleForm).then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token)
        router.push('/main')
        open2('登录成功')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const open2 = (itme) => {
  ElMessage({
    showClose: true,
    message: itme,
    type: 'success',
  })
}


</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;

  .left {
    width: 60%;
  }

  .right {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>