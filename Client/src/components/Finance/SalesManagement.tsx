
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, PlusCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  name: string;
  type: "credit" | "debit" | "cash" | "insurance" | "transfer";
  icon: React.ReactNode;
  enabled: boolean;
}

export const SalesManagement = () => {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    { 
      id: "1", 
      name: "Cartão de Crédito", 
      type: "credit", 
      icon: <CreditCard className="h-4 w-4" />, 
      enabled: true 
    },
    { 
      id: "2", 
      name: "Cartão de Débito", 
      type: "debit", 
      icon: <CreditCard className="h-4 w-4" />, 
      enabled: true 
    },
    { 
      id: "3", 
      name: "Dinheiro", 
      type: "cash", 
      icon: <Wallet className="h-4 w-4" />, 
      enabled: true 
    },
    { 
      id: "4", 
      name: "Convênio", 
      type: "insurance", 
      icon: <Wallet className="h-4 w-4" />, 
      enabled: true 
    },
    { 
      id: "5", 
      name: "Transferência", 
      type: "transfer", 
      icon: <Wallet className="h-4 w-4" />, 
      enabled: false 
    },
  ]);

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
    
    const method = paymentMethods.find(m => m.id === id);
    
    if (method) {
      toast.info(
        `Método de pagamento ${method.enabled ? 'desativado' : 'ativado'}`,
        { description: `${method.name} foi ${method.enabled ? 'desativado' : 'ativado'} com sucesso` }
      );
    }
  };
  
  const createNewSale = () => {
    toast.info("Nova venda iniciada", {
      description: "Formulário de nova venda aberto"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Vendas</CardTitle>
        <CardDescription>Configure métodos de pagamento e realize vendas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Métodos de Pagamento</h3>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Método
            </Button>
          </div>
          
          <div className="border rounded-md divide-y">
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  {method.icon}
                  <span>{method.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={method.enabled ? "default" : "outline"}>
                    {method.enabled ? "Ativo" : "Inativo"}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => togglePaymentMethod(method.id)}
                  >
                    {method.enabled ? "Desativar" : "Ativar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button onClick={createNewSale} className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Venda
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
