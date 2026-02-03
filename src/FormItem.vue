<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Form } from '@primevue/forms'
import { stringToTags } from './util/tagConvert'
import { debounce } from './util/debounceFn'
import { useAccountsStore } from './stores/accounts'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import type { TAccount } from './types/account.type'

const props = defineProps<{
  data: TAccount
}>()

const accountsStore = useAccountsStore()

const account = ref<TAccount>(props.data)

watch(
  () => account.value.type,
  (newType) => {
    if (newType !== 'local') account.value.password = null
  }
)

watch(
  account,
  (newAccount) => {
    debouncedUpdate(newAccount)
  },
  { deep: true }
)

const isShow = computed(() => account.value.type === 'local')
const inputWidthStyle = computed(() => ({
  width: isShow.value ? '9vw' : '19vw',
}))

const options = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'LDAP' },
]

const debouncedUpdate = debounce((account: TAccount) => {
  accountsStore.updateAccount(account.id, {
    tags: account.tags,
    type: account.type,
    login: account.login,
    password: account.password,
  })
}, 900)

const handleTagsInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  account.value.tags = stringToTags(target.value)
}

const handleRemove = () => {
  accountsStore.removeAccount(account.value.id)
}
</script>

<template>
  <Form>
    <div class="form-container">
      <InputText type="text" placeholder="Метки" class="form-item" @input="handleTagsInput" />
      <Select
        :options="options"
        optionLabel="label"
        class="form-item"
        placeholder="Тип записи"
        v-model="account.type"
        optionValue="value"
      />
      <InputText
        type="text"
        name="login"
        placeholder="Логин"
        :style="inputWidthStyle"
        v-model="account.login"
      />
      <Password
        :feedback="false"
        toggleMask
        placeholder="Пароль"
        v-if="isShow"
        :inputStyle="inputWidthStyle"
        v-model="account.password"
      />
      <Button severity="secondary" icon="pi pi-trash" @click="handleRemove" />
    </div>
  </Form>
  <!-- <pre>{{ account }}</pre> -->
</template>

<style scoped>
.form-container {
  display: flex;
  gap: 1vw;
}

.form-item {
  min-width: 12vw;
}
</style>
