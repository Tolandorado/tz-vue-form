<script setup lang="ts">
import { Button } from 'primevue'
import { useAccountsStore } from './stores/accounts'
import FormItem from './FormItem.vue'
import { storeToRefs } from 'pinia'

const accountsStore = useAccountsStore()
const { accounts } = storeToRefs(accountsStore)

const handleAddAccount = () => {
  accountsStore.addAccount()
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Учетные записи</h1>
      <Button severity="secondary" icon="pi pi-plus" @click="handleAddAccount" />
    </div>
    <div class="info">
      <span class="pi pi-question-circle" />
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div class="list-header">
      <span class="list-header-tags">Метки</span>
      <span class="list-header-type">Тип записи</span>
      <span class="list-header-login">Логин</span>
      <span class="list-header-password">Пароль</span>
      <span class="list-header-delete"></span>
    </div>
    <div class="list-container">
      <FormItem v-for="account in accounts" :data="account" :key="account.id" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  height: 100vh;
  margin: 2em auto;
  gap: 2em;
  min-width: 460px;
  max-width: 1200px;
}

.info {
  display: flex;
  align-items: center;
  gap: 1em;
  background-color: rgb(240, 241, 241);
  padding: 1px 12px;
  border-radius: 10px;
}

.header {
  display: flex;
  align-items: center;
  gap: 1em;
}

.list-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1em;
}

.list-header {
  display: flex;
  gap: 1vw;
  margin-top: 2em;
}

.list-header-tags,
.list-header-type {
  min-width: 12vw;
}

.list-header-login,
.list-header-password {
  min-width: 9vw;
}

.list-header-delete {
  min-width: 3em;
}
</style>
