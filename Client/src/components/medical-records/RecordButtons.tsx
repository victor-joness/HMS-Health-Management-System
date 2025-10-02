import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "react-toastify";

export function RecordButtons() {
  const [patient, setPatient] = useState("");
  
  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patient) {
      toast.error("Por favor, selecione um paciente");
      return;
    }
    
    toast.success("Prontuário criado com sucesso!", {
      data: `Prontuário para ${patient} criado no sistema`
    });
  };
  
  const handleViewRecord = () => {
    toast.info("Visualizando prontuário", {
        data: "Funcionalidade de visualização de prontuário acionada"
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Criar Prontuário</DialogTitle>
            <DialogDescription>
              Adicionar um novo prontuário eletrônico
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateRecord}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient">Paciente</Label>
                <Select
                  value={patient}
                  onValueChange={setPatient}
                >
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pacientes</SelectLabel>
                      <SelectItem value="João Silva">João Silva</SelectItem>
                      <SelectItem value="Maria Oliveira">Maria Oliveira</SelectItem>
                      <SelectItem value="Pedro Santos">Pedro Santos</SelectItem>
                      <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                      <SelectItem value="Carlos Pereira">Carlos Pereira</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Departamento</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departamentos</SelectLabel>
                      <SelectItem value="cardiology">Cardiologia</SelectItem>
                      <SelectItem value="neurology">Neurologia</SelectItem>
                      <SelectItem value="orthopedics">Ortopedia</SelectItem>
                      <SelectItem value="pediatrics">Pediatria</SelectItem>
                      <SelectItem value="general">Clínica Geral</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="symptoms">Sintomas</Label>
                <Textarea id="symptoms" placeholder="Descreva os sintomas do paciente" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diagnosis">Diagnóstico</Label>
                <Textarea id="diagnosis" placeholder="Diagnóstico preliminar" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="treatment">Tratamento Recomendado</Label>
                <Textarea id="treatment" placeholder="Descreva o tratamento recomendado" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea id="notes" placeholder="Observações adicionais importantes" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Criar Prontuário</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" onClick={handleViewRecord}>
        <FileText className="mr-2 h-4 w-4" />
        Ver Prontuário
      </Button>
    </div>
  );
}