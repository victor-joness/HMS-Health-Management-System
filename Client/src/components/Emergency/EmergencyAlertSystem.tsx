import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Ambulance, 
  Bell, 
  BellRing, 
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { addAlert } from "@/components/Alerts/AlertSystem";
import { toast } from "react-toastify";

interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "active" | "in-progress" | "resolved";
  timestamp: Date;
}

export const EmergencyAlertSystem = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: "EM001",
      title: "Ambulância Solicitada",
      description: "Paciente com suspeita de AVC necessitando transporte urgente do setor de triagem.",
      location: "Triagem",
      priority: "critical",
      status: "active",
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: "EM002",
      title: "Queda de Paciente",
      description: "Paciente idoso caiu no corredor do setor de internação. Equipe de enfermagem solicitada.",
      location: "Internação - 2º andar",
      priority: "medium",
      status: "in-progress",
      timestamp: new Date(Date.now() - 25 * 60000)
    },
    {
      id: "EM003",
      title: "Código Azul",
      description: "Paciente em parada cardiorrespiratória no leito 302. Equipe de ressuscitação acionada.",
      location: "Quarto 302",
      priority: "critical",
      status: "in-progress",
      timestamp: new Date(Date.now() - 2 * 60000)
    },
    {
      id: "EM004",
      title: "Requisição de Sangue Urgente",
      description: "Necessidade de 2 unidades de sangue O- para paciente em cirurgia.",
      location: "Centro Cirúrgico",
      priority: "high",
      status: "resolved",
      timestamp: new Date(Date.now() - 45 * 60000)
    }
  ]);
  
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    description: "",
    location: "",
    priority: "medium" as EmergencyAlert["priority"]
  });

  const getPriorityBadge = (priority: EmergencyAlert["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-blue-100 text-blue-700">Baixa</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-700">Média</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-orange-100 text-orange-700">Alta</Badge>;
      case "critical":
        return <Badge variant="outline" className="bg-red-100 text-red-700">Crítica</Badge>;
    }
  };
  
  const getStatusBadge = (status: EmergencyAlert["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-red-100 text-red-700">Ativo</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-amber-100 text-amber-700">Em Andamento</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-700">Resolvido</Badge>;
    }
  };
  
  const getPriorityIcon = (priority: EmergencyAlert["priority"]) => {
    switch (priority) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case "medium":
        return <BellRing className="h-5 w-5 text-amber-600" />;
      case "low":
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };
  
  const formatTimeDifference = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Agora mesmo";
    if (diffInMinutes === 1) return "1 minuto atrás";
    if (diffInMinutes < 60) return `${diffInMinutes} minutos atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 hora atrás";
    if (diffInHours < 24) return `${diffInHours} horas atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 dia atrás";
    return `${diffInDays} dias atrás`;
  };
  
  const handleCreateNewAlert = () => {
    if (!newAlert.title || !newAlert.description || !newAlert.location) {
      toast.error("Campos incompletos", {
        data: "Preencha todos os campos do formulário"
      });
      return;
    }
    
    const createdAlert: EmergencyAlert = {
      id: `EM${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: newAlert.title,
      description: newAlert.description,
      location: newAlert.location,
      priority: newAlert.priority,
      status: "active",
      timestamp: new Date()
    };
    
    setAlerts(prev => [createdAlert, ...prev]);
    
    // Reset form
    setNewAlert({
      title: "",
      description: "",
      location: "",
      priority: "medium"
    });
    
    setShowNewAlertForm(false);
    
    toast.success("Alerta de emergência criado", {
      data: `Alerta "${createdAlert.title}" foi criado com sucesso`
    });
    
    // Also add to global alert system
    addAlert(
      "Nova Emergência",
      `${createdAlert.title} - ${createdAlert.location}`,
      "error"
    );
  };
  
  const updateAlertStatus = (id: string, status: EmergencyAlert["status"]) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status } : alert
      )
    );
    
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      toast.info(`Status atualizado`, {
        data: `Alerta "${alert.title}" agora está ${status === 'active' ? 'Ativo' : status === 'in-progress' ? 'Em Andamento' : 'Resolvido'}`
      });
      
      if (status === 'resolved') {
        addAlert(
          "Emergência Resolvida",
          `${alert.title} - ${alert.location} foi resolvida com sucesso`,
          "success"
        );
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <CardTitle>Sistema de Alertas de Emergência</CardTitle>
          </div>
          <Button 
            onClick={() => setShowNewAlertForm(!showNewAlertForm)}
            variant={showNewAlertForm ? "outline" : "default"}
          >
            {showNewAlertForm ? "Cancelar" : "Novo Alerta"}
          </Button>
        </div>
        <CardDescription>Gerencie e responda a alertas de emergência hospitalares</CardDescription>
      </CardHeader>
      <CardContent>
        {showNewAlertForm && (
          <Card className="mb-6 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Novo Alerta de Emergência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Título</label>
                  <Input
                    value={newAlert.title}
                    onChange={e => setNewAlert({...newAlert, title: e.target.value})}
                    placeholder="Título do alerta"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Descrição</label>
                  <Textarea
                    value={newAlert.description}
                    onChange={e => setNewAlert({...newAlert, description: e.target.value})}
                    placeholder="Descreva a situação de emergência"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Localização</label>
                  <Input
                    value={newAlert.location}
                    onChange={e => setNewAlert({...newAlert, location: e.target.value})}
                    placeholder="Onde está ocorrendo?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Prioridade</label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button 
                      type="button" 
                      variant={newAlert.priority === "low" ? "default" : "outline"}
                      onClick={() => setNewAlert({...newAlert, priority: "low"})}
                      className="justify-center"
                    >
                      Baixa
                    </Button>
                    <Button 
                      type="button" 
                      variant={newAlert.priority === "medium" ? "default" : "outline"}
                      onClick={() => setNewAlert({...newAlert, priority: "medium"})}
                      className="justify-center"
                    >
                      Média
                    </Button>
                    <Button 
                      type="button" 
                      variant={newAlert.priority === "high" ? "default" : "outline"}
                      onClick={() => setNewAlert({...newAlert, priority: "high"})}
                      className="justify-center"
                    >
                      Alta
                    </Button>
                    <Button 
                      type="button" 
                      variant={newAlert.priority === "critical" ? "default" : "outline"}
                      onClick={() => setNewAlert({...newAlert, priority: "critical"})}
                      className="justify-center"
                    >
                      Crítica
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateNewAlert}>
                    Criar Alerta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-muted-foreground">Não há alertas de emergência ativos no momento</p>
            </div>
          ) : (
            alerts
              .sort((a, b) => {
                // First sort by status (active first, then in-progress, then resolved)
                const statusOrder = { active: 0, "in-progress": 1, resolved: 2 };
                if (statusOrder[a.status] !== statusOrder[b.status]) {
                  return statusOrder[a.status] - statusOrder[b.status];
                }
                
                // Then sort by priority (critical first, then high, then medium, then low)
                const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                }
                
                // Finally sort by timestamp (newest first)
                return b.timestamp.getTime() - a.timestamp.getTime();
              })
              .map(alert => (
                <Card 
                  key={alert.id} 
                  className={`${
                    alert.status === 'resolved' 
                      ? 'border-green-200 bg-green-50/40' 
                      : alert.priority === 'critical' 
                        ? 'border-red-200 animate-pulse' 
                        : ''
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getPriorityIcon(alert.priority)}
                        <h3 className="font-medium ml-2">{alert.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(alert.status)}
                        {getPriorityBadge(alert.priority)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    
                    <div className="flex flex-wrap items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div className="flex items-center">
                          <Ambulance className="h-4 w-4 mr-1" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTimeDifference(alert.timestamp)}</span>
                        </div>
                      </div>
                      
                      {alert.status !== 'resolved' && (
                        <div className="flex space-x-2">
                          {alert.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateAlertStatus(alert.id, 'in-progress')}
                            >
                              Atender
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant={alert.status === 'in-progress' ? 'default' : 'outline'}
                            onClick={() => updateAlertStatus(alert.id, 'resolved')}
                          >
                            Resolver
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
