<script setup lang="ts">
import {useCashflowStore} from "@/stores/cashflow.ts";
import {computed, reactive} from "vue";
import {useRouter} from "vue-router";

const store = useCashflowStore()
const router = useRouter()
const transfer = reactive({
  from: {
    companyId: null,
    cashflowId: null,
    transferAmount: 0
  },
  to: {
    companyId: null,
    cashflowId: null
  }
})

const getCashflowByCompanyId = (id: number) => {
  return store.items.filter(c => c.companyId === id)
}

const getCashflowById = (cashflowId: string) => {
  const data = store.items.find(i => i.id === cashflowId)
  if (data) {
    return data
  }
  return null
}

const newAmount = computed(() => {
  if (transfer.from.transferAmount && transfer.to.cashflowId) {
    return transfer.from.transferAmount + (getCashflowById(transfer.to.cashflowId)?.amount ?? 0)
  }
  return null
})
const submit = () => {
  if (!transfer.from.cashflowId || !transfer.to.cashflowId) return
  const fromCashflow = getCashflowById(transfer.from.cashflowId)
  if (fromCashflow && fromCashflow.amount) {
    fromCashflow.amount -= transfer.from.transferAmount
    store.addItem(fromCashflow)
  }
  const toCashflow = getCashflowById(transfer.to.cashflowId)
  if (toCashflow && toCashflow.amount) {
    toCashflow.amount += transfer.from.transferAmount
    store.addItem(toCashflow)
  }
  router.push("/")
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Transfer Cashflow</h2>
    <label>From Company</label>
    <select v-model="transfer.from.companyId">
      <option v-for="company in store.companies" :key="company.id" :value="company.id">{{ company.name }}</option>
    </select>

    <template v-if="transfer.from.companyId">
      <label>From Cashflow</label>
      <select v-model="transfer.from.cashflowId">
        <option v-for="cashflow in getCashflowByCompanyId(transfer.from.companyId)" :key="cashflow.id" :value="cashflow.id">{{ cashflow.label }}</option>
      </select>
    </template>
    <template v-if="transfer.from.cashflowId">
      <label>Current Amount</label>
      <input :value="getCashflowById(transfer.from.cashflowId)?.amount" disabled />
      <label>Transfer Amount</label>
      <input v-model.number="transfer.from.transferAmount" type="number" />
    </template>

    <hr />

    <label>To Company</label>
    <select v-model="transfer.to.companyId">
      <option v-for="company in store.companies" :key="company.id" :value="company.id">{{ company.name }}</option>
    </select>

    <template v-if="transfer.to.companyId">
      <label>To Cashflow</label>
      <select v-model="transfer.to.cashflowId">
        <option v-for="cashflow in getCashflowByCompanyId(transfer.to.companyId)" :key="cashflow.id" :value="cashflow.id">{{ cashflow.label }}</option>
      </select>
    </template>
    <template v-if="transfer.to.cashflowId">
      <label>Current Amount</label>
      <input :value="getCashflowById(transfer.to.cashflowId)?.amount" disabled />
    </template>

    <div>
      <label>New Amount</label>
      <input disabled :value="newAmount" />
    </div>

    <button type="submit">Transfer</button>
  </form>
</template>

<style scoped>

</style>