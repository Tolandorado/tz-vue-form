import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types/account.type';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts: Ref<Account[]> = ref([]);

  function addAccount() {
    accounts.value.push({
      id: accounts.value.length + 1,
      marks: [],
      type: null,
      login: null,
      password: null,
    });
  }

  function changeAccountField<T extends keyof Account>(accountId: number, field: T, value: Account[T]) {
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
