import { createRouter, createWebHistory } from 'vue-router'

import CashflowList from '../views/CashflowList.vue'
import CashflowForm from '../views/CashflowForm.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'list',
                component: CashflowList
            },
            {
                path: '/add',
                name: 'add',
                component: CashflowForm
            },
            {
                path: '/edit/:id',
                name: 'edit',
                component: CashflowForm
            }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})