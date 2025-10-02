
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export function AppointmentDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("10:00");
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !doctor || !patient) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    const formattedDate = format(date, "dd/MM/yyyy");
    
    toast.success("Consulta agendada com sucesso!", {
      data: `${patient} com ${doctor} em ${formattedDate} às ${time}`
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Horário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            Agenda uma nova consulta no sistema
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleScheduleAppointment}>
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
              <Label htmlFor="doctor">Médico</Label>
              <Select
                value={doctor}
                onValueChange={setDoctor}
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Selecione o médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Médicos</SelectLabel>
                    <SelectItem value="Dr. Ricardo Souza">Dr. Ricardo Souza - Cardiologia</SelectItem>
                    <SelectItem value="Dra. Ana Pereira">Dra. Ana Pereira - Dermatologia</SelectItem>
                    <SelectItem value="Dr. Fernando Costa">Dr. Fernando Costa - Ortopedia</SelectItem>
                    <SelectItem value="Dra. Mariana Lima">Dra. Mariana Lima - Oftalmologia</SelectItem>
                    <SelectItem value="Dr. Paulo Martins">Dr. Paulo Martins - Neurologia</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Data da Consulta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Horário</Label>
              <Select
                value={time}
                onValueChange={setTime}
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Manhã</SelectLabel>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="08:30">08:30</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="09:30">09:30</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="10:30">10:30</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Tarde</SelectLabel>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="13:30">13:30</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="14:30">14:30</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="15:30">15:30</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="16:30">16:30</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Input id="notes" placeholder="Observações para a consulta" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agendar Consulta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
