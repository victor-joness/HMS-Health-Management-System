
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
}

export const TransactionFilters = ({
  searchQuery,
  onSearchChange,
  onTabChange
}: TransactionFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar transação..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => onTabChange(value)}
        >
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="expense">Despesas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
