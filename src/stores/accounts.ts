import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { TAccount } from '@/types/account.type';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts: Ref<TAccount[]> = ref([]);

  function addAccount() {
    accounts.value.push({
      id: accounts.value.length + 1,
      marks: [],
      type: null,
      login: null,
      password: null,
    });
  }

  function changeAccountField<T extends keyof TAccount>(accountId: number, field: T, value: TAccount[T]) {
    const account = accounts.value.find(account => account.id === accountId);
    if (account) {
      account[field] = value;
    }
  }

  function removeAccount(accountId: number) {
    accounts.value = accounts.value.filter(account => account.id !== accountId);
  }

  return { accounts, addAccount, changeAccountField, removeAccount }
})
