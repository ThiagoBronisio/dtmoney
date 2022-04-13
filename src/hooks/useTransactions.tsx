import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { api } from "../services/api"

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createAt">;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction:(transaction : TransactionInput ) => Promise<void>;
}


export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(
        () => {
            api.get("transaction")
                .then(
                    response => {
                        setTransaction(response.data.transactions)
                    }
                )

        }, []
    )

   async function createTransaction(transactionInput: TransactionInput) {
       const response = await api.post('/transaction', {
           ...transactionInput,
            createAt: new Date(),
            
       })
       const { transaction } = response.data

       setTransaction([
           ...transactions,
           transaction,
       ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransaction(){
    const context = useContext(TransactionsContext);
    return context;
}