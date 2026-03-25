import { defineStore } from 'pinia'
import {type CashflowItem, type Frequency} from '../types/cashflow'
import {computed, ref} from "vue";

export const useCashflowStore = defineStore('cashflow', () => {
    // State
    const projectionMonths = ref(12);
    const items = ref<CashflowItem[]>([]);

    // Getters (Computed)
    const projection = computed(() => {
        let runningBalance = 0;
        const data = [];
        const totalDays = projectionMonths.value * 30;

        for (let day = 1; day <= totalDays; day++) {
            items.value.forEach(item => {
                if (item.amount === null) return;
                const amount = item.type === 'income' ? item.amount : -item.amount;

                // Calculate based on frequency
                switch (item.frequency) {
                    case 'daily':
                        runningBalance += amount;
                        break;

                    case 'weekly':
                        if (day % 7 === 0) {
                            runningBalance += amount;
                        }
                        break;

                    case 'monthly':
                        if (day % 30 === 0) {
                            runningBalance += amount;
                        }
                        break;
                }
            });

            // Push a snapshot every 30 days
            if (day % 30 === 0) {
                data.push({
                    month: day / 30,
                    balance: Math.round(runningBalance)
                });
            }
        }
        return data;
    });

    function isDue(freq: Frequency, day: number): boolean {
        if (freq === 'daily') return true;
        if (freq === 'weekly') return day % 7 === 0;
        if (freq === 'monthly') return day % 30 === 0;
        return false;
    }

    // Actions
    function addItem(newItem: CashflowItem) {
        items.value.push({...newItem});
    }


    return {
        projectionMonths,
        items,
        projection,
        addItem
    };
});