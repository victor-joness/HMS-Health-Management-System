
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { dia: "Segunda", consultasRealizadas: 45, consultasAgendadas: 50, cancelamentos: 5 },
  { dia: "Terça", consultasRealizadas: 52, consultasAgendadas: 60, cancelamentos: 8 },
  { dia: "Quarta", consultasRealizadas: 48, consultasAgendadas: 55, cancelamentos: 7 },
  { dia: "Quinta", consultasRealizadas: 60, consultasAgendadas: 65, cancelamentos: 5 },
  { dia: "Sexta", consultasRealizadas: 55, consultasAgendadas: 60, cancelamentos: 5 },
  { dia: "Sábado", consultasRealizadas: 30, consultasAgendadas: 35, cancelamentos: 5 },
  { dia: "Domingo", consultasRealizadas: 15, consultasAgendadas: 20, cancelamentos: 5 },
];

export function AppointmentChart() {
  return (
    <Card className="col-span-full lg:col-span-6">
      <CardHeader>
        <CardTitle>Consultas da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dia"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="consultasRealizadas"
              name="Realizadas"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="consultasAgendadas"
              name="Agendadas"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="cancelamentos"
              name="Cancelamentos"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
