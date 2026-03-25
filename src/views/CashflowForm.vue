<script setup lang="ts">
import {onMounted} from 'vue'
import {useCashflowStore} from '../stores/cashflow'
import {useRouter} from "vue-router";

const props = defineProps(['id'])
const store = useCashflowStore()
const router = useRouter()

onMounted(() => {
  store.fetchItem(props.id)
})

const submit = () => {
  if (!store.item.label || !store.item.amount) return;
  store.addItem(store.item);
  router.push('/')

}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Add Cashflow</h2>
    {{store.item}}
    <input v-model="store.item.label" placeholder="Label (e.g. Rent)" required />
    <input v-model.number="store.item.amount" type="number" placeholder="Amount" required />

    <select v-model="store.item.type">
      <option value="income">Income (+)</option>
      <option value="expense">Expense (-)</option>
    </select>

    <select v-model="store.item.frequency">
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>

    <button type="submit">Add</button>
  </form>
</template>

<style scoped>

</style>