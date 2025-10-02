
import { useState } from "react";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionsTable } from "./TransactionsTable";
import { CategoryDistribution } from "./CategoryDistribution";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "Receita" | "Despesa";
  status: "Confirmado" | "Pendente" | "Cancelado";
  reference?: string;
}

interface TransactionsContentProps {
  transactions: Transaction[];
}

export const TransactionsContent = ({ transactions }: TransactionsContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = (activeTab === "all") ||
                      (activeTab === "income" && tx.type === "Receita") ||
                      (activeTab === "expense" && tx.type === "Despesa") ||
                      (activeTab === "pending" && tx.status === "Pendente");
    
    return matchesSearch && matchesTab;
  });

  // Sample category data for demonstration
  const incomeCategories = [
    { name: "Consultas", amount: 1250.00, percentage: 35 },
    { name: "Procedimentos", amount: 4500.00, percentage: 60 },
    { name: "Exames", amount: 750.00, percentage: 20 },
    { name: "Internações", amount: 3500.00, percentage: 45 },
  ];

  const expenseCategories = [
    { name: "Pessoal", amount: 12500.00, percentage: 75 },
    { name: "Suprimentos", amount: 1200.00, percentage: 20 },
    { name: "Utilidades", amount: 850.00, percentage: 15 },
    { name: "Manutenção", amount: 950.00, percentage: 18 },
  ];

  return (
    <div className="space-y-6">
      <TransactionFilters 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        onTabChange={setActiveTab} 
      />
      <TransactionsTable transactions={filteredTransactions} />
      <CategoryDistribution 
        incomeCategories={incomeCategories} 
        expenseCategories={expenseCategories} 
      />
    </div>
  );
};
