<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useCashflowStore} from '../stores/cashflow'
import {type CashflowItem, } from '../types/cashflow'
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "vue-router";

const store = useCashflowStore()
const router = useRouter()
const companyId = ref<number | null>(null)

const form = reactive<CashflowItem>({
  id: uuidv4(),
  label: '',
  amount: 0,
  type: 'income',
  frequency: 'monthly'
});

const submit = () => {
  if (!form.label || !form.amount) return;
  store.addItem(form);
  form.label = '';
  form.amount = null;
  router.push('/')

}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Add Cashflow</h2>
    <input v-model="form.label" placeholder="Label (e.g. Rent)" required />
    <input v-model.number="form.amount" type="number" placeholder="Amount" required />

    <select v-model="form.type">
      <option value="income">Income (+)</option>
      <option value="expense">Expense (-)</option>
    </select>

    <select v-model="form.frequency">
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>

    <button type="submit">Add</button>
  </form>
</template>

<style scoped>

</style>