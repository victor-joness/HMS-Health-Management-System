
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  status: "Internado" | "Alta" | "Em Tratamento" | "Aguardando";
  lastUpdate: string;
  condition: "Estável" | "Crítico" | "Melhorando" | "Em Observação";
}

const patients: Patient[] = [
  {
    id: "P001",
    name: "João Silva",
    age: 45,
    status: "Internado",
    lastUpdate: "Hoje, 10:30",
    condition: "Estável",
  },
  {
    id: "P002",
    name: "Maria Oliveira",
    age: 52,
    status: "Em Tratamento",
    lastUpdate: "Ontem, 15:45",
    condition: "Melhorando",
  },
  {
    id: "P003",
    name: "Pedro Santos",
    age: 67,
    status: "Internado",
    lastUpdate: "Hoje, 08:15",
    condition: "Crítico",
  },
  {
    id: "P004",
    name: "Ana Costa",
    age: 34,
    status: "Aguardando",
    lastUpdate: "Hoje, 11:20",
    condition: "Em Observação",
  },
];

export function RecentPatients() {
  const navigate = useNavigate();
  
  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "Internado":
        return "bg-amber-100 text-amber-700";
      case "Alta":
        return "bg-green-100 text-green-700";
      case "Em Tratamento":
        return "bg-blue-100 text-blue-700";
      case "Aguardando":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getConditionColor = (condition: Patient["condition"]) => {
    switch (condition) {
      case "Estável":
        return "text-green-600";
      case "Crítico":
        return "text-red-600";
      case "Melhorando":
        return "text-blue-600";
      case "Em Observação":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/pacientes/${patientId}`);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pacientes Recentes</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground"
          onClick={() => navigate("/pacientes")}
        >
          Ver todos
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground [&_th]:px-4 [&_th]:py-3 border-b">
                <th>Paciente</th>
                <th>Status</th>
                <th>Condição</th>
                <th>Última Atualização</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {patients.map((patient) => (
                <tr key={patient.id} className="text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {patient.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.age} anos</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getConditionColor(patient.condition)}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {patient.lastUpdate}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPatient(patient.id)}
                      className="flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Prontuário
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
