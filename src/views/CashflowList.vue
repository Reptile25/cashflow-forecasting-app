<script setup lang="ts">
import { useCashflowStore } from '@/stores/cashflow'
import ProjectionControls from "@/views/ProjectionControls.vue";

const store = useCashflowStore()
</script>

<template>
  <template v-if="store.items.length > 0">
    <h2 class="text-2xl font-bold mb-4">Building Companies</h2>
    <table class="w-full border-collapse">
      <thead>
      <tr class="bg-gray-100 text-left">
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Amount</th>
        <th class="p-2 border">Type</th>
        <th class="p-2 border">frequency</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in store.items" :key="row.id">
        <td class="p-2 border">{{row.label}}</td>
        <td class="p-2 border">{{row.amount}}</td>
        <td class="p-2 border">{{row.type}}</td>
        <td class="p-2 border">{{row.frequency}}</td>
      </tr>
      </tbody>
    </table>
  </template>

  <ProjectionControls />

  <table class="w-full border-collapse">
    <thead>
    <tr class="bg-gray-100 text-left">
      <th class="p-2 border">Month</th>
      <th class="p-2 border">Projected Balance</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in store.projection" :key="row.month">
      <td class="p-2 border">Month {{ row.month }}</td>
      <td class="p-2 border" :class="row.balance < 0 ? 'text-red-500' : 'text-green-600'">
        ${{ row.balance.toLocaleString() }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>