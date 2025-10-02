
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { addAlert, AlertItem } from "@/components/Alerts/AlertSystem";
import { Settings, BellRing, Check } from "lucide-react";

interface AlertConfigItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: AlertItem["type"];
  priority: "low" | "medium" | "high" | "critical";
}

export const AlertConfig = () => {
  const [open, setOpen] = useState(false);
  const [alertConfigs, setAlertConfigs] = useState<AlertConfigItem[]>([
    {
      id: "financial",
      name: "Alertas Financeiros",
      description: "Notificações sobre transações e status financeiros",
      enabled: true,
      type: "info",
      priority: "medium"
    },
    {
      id: "patient",
      name: "Status de Pacientes",
      description: "Alertas sobre mudanças no estado dos pacientes",
      enabled: true,
      type: "warning",
      priority: "high"
    },
    {
      id: "emergency",
      name: "Emergências",
      description: "Notificações críticas que exigem atenção imediata",
      enabled: true,
      type: "error",
      priority: "critical"
    },
    {
      id: "appointments",
      name: "Consultas e Agendamentos",
      description: "Lembretes sobre consultas e procedimentos agendados",
      enabled: true,
      type: "info",
      priority: "low"
    },
    {
      id: "inventory",
      name: "Estoque e Medicamentos",
      description: "Alertas sobre níveis de estoque e medicamentos",
      enabled: false,
      type: "warning",
      priority: "medium"
    },
    {
      id: "system",
      name: "Sistema",
      description: "Notificações do sistema e manutenções",
      enabled: true,
      type: "info",
      priority: "low"
    }
  ]);

  const [email, setEmail] = useState("admin@hospitalsystem.com");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);

  const toggleAlertConfig = (id: string) => {
    setAlertConfigs(configs => 
      configs.map(config => 
        config.id === id 
          ? { ...config, enabled: !config.enabled }
          : config
      )
    );
  };

  const saveSettings = () => {
    toast.success("Configurações salvas", {
      data: "As configurações de alertas foram atualizadas com sucesso"
    });
    
    addAlert(
      "Configurações Atualizadas",
      "As configurações de alertas do sistema foram atualizadas",
      "success"
    );
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configurar Alertas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configurações de Alertas</DialogTitle>
          <DialogDescription>
            Configure como e quando você deseja receber alertas do sistema
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="types" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="types">Tipos de Alertas</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="space-y-4">
            <div className="grid gap-4">
              {alertConfigs.map(config => (
                <div key={config.id} className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                  <div>
                    <h3 className="font-medium text-sm">{config.name}</h3>
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                    <div className="flex items-center mt-1">
                      <div className={`h-2 w-2 rounded-full mr-1 ${
                        config.priority === 'critical' ? 'bg-red-500' :
                        config.priority === 'high' ? 'bg-orange-500' :
                        config.priority === 'medium' ? 'bg-amber-500' :
                        'bg-blue-500'
                      }`} />
                      <span className="text-xs text-muted-foreground capitalize">
                        Prioridade {
                          config.priority === 'critical' ? 'Crítica' :
                          config.priority === 'high' ? 'Alta' :
                          config.priority === 'medium' ? 'Média' :
                          'Baixa'
                        }
                      </span>
                    </div>
                  </div>
                  <Switch
                    id={`alert-${config.id}`}
                    checked={config.enabled}
                    onCheckedChange={() => toggleAlertConfig(config.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Escolha como deseja receber os alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound">Som de Notificação</Label>
                    <p className="text-sm text-muted-foreground">
                      Tocar um som quando novos alertas chegarem
                    </p>
                  </div>
                  <Switch
                    id="sound"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="desktop">Notificações Desktop</Label>
                    <p className="text-sm text-muted-foreground">
                      Mostrar alertas no desktop mesmo quando o sistema estiver minimizado
                    </p>
                  </div>
                  <Switch
                    id="desktop"
                    checked={desktopNotifications}
                    onCheckedChange={setDesktopNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>
                  Alertas críticos serão enviados para esses contatos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Apenas alertas de prioridade alta e crítica serão enviados para os contatos acima
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={saveSettings}><Check className="mr-2 h-4 w-4" /> Salvar Configurações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
