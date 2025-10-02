
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";

interface StatCardsProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  pendingIncome: number;
  pendingExpense: number;
}

export const StatCards = ({
  balance,
  totalIncome,
  totalExpense,
  pendingIncome,
  pendingExpense
}: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saldo Atual</p>
              <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {balance.toFixed(2)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Receitas</p>
              <h3 className="text-2xl font-bold text-green-600">
                R$ {totalIncome.toFixed(2)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Despesas</p>
              <h3 className="text-2xl font-bold text-red-600">
                R$ {totalExpense.toFixed(2)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
              <h3 className="text-2xl font-bold text-amber-600">
                R$ {pendingIncome - pendingExpense >= 0 ? "+" : ""}{(pendingIncome - pendingExpense).toFixed(2)}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
