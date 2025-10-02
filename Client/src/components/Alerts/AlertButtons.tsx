
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellPlus, AlertTriangle } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export function AlertButtons() {
  const [alertType, setAlertType] = useState<string>("patient");
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const handleViewAlerts = () => {
    toast.info("Visualizando alertas do sistema", {
      data: "Funcionalidade de visualização de alertas acionada"
    });
  };

  const handleConfigureAlert = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Alerta configurado com sucesso!", {
      data: `Tipo: ${alertType}, Urgente: ${isUrgent ? "Sim" : "Não"}`
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={handleViewAlerts}>
        <Bell className="mr-2 h-4 w-4" />
        Alertas
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <BellPlus className="mr-2 h-4 w-4" />
            Configurar Alertas
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configurar Alertas</DialogTitle>
            <DialogDescription>
              Configure os alertas do sistema hospitalar
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConfigureAlert}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alert-type">Tipo de Alerta</Label>
                <Select 
                  value={alertType}
                  onValueChange={setAlertType}
                >
                  <SelectTrigger id="alert-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      <SelectItem value="patient">Paciente</SelectItem>
                      <SelectItem value="medication">Medicamento</SelectItem>
                      <SelectItem value="appointment">Agendamento</SelectItem>
                      <SelectItem value="lab">Laboratório</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descrição do alerta" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="urgent-mode" 
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                />
                <Label htmlFor="urgent-mode">Alerta Urgente</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar Configurações</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
