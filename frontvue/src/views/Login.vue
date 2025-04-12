<template>
  <div class="login-container">
    <div
        style="background-color: #f2f2f2;padding: 40px;border-radius: 10px;width: 350px;margin-right: 300px;opacity: 0.8">
      <Form :model="formData" :rules="rules" ref="formRef">
        <FormItem name="username">
          <Input v-model:value="formData.username" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem name="password">
          <InputPassword v-model:value="formData.password" placeholder="请输入密码"/>
        </FormItem>
        <Button type="primary" @click="doLogin" :loading="loading" style="width: 100%">登录</Button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Form, Input, InputPassword, Button, FormItem, Image, Alert} from 'ant-design-vue';
import type {Rule} from "ant-design-vue/es/form";
import router from "@/router";

interface LoginForm {
  username: string;
  password: string;
}

// 表单数据
const formData = reactive<LoginForm>({
  username: '',
  password: ''
});
// 表单验证规则
const rules: { [key: string]: Rule[] } = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
};
const formRef = ref(null);
const loading = ref(false);
const errorMsg = ref('');

async function doLogin() {
  loading.value = true;
  await formRef.value.validate();
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === '123456') {
        resolve({success: true});
      } else {
        resolve({success: false});
      }
    }, 1000);
  });
  if (response && (response as any).success) {
    console.log('登录成功');
    localStorage.setItem('token', 'token');
    await router.push({name: 'home'});
    // 这里可以进行后续路由跳转等操作，比如跳转到首页
    // router.push('/home'); （假设配置了路由）
  } else {
    errorMsg.value = '用户名或密码错误';
  }
  loading.value = false;
}
</script>

<style scoped>
.login-container {
  background-image: url("../assets/login-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>