
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    departamento: "Cardiologia",
    ocupados: 15,
    disponiveis: 5,
    reservados: 2,
  },
  {
    departamento: "Ortopedia",
    ocupados: 10,
    disponiveis: 8,
    reservados: 3,
  },
  {
    departamento: "Pediatria",
    ocupados: 12,
    disponiveis: 10,
    reservados: 1,
  },
  {
    departamento: "Neurologia",
    ocupados: 8,
    disponiveis: 4,
    reservados: 2,
  },
  {
    departamento: "Oncologia",
    ocupados: 14,
    disponiveis: 6,
    reservados: 4,
  },
  {
    departamento: "UTI",
    ocupados: 18,
    disponiveis: 2,
    reservados: 0,
  },
];

export function OccupancyChart() {
  return (
    <Card className="col-span-full lg:col-span-6">
      <CardHeader>
        <CardTitle>Ocupação de Leitos por Departamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
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
              dataKey="departamento"
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
            <Bar
              dataKey="ocupados"
              name="Ocupados"
              fill="hsl(var(--medical-500))"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="disponiveis"
              name="Disponíveis"
              fill="hsl(var(--hospital-400))"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="reservados"
              name="Reservados"
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
