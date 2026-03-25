import { defineStore } from 'pinia'
import {type CashflowItem, type Frequency} from '../types/cashflow'
import {computed, ref} from "vue";
import {v4 as uuidv4} from 'uuid';
import {useLocalStorage} from "@vueuse/core";

export const useCashflowStore = defineStore('cashflow', () =>{
    // State
    const projectionMonths = ref(12);
    const companies = ref([
        {id: 1, name: 'Company A'},
        {id: 2, name: 'Company B'},
        {id: 3, name: 'Company C'},
    ]);
    const items = useLocalStorage<CashflowItem[]>('cashflow-items', []);
    const item = ref<CashflowItem>({
        id: uuidv4(),
        amount: null,
        frequency: 'daily',
        label: '',
        type: 'income',
        companyId: null
    });

    const selectedCompanyId = ref<number | null>(null);

    // Getters (Computed)
    const projection = computed(() => {
        const companyId = selectedCompanyId.value;
        console.log(companyId)
            let runningBalance = 0;
            const data = [];
            const totalDays = projectionMonths.value * 30;
            const cashflowData = items.value.filter(item => item.companyId === companyId);
            console.log(items.value)

            for (let day = 1; day <= totalDays; day++) {
                cashflowData.forEach(item => {
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

    const getCompanyById = computed(() => {
        return (id: number | null) =>  {
            const company = companies.value.find(c => c.id === id)
            if (company) {
                return company.name
            }
            return 'Unknown'
        }
    })


    // Actions
    function fetchItem(id: string | undefined) {
        if (id) {
            const data = items.value.find(i => i.id === id);
            if (data) {
                item.value = data;
            } else {
                item.value = {
                    id: uuidv4(),
                    amount: null,
                    frequency: 'daily',
                    label: '',
                    type: 'income',
                    companyId: null
                }
            }
        } else {
            item.value = {
                id: uuidv4(),
                amount: null,
                frequency: 'daily',
                label: '',
                type: 'income',
                companyId: null
            }
        }
    }
    function addItem(newItem: CashflowItem) {
        const foundData = items.value.find(i => i.id === newItem.id);
        if (foundData) {
            Object.assign(foundData, newItem);
        } else {
            items.value.push({...newItem});
        }
    }

    function removeItem(id: string) {
        items.value = items.value.filter(i => i.id !== id)
    }


    return {
        projectionMonths,
        items,
        projection,
        addItem,
        removeItem,
        fetchItem,
        item,
        companies,
        getCompanyById,
        selectedCompanyId
    };
});