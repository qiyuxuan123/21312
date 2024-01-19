<template>
    <div class="home" style="width: 100vw;height: 100vh;background-color: #f4f6f8;">
        <header style="background-color: #fff;line-height: 60px;"><span @click="$router.back()"><-- 返回</span>&emsp; |
                    &emsp;新增月卡</header>

        <el-card class="box-card" style="width: 1600px; margin: 40px auto;">
            <h3 style="margin: 10px 10px;">车辆信息</h3>
            <el-form ref="ruleFormRef" style="width: 100%;" :model="ruleForm" :rules="rules" label-width="100px"
                class="demo-ruleForm" :size="formSize" status-icon>
                <div class="box" style="width: 100%;display: flex;justify-content: space-around;">
                    <el-form-item style="width: 100%;" label="车主姓名" prop="personName">
                        <el-input v-model="ruleForm.personName" />
                    </el-form-item>
                    <el-form-item style="width: 100%;" label="联系方式" prop="phoneNumber">
                        <el-input v-model="ruleForm.phoneNumber" />
                    </el-form-item>
                </div>
                <div class="box" style="width: 100%;display: flex;justify-content: space-around;">
                    <el-form-item style="width: 100%;" label="车辆号码" prop="carNumber">
                        <el-input v-model="ruleForm.carNumber" />
                    </el-form-item>
                    <el-form-item style="width: 100%;" label="车辆品牌" prop="carBrand">
                        <el-input v-model="ruleForm.carBrand" />
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="box-card" style="width: 1600px; margin: 40px auto;">
            <h3 style="margin: 10px 10px;">最新一次月卡缴费信息</h3>
            <el-form ref="ruleFormRef" style="width: 100%;" :model="ruleForm" :rules="rules" label-width="100px"
                class="demo-ruleForm" :size="formSize" status-icon>
                <div class="box" style="width: 100%;display: flex;justify-content: space-around;">
                    <el-form-item label="有效日期" required>
                        <el-col :span="11">
                            <el-form-item prop="cardStartDate">
                                <el-date-picker v-model="ruleForm.cardStartDate" type="date" label="开始日期" placeholder="开始日期"
                                    style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="2">
                            <span class="text-gray-500">-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="cardEndDate">
                                <el-date-picker v-model="ruleForm.cardEndDate" type="date" label="结束日期" placeholder="结束日期"
                                    style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>



                    <el-form-item style="width: 60%;" label="支付金额" prop="paymentAmount">
                        <el-input v-model="ruleForm.paymentAmount" />
                    </el-form-item>
                </div>
                <div class="box" style="width: 100%;">
                    <el-form-item style="width: 50%;" label="支付方式" prop="paymentMethod
">
                        <el-select v-model="ruleForm.paymentMethod" placeholder="请选择">
                            <el-option label="支付宝" value="Alipay" />
                            <el-option label="微信" value="WeChat" />
                            <el-option label="线下" value="Cash" />
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>

        <footer style="line-height: 60px; width: 100vw">
            <el-form-item style="margin: auto;">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Create
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { addlistApi } from '../api/index'
import { useRouter } from "vue-router";
const router = useRouter();
interface RuleForm {
    personName: string,
    phoneNumber: string,
    carNumber: string,
    carBrand: string,
    cardStartDate: string,
    cardEndDate: string,
    paymentAmount: string,
    paymentMethod: string,
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    personName: '',
    phoneNumber: '',
    carNumber: '',
    carBrand: '',
    cardStartDate: '',
    cardEndDate: '',
    paymentAmount: '',
    paymentMethod: '',
})

const rules = reactive<FormRules<RuleForm>>({
    personName: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    phoneNumber: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    carNumber: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    carBrand: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    cardStartDate: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    cardEndDate: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    paymentAmount: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
    paymentMethod: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' }
    ],
})


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            addlistApi(ruleForm).then(res => {
                console.log(res);
                router.push('/car')
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))

</script>

<style lang="scss" scoped>
footer {
    background-color: #fff;
    line-height: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
}
</style>