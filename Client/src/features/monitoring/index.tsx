import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, Heart, Activity, Gauge, Bell } from "lucide-react";
import { EmergencyDashboard } from "@/components/Emergency/EmergencyDashboard";
import { EmergencyAlertSystem } from "@/components/Emergency/EmergencyAlertSystem";
import { DepartmentList } from "@/components/Departments/DepartmentList";
import { DentalChart } from "@/components/Departments/DentalChart";
import { addAlert } from "@/components/Alerts/AlertSystem";
import { Main } from "@/components/layout/main";
import { PageHeader } from "@/components/layout/PageHeader";

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState("emergency");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "emergency") {
      addAlert(
        "Monitoramento de Emergência",
        "Visualizando recursos e alertas de emergência",
        "info"
      );
    } 
    else if (value === "departments") {
      addAlert(
        "Departamentos",
        "Visualizando status dos departamentos hospitalares",
        "info"
      );
    }
  };

  return (
    <Main>
      <PageHeader
        title="Monitoramento"
        description="Monitore recursos hospitalares, emergências e departamentos"
      >
        <div className="flex space-x-2">
          <div className="flex items-center p-2 bg-amber-100 text-amber-700 rounded-md">
            <Bell className="h-5 w-5 mr-2" />
            <span className="font-medium">Sistema de Monitoramento Ativo</span>
          </div>
        </div>
      </PageHeader>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="emergency">
            <Gauge className="h-4 w-4 mr-2" />
            Emergências
          </TabsTrigger>
          <TabsTrigger value="departments">
            <Activity className="h-4 w-4 mr-2" />
            Departamentos
          </TabsTrigger>
          <TabsTrigger value="dentistry">
            <Heart className="h-4 w-4 mr-2" />
            Odontologia
          </TabsTrigger>
          <TabsTrigger value="respiratory">
            <Wind className="h-4 w-4 mr-2" />
            Respiratório
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emergency" className="space-y-6">
          <EmergencyDashboard />
          <EmergencyAlertSystem />
        </TabsContent>
        
        <TabsContent value="departments">
          <DepartmentList />
        </TabsContent>
        
        <TabsContent value="dentistry">
          <DentalChart />
        </TabsContent>
        
        <TabsContent value="respiratory">
          <div className="bg-white p-6 rounded-md shadow text-center">
            <Wind className="h-12 w-12 mx-auto text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Monitoramento Respiratório</h2>
            <p className="text-gray-500">
              Módulo em desenvolvimento. Este recurso estará disponível em breve para monitorar 
              condições respiratórias dos pacientes.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Main>
  );
};

export default Monitoring;