
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Activity, Database, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAccessItem {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color: string;
  bgColor: string;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    icon: Calendar,
    title: "Agendamento",
    description: "Criar nova consulta",
    link: "/agendamento",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Pacientes",
    description: "Cadastrar paciente",
    link: "/pacientes",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: FileText,
    title: "Prontuários",
    description: "Acessar prontuários",
    link: "/prontuarios",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Activity,
    title: "Monitoramento",
    description: "Ver status atual",
    link: "/monitoramento",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Database,
    title: "Laboratório",
    description: "Resultados de exames",
    link: "/laboratorio",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Settings,
    title: "Configurações",
    description: "Ajustar preferências",
    link: "/configuracoes",
    color: "text-gray-500",
    bgColor: "bg-gray-50",
  },
];

export function QuickAccess() {
  const navigate = useNavigate();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.title}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-4 hover:bg-background/80"
                onClick={() => navigate(item.link)}
              >
                <div className={cn("p-2 rounded-full mb-2", item.bgColor)}>
                  <Icon className={cn("h-6 w-6", item.color)} />
                </div>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
