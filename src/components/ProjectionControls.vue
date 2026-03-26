<script setup lang="ts">
import { useCashflowStore } from '@/stores/cashflow.ts'

const store = useCashflowStore()
</script>

<template>
  <section class="mb-6">
    <label class="block font-bold">Project for Number of Months:</label>
    <input v-model.number="store.projectionMonths" type="number" class="border p-2 w-20" />
  </section>
</template>