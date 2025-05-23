<template>
  <a-button type="primary" @click="handleClick">findByUserId</a-button>
</template>
<script setup lang="ts">
import {userApi} from "@/api/controller.api";

async function handleClick() {
  let user = await userApi.findByUserId({userId: "1"})
  console.log('findUser' + JSON.stringify(user))
}

</script>
<style scoped>

</style>