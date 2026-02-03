import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { TAccount } from '@/types/account.type';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts: Ref<TAccount[]> = ref([]);

  function addAccount() {
    accounts.value.push({
      id: accounts.value.length + 1,
      tags: [],
      type: null,
      login: null,
      password: null,
    });
  }
  
  function updateAccount(accountId: number, updatedAccount: Partial<Omit<TAccount, 'id'>>) {
    const account = accounts.value.find(account => account.id === accountId);
    if (!account) return

    Object.assign(account, updatedAccount)
  }

  function removeAccount(accountId: number) {
    accounts.value = accounts.value.filter(account => account.id !== accountId);
  }

  return { accounts, addAccount, removeAccount, updateAccount }
}, {persist: true})
