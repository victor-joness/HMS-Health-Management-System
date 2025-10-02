
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    positive?: boolean;
    label?: string;
  };
  className?: string;
  variant?: "default" | "outline";
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="h-9 w-9 rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      {trend && (
        <CardFooter className="pt-0">
          <span
            className={cn(
              "inline-flex items-center text-xs font-medium",
              trend.positive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.positive ? "+" : "-"}
            {trend.value} {trend.label}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}
