<template>
    <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="车牌号码">
                <el-input v-model="formInline.carNumber" clearable />
            </el-form-item>
            <el-form-item label="车主姓名">
                <el-input v-model="formInline.personName" clearable />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select v-model="formInline.cardStatus" clearable>
                    <el-option label="全部" value="" />
                    <el-option label="有效" value="0" />
                    <el-option label="无效" value="1" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="addcard">添加月卡</el-button>
        <el-button>批量删除</el-button>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="55" />
            <el-table-column prop="personName" label="车主姓名" />
            <el-table-column prop="phoneNumber" label="联系方式" />
            <el-table-column prop="carNumber" label="车牌号码" />
            <el-table-column prop="carBrand" label="车辆品牌" />
            <el-table-column prop="totalEffectiveDate" label="剩余有效天数" />
            <el-table-column prop="cardStatus" label="状态" />
            <el-table-column label="操作" width="260">
                <template #default="scope">
                    <el-button type="text" size="small">续费</el-button>
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="formInline.page" v-model:page-size="formInline.pageSize"
            :page-sizes="[2, 4, 5, 10]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="getlist" @current-change="getlist" />
    </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { dellistApi, getlistApi } from "@/api/index";
import { useRouter } from "vue-router";
const router = useRouter()
const tableData = ref([{}])
const total = ref(0)
const getlist = () => {
    getlistApi(formInline).then(res => {
        console.log(res);
        tableData.value = res.data.rows
        total.value = res.data.total
    })
}
const addcard = () => {
    router.push('/addcar')
}
const del = (id: number) => {
    dellistApi({ id: id }).then(res => {
        console.log(res);
        getlist()
    })
}
const formInline = reactive({
    carNumber: '',
    personName: '',
    cardStatus: '',
    page: '1',
    pageSize: '10'
})

const onSubmit = () => {
    getlist()
}

getlist()
</script>

<style lang="scss" scoped></style>