
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

import { Heart, TorusIcon, Brain, Eye, Stethoscope, Bed, Baby, Bone, Activity, Ambulance } from "lucide-react";

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  doctors: number;
  patients: number;
  description: string;
  color: string;
}

export const DepartmentList = () => {
  const departments: Department[] = [
    {
      id: "cardiology",
      name: "Cardiologia",
      icon: <Heart className="h-5 w-5" />,
      doctors: 12,
      patients: 145,
      description: "Especializado em diagnóstico e tratamento de doenças do coração e do sistema cardiovascular.",
      color: "text-red-500"
    },
    {
      id: "dentistry",
      name: "Odontologia",
      icon: <TorusIcon className="h-5 w-5" />,
      doctors: 8,
      patients: 210,
      description: "Cuidados com a saúde bucal e tratamentos odontológicos especializados.",
      color: "text-blue-500"
    },
    {
      id: "neurology",
      name: "Neurologia",
      icon: <Brain className="h-5 w-5" />,
      doctors: 6,
      patients: 82,
      description: "Diagnóstico e tratamento de doenças relacionadas ao sistema nervoso.",
      color: "text-purple-500"
    },
    {
      id: "ophthalmology",
      name: "Oftalmologia",
      icon: <Eye className="h-5 w-5" />,
      doctors: 5,
      patients: 129,
      description: "Especializado em diagnóstico e tratamento de doenças dos olhos.",
      color: "text-amber-500"
    },
    {
      id: "internal-medicine",
      name: "Clínica Médica",
      icon: <Stethoscope className="h-5 w-5" />,
      doctors: 14,
      patients: 310,
      description: "Cuidados médicos gerais para adultos, prevenção, diagnóstico e tratamento de doenças.",
      color: "text-green-500"
    },
    {
      id: "emergency",
      name: "Emergência",
      icon: <Ambulance className="h-5 w-5" />,
      doctors: 10,
      patients: 56,
      description: "Atendimento rápido a pacientes com condições médicas agudas e urgentes.",
      color: "text-red-600"
    },
    {
      id: "pediatrics",
      name: "Pediatria",
      icon: <Baby className="h-5 w-5" />,
      doctors: 8,
      patients: 175,
      description: "Cuidados médicos especializados para bebês, crianças e adolescentes.",
      color: "text-blue-400"
    },
    {
      id: "orthopedics",
      name: "Ortopedia",
      icon: <Bone className="h-5 w-5" />,
      doctors: 7,
      patients: 110,
      description: "Tratamento de problemas relacionados ao sistema musculoesquelético.",
      color: "text-cyan-500"
    },
    {
      id: "intensive-care",
      name: "UTI",
      icon: <Activity className="h-5 w-5" />,
      doctors: 9,
      patients: 22,
      description: "Cuidados intensivos para pacientes em estado crítico com monitoramento constante.",
      color: "text-orange-500"
    },
    {
      id: "inpatient",
      name: "Internação",
      icon: <Bed className="h-5 w-5" />,
      doctors: 11,
      patients: 87,
      description: "Cuidados contínuos para pacientes que requerem hospitalização.",
      color: "text-indigo-500"
    }
  ];

  const handleDepartmentClick = (department: Department) => {
    toast.info(`Departamento de ${department.name}`, {
      data: `${department.patients} pacientes e ${department.doctors} médicos`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Departamentos</CardTitle>
        <CardDescription>Visualize todos os departamentos do hospital</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="medical">Médicos</TabsTrigger>
            <TabsTrigger value="support">Suporte</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map(department => (
                <Card key={department.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${department.color.replace('text-', 'bg-').replace('500', '100')}`}>
                        <div className={department.color}>{department.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium">{department.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{department.doctors} médicos</span>
                          <span>•</span>
                          <span>{department.patients} pacientes</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3">{department.description}</p>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDepartmentClick(department)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medical" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.filter(d => !['emergency', 'intensive-care', 'inpatient'].includes(d.id)).map(department => (
                <Card key={department.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${department.color.replace('text-', 'bg-').replace('500', '100')}`}>
                        <div className={department.color}>{department.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium">{department.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{department.doctors} médicos</span>
                          <span>•</span>
                          <span>{department.patients} pacientes</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3">{department.description}</p>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDepartmentClick(department)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.filter(d => ['emergency', 'intensive-care', 'inpatient'].includes(d.id)).map(department => (
                <Card key={department.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${department.color.replace('text-', 'bg-').replace('500', '100')}`}>
                        <div className={department.color}>{department.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium">{department.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{department.doctors} médicos</span>
                          <span>•</span>
                          <span>{department.patients} pacientes</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3">{department.description}</p>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDepartmentClick(department)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
