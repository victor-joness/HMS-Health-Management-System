
import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X, AlertTriangle, CheckCircle, Info, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertConfig } from "@/components/Alerts/AlertConfig";

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  type: "error" | "warning" | "success" | "info";
  timestamp: Date;
}

interface AlertSystemProps {
  initialAlerts?: AlertItem[];
}

export function AlertSystem({ initialAlerts = [] }: AlertSystemProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  const getAlertIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertClass = (type: AlertItem["type"]) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  // Auto remove alerts after 5 seconds
  useEffect(() => {
    const timers = alerts.map(alert => {
      return setTimeout(() => {
        removeAlert(alert.id);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [alerts]);

  if (alerts.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <AlertConfig />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <div className="flex justify-end gap-2 mb-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearAllAlerts}
          className="bg-white"
        >
          Limpar Todos
        </Button>
        <AlertConfig />
      </div>
      
      {alerts.map(alert => (
        <Alert key={alert.id} className={`${getAlertClass(alert.type)} relative pr-8`}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6 rounded-full p-0"
            onClick={() => removeAlert(alert.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          {getAlertIcon(alert.type)}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

// Helper function to add alerts from anywhere in the app
let alertsInstance: React.Dispatch<React.SetStateAction<AlertItem[]>> | null = null;

export const useAlertSystem = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  
  // Store the setter function to be used globally
  useEffect(() => {
    alertsInstance = setAlerts;
    return () => {
      alertsInstance = null;
    };
  }, []);
  
  return { alerts, setAlerts };
};

export const addAlert = (
  title: string,
  description: string,
  type: AlertItem["type"] = "info"
) => {
  if (alertsInstance) {
    const newAlert: AlertItem = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      type,
      timestamp: new Date(),
    };
    
    alertsInstance(prev => [...prev, newAlert]);
  }
};
