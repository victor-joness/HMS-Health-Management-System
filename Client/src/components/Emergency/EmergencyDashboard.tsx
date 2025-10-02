
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Ambulance, Bed, AlertTriangle, Users } from "lucide-react";
import { addAlert } from "@/components/Alerts/AlertSystem";
import { toast } from "react-toastify";

interface EmergencyResource {
  id: string;
  name: string;
  total: number;
  available: number;
  inUse: number;
  underMaintenance: number;
  status: "normal" | "warning" | "critical";
}

export const EmergencyDashboard = () => {
  const [resources, setResources] = React.useState<EmergencyResource[]>([
    {
      id: "beds",
      name: "Leitos de Emergência",
      total: 50,
      available: 12,
      inUse: 35,
      underMaintenance: 3,
      status: "warning"
    },
    {
      id: "ambulances",
      name: "Ambulâncias",
      total: 10,
      available: 4,
      inUse: 5,
      underMaintenance: 1,
      status: "normal"
    },
    {
      id: "icu",
      name: "Leitos UTI",
      total: 20,
      available: 2,
      inUse: 18,
      underMaintenance: 0,
      status: "critical"
    },
    {
      id: "staff",
      name: "Equipe de Emergência",
      total: 30,
      available: 8,
      inUse: 22,
      underMaintenance: 0,
      status: "normal"
    },
    {
      id: "staff",
      name: "Equipe de Emergência",
      total: 30,
      available: 8,
      inUse: 22,
      underMaintenance: 0,
      status: "normal"
    }
  ]);

  const getStatusColor = (status: EmergencyResource["status"]) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-700";
      case "warning": return "bg-amber-100 text-amber-700";
      case "critical": return "bg-red-100 text-red-700";
    }
  };
  
  const getStatusIcon = (resource: EmergencyResource) => {
    switch (resource.id) {
      case "beds": return <Bed className="h-6 w-6" />;
      case "ambulances": return <Ambulance className="h-6 w-6" />;
      case "icu": return <AlertTriangle className="h-6 w-6" />;
      case "staff": return <Users className="h-6 w-6" />;
      default: return <Bed className="h-6 w-6" />;
    }
  };
  
  const getAvailabilityPercent = (resource: EmergencyResource) => {
    return (resource.available / resource.total) * 100;
  };
  
  const getProgressColor = (resource: EmergencyResource) => {
    const percent = getAvailabilityPercent(resource);
    if (percent < 10) return "bg-red-600";
    if (percent < 30) return "bg-amber-500";
    return "bg-green-500";
  };
  
  const requestMoreResources = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    
    if (resource) {
      toast.success("Solicitação enviada", {
        data: `Solicitação de mais ${resource.name.toLowerCase()} enviada com sucesso`
      });
      
      // Also add to the alert system
      addAlert(
        "Solicitação de Recursos",
        `Solicitação de mais ${resource.name.toLowerCase()} enviada para aprovação`,
        "info"
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos de Emergência</CardTitle>
        <CardDescription>Monitoramento e gerenciamento de recursos emergenciais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {resources.map(resource => (
            <Card key={resource.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-3 ${resource.status === "critical" ? "bg-red-100" : resource.status === "warning" ? "bg-amber-100" : "bg-green-100"}`}>
                      {getStatusIcon(resource)}
                    </div>
                    <div>
                      <h3 className="font-medium">{resource.name}</h3>
                      <Badge variant="outline" className={getStatusColor(resource.status)}>
                        {resource.status === "critical" ? "Crítico" : resource.status === "warning" ? "Atenção" : "Normal"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Disponível: {resource.available}</span>
                      <span>Total: {resource.total}</span>
                    </div>
                    <Progress 
                      value={getAvailabilityPercent(resource)} 
                      className={getProgressColor(resource)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="border rounded-md p-2 text-center">
                      <div className="font-medium">{resource.inUse}</div>
                      <div className="text-muted-foreground">Em Uso</div>
                    </div>
                    <div className="border rounded-md p-2 text-center">
                      <div className="font-medium">{resource.available}</div>
                      <div className="text-muted-foreground">Disponível</div>
                    </div>
                    <div className="border rounded-md p-2 text-center">
                      <div className="font-medium">{resource.underMaintenance}</div>
                      <div className="text-muted-foreground">Manutenção</div>
                    </div>
                  </div>
                  
                  {resource.status === "critical" || resource.status === "warning" ? (
                    <Button 
                      variant={resource.status === "critical" ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => requestMoreResources(resource.id)}
                    >
                      Solicitar mais {resource.name.toLowerCase()}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
