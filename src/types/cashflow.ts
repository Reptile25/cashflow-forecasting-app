export type Frequency = 'daily' | 'weekly' | 'monthly'
export type Type = 'income' | 'expense'

export interface CashflowItem {
    id: string
    amount: number | null
    frequency: Frequency
    label: '',
    type: 'income',
}