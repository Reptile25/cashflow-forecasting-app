<script setup lang="ts">
import { useCashflowStore } from '@/stores/cashflow'
import ProjectionControls from "@/views/ProjectionControls.vue";
import {useRouter} from "vue-router";

const store = useCashflowStore()
const router = useRouter()
</script>

<template>
    <div v-if="store.items.length > 0" class="table-container">
      <h2>Building Companies</h2>
      <table>
        <thead>
        <tr >
          <th>Name</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Frequency</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in store.items" :key="row.id">
          <td>{{row.label}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.type}}</td>
          <td>{{row.frequency}}</td>
          <td data-label="">
            <div class="table-actions">
              <router-link :to="{ name: 'edit', params: { id: row.id } }">
                <button>Edit</button>
              </router-link>
              <button class="secondary" @click="store.removeItem(row.id)">Delete</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  <ProjectionControls />
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>Month</th>
        <th>Projected Balance</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in store.projection" :key="row.month">
        <td >Month {{ row.month }}</td>
        <td>${{ row.balance.toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>