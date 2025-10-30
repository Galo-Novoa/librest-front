import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BalanceStore {
  balance: number;
  transactions: Array<{
    id: string;
    type: 'deposit' | 'purchase' | 'refund';
    amount: number;
    description: string;
    date: string;
  }>;
  
  // Actions
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
  getBalance: () => number;
  getTransactions: () => Array<any>;
  clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set, get) => ({
      balance: 10000, // Saldo inicial de $10,000
      transactions: [],

      deposit: (amount: number) => {
        if (amount <= 0) return;
        
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: Date.now().toString(),
              type: 'deposit',
              amount,
              description: `Recarga de saldo`,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }));
      },

      withdraw: (amount: number) => {
        const { balance } = get();
        
        if (amount <= 0 || amount > balance) {
          return false;
        }

        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            {
              id: Date.now().toString(),
              type: 'purchase',
              amount: -amount,
              description: `Compra realizada`,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        }));
        
        return true;
      },

      getBalance: () => get().balance,
      
      getTransactions: () => get().transactions,
      
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'balance-storage',
    }
  )
);