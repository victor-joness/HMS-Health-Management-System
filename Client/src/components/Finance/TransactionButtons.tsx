
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function TransactionButtons() {
  const [transactionType, setTransactionType] = useState<string>("income");

  const handleNewTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    toast.success("Transação registrada com sucesso!", {
      description: `${transactionType === "income" ? "Receita" : "Despesa"}: R$ ${data.value}`
    });
  };

  const handleViewTransactions = () => {
    toast.info("Visualizando relatório financeiro", {
      description: "Funcionalidade de visualização de transações acionada"
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Transação</DialogTitle>
            <DialogDescription>
              Adicionar nova transação financeira
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewTransaction}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="transaction-type">Tipo de Transação</Label>
                <Select
                  value={transactionType}
                  onValueChange={setTransactionType}
                >
                  <SelectTrigger id="transaction-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" name="description" placeholder="Descrição da transação" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Valor (R$)</Label>
                <Input id="value" name="value" type="number" placeholder="0.00" step="0.01" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select defaultValue="other">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      <SelectItem value="supplies">Suprimentos</SelectItem>
                      <SelectItem value="equipment">Equipamentos</SelectItem>
                      <SelectItem value="consultation">Consultas</SelectItem>
                      <SelectItem value="medication">Medicamentos</SelectItem>
                      <SelectItem value="exams">Exames</SelectItem>
                      <SelectItem value="salary">Salários</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Registrar Transação</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" onClick={handleViewTransactions}>
        <FileText className="mr-2 h-4 w-4" />
        Relatório Financeiro
      </Button>
    </div>
  );
}
