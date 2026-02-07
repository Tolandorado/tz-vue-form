<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Form } from '@primevue/forms'
import { Password, InputText, Select, Button, Textarea } from 'primevue'
import { stringToTags, tagsToString } from './util/tagConvert'
import { debounce } from './util/debounceFn'
import { useAccountsStore } from './stores/accounts'
import { z } from 'zod'
import type { TAccount } from './types/account.type'
import { zodResolver } from '@primevue/forms/resolvers/zod'

const options = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'LDAP' },
]

const props = defineProps<{
  data: TAccount
}>()

const accountsStore = useAccountsStore()
const account = ref<TAccount>({ ...props.data })

const accountFormSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  type: z.enum(['local', 'LDAP']),
  password: z.string().min(1, 'Пароль обязателен').nullable(),
  tags: z.array(z.object({ text: z.string() })).nullable(),
})
const resolver = zodResolver(accountFormSchema)

const isLocal = computed(() => account.value.type === 'local')
const inputWidthStyle = computed(() => ({
  width: isLocal.value ? '9vw' : '19vw',
}))
const displayTags = computed({
  get: () => tagsToString(account.value.tags),
  set: (newValue: string) => {
    account.value.tags = stringToTags(newValue)
  },
})

const debouncedUpdate = debounce((account: TAccount) => {
  accountsStore.updateAccount(account.id, {
    tags: account.tags,
    type: account.type,
    login: account.login,
    password: account.password,
  })
})

const handleRemove = () => {
  accountsStore.removeAccount(account.value.id)
}

watch(
  () => account.value.type,
  (newType) => {
    newType === 'LDAP' || null ? (account.value.password = null) : (account.value.password = '')
  }
)
watch(
  account,
  (newAccount) => {
    const result = accountFormSchema.safeParse(newAccount)

    if (!result.success) {
      console.log('Ошибка валидации \n', result.error)
      return
    }
    console.log('Игнорируем ошибку пароля для не-local типа')
    debouncedUpdate(newAccount)
  },
  { deep: true }
)
</script>

<template>
  <Form :resolver="resolver" :validateOnValueUpdate="true">
    <div class="form-container">
      <Textarea
        rows="1"
        autoResize
        type="text"
        placeholder="Метки"
        class="form-item"
        v-model="displayTags"
        :maxlength="50"
      />
      <Select
        name="type"
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
        :maxlength="100"
      />
      <Password
        name="password"
        v-if="isLocal"
        :feedback="false"
        toggleMask
        placeholder="Пароль"
        :inputStyle="inputWidthStyle"
        v-model="account.password"
        :maxlength="100"
        :invalid="isLocal && account.password === ''"
      />
      <Button severity="secondary" icon="pi pi-trash" @click="handleRemove" />
    </div>
  </Form>
  <!-- <pre>{{ account }}</pre> -->
</template>

<style scoped>
.form-container {
  display: flex;
  align-items: flex-start;
  gap: 1vw;
}

.form-item {
  min-width: 12vw;
}
</style>
