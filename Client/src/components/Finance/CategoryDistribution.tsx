
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
}

interface CategoryDistributionProps {
  incomeCategories: CategoryData[];
  expenseCategories: CategoryData[];
}

export const CategoryDistribution = ({
  incomeCategories,
  expenseCategories
}: CategoryDistributionProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Categorias de Receitas</CardTitle>
          <CardDescription>Distribuição por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomeCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span>{category.name}</span>
                  <span className="text-green-600">R$ {category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorias de Despesas</CardTitle>
          <CardDescription>Distribuição por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span>{category.name}</span>
                  <span className="text-red-600">R$ {category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
