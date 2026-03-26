export type Frequency = 'daily' | 'weekly' | 'monthly'
export type Type = 'income' | 'expense'

export interface CashflowItem {
    id: string
    amount: number | null
    frequency: Frequency
    label: '',
    type: Type,
    companyId: number | null
}
export type CashflowProjection = {
    month: number,
    balance: number
}

export interface Companies {
    id: number,
    name: string
}

