
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, PenTool } from "lucide-react";
import { toast } from "react-toastify";

type ToothCondition = 
  | "healthy" 
  | "decay" 
  | "filled" 
  | "missing" 
  | "crown" 
  | "bridge" 
  | "implant" 
  | "root-canal";

interface ToothData {
  id: number;
  name: string;
  condition: ToothCondition;
  notes?: string;
  treatments?: string[];
}

export const DentalChart = () => {
  // Adult teeth are numbered from 11-48 (FDI World Dental Federation notation)
  const [adultTeeth, setAdultTeeth] = useState<ToothData[]>([
    // Upper right quadrant
    { id: 18, name: "Third molar (wisdom tooth)", condition: "healthy" },
    { id: 17, name: "Second molar", condition: "healthy" },
    { id: 16, name: "First molar", condition: "filled" },
    { id: 15, name: "Second premolar", condition: "healthy" },
    { id: 14, name: "First premolar", condition: "healthy" },
    { id: 13, name: "Canine (cuspid)", condition: "healthy" },
    { id: 12, name: "Lateral incisor", condition: "healthy" },
    { id: 11, name: "Central incisor", condition: "healthy" },
    
    // Upper left quadrant
    { id: 21, name: "Central incisor", condition: "healthy" },
    { id: 22, name: "Lateral incisor", condition: "healthy" },
    { id: 23, name: "Canine (cuspid)", condition: "healthy" },
    { id: 24, name: "First premolar", condition: "healthy" },
    { id: 25, name: "Second premolar", condition: "decay" },
    { id: 26, name: "First molar", condition: "healthy" },
    { id: 27, name: "Second molar", condition: "crown" },
    { id: 28, name: "Third molar (wisdom tooth)", condition: "missing" },
    
    // Lower left quadrant
    { id: 38, name: "Third molar (wisdom tooth)", condition: "missing" },
    { id: 37, name: "Second molar", condition: "healthy" },
    { id: 36, name: "First molar", condition: "root-canal" },
    { id: 35, name: "Second premolar", condition: "healthy" },
    { id: 34, name: "First premolar", condition: "healthy" },
    { id: 33, name: "Canine (cuspid)", condition: "healthy" },
    { id: 32, name: "Lateral incisor", condition: "healthy" },
    { id: 31, name: "Central incisor", condition: "healthy" },
    
    // Lower right quadrant
    { id: 41, name: "Central incisor", condition: "healthy" },
    { id: 42, name: "Lateral incisor", condition: "healthy" },
    { id: 43, name: "Canine (cuspid)", condition: "healthy" },
    { id: 44, name: "First premolar", condition: "implant" },
    { id: 45, name: "Second premolar", condition: "healthy" },
    { id: 46, name: "First molar", condition: "filled" },
    { id: 47, name: "Second molar", condition: "healthy" },
    { id: 48, name: "Third molar (wisdom tooth)", condition: "missing" },
  ]);

  // Children's teeth are lettered A-T (primary dentition)
  const [childrenTeeth, setChildrenTeeth] = useState<ToothData[]>([
    // Upper right quadrant
    { id: 55, name: "Second molar", condition: "healthy" },
    { id: 54, name: "First molar", condition: "healthy" },
    { id: 53, name: "Canine", condition: "healthy" },
    { id: 52, name: "Lateral incisor", condition: "healthy" },
    { id: 51, name: "Central incisor", condition: "healthy" },
    
    // Upper left quadrant
    { id: 61, name: "Central incisor", condition: "healthy" },
    { id: 62, name: "Lateral incisor", condition: "healthy" },
    { id: 63, name: "Canine", condition: "healthy" },
    { id: 64, name: "First molar", condition: "decay" },
    { id: 65, name: "Second molar", condition: "healthy" },
    
    // Lower left quadrant
    { id: 75, name: "Second molar", condition: "healthy" },
    { id: 74, name: "First molar", condition: "healthy" },
    { id: 73, name: "Canine", condition: "healthy" },
    { id: 72, name: "Lateral incisor", condition: "healthy" },
    { id: 71, name: "Central incisor", condition: "healthy" },
    
    // Lower right quadrant
    { id: 81, name: "Central incisor", condition: "healthy" },
    { id: 82, name: "Lateral incisor", condition: "healthy" },
    { id: 83, name: "Canine", condition: "healthy" },
    { id: 84, name: "First molar", condition: "filled" },
    { id: 85, name: "Second molar", condition: "healthy" },
  ]);

  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(null);
  const [activeTab, setActiveTab] = useState<"adult" | "children">("adult");

  const getToothColor = (condition: ToothCondition) => {
    switch (condition) {
      case "healthy": return "bg-green-500";
      case "decay": return "bg-red-500";
      case "filled": return "bg-blue-500";
      case "missing": return "bg-gray-300";
      case "crown": return "bg-yellow-500";
      case "bridge": return "bg-purple-500";
      case "implant": return "bg-cyan-500";
      case "root-canal": return "bg-orange-500";
    }
  };

  const getToothLabel = (condition: ToothCondition) => {
    switch (condition) {
      case "healthy": return "Saudável";
      case "decay": return "Cárie";
      case "filled": return "Restauração";
      case "missing": return "Ausente";
      case "crown": return "Coroa";
      case "bridge": return "Ponte";
      case "implant": return "Implante";
      case "root-canal": return "Tratamento de canal";
    }
  };

  const handleToothClick = (tooth: ToothData) => {
    setSelectedTooth(tooth);
    toast.info(`Dente ${tooth.id} selecionado`, {
      data: `${tooth.name} - ${getToothLabel(tooth.condition)}`
    });
  };

  const updateToothCondition = (condition: ToothCondition) => {
    if (!selectedTooth) return;
    
    if (activeTab === "adult") {
      setAdultTeeth(teeth => 
        teeth.map(tooth => 
          tooth.id === selectedTooth.id 
            ? { ...tooth, condition: condition }
            : tooth
        )
      );
    } else {
      setChildrenTeeth(teeth => 
        teeth.map(tooth => 
          tooth.id === selectedTooth.id 
            ? { ...tooth, condition: condition }
            : tooth
        )
      );
    }
    
    setSelectedTooth(prev => prev ? { ...prev, condition } : null);
    
    toast.success("Condição atualizada", {
      data: `Dente ${selectedTooth.id} atualizado para ${getToothLabel(condition)}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <PenTool className="h-5 w-5 text-blue-500" />
          <CardTitle>Odontograma</CardTitle>
        </div>
        <CardDescription>Visualize e atualize o status dental do paciente</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="adult" onValueChange={(value) => setActiveTab(value as "adult" | "children")}>
          <TabsList className="mb-4">
            <TabsTrigger value="adult">Dentição Permanente</TabsTrigger>
            <TabsTrigger value="children">Dentição Primária</TabsTrigger>
          </TabsList>
          
          <TabsContent value="adult" className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-center mb-8">
                <div className="grid grid-cols-8 gap-2 w-full max-w-lg">
                  {adultTeeth.slice(0, 16).map(tooth => (
                    <div 
                      key={tooth.id} 
                      className={`relative cursor-pointer flex items-center justify-center border rounded-md p-2 ${
                        selectedTooth?.id === tooth.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleToothClick(tooth)}
                    >
                      <span className="text-xs font-medium">{tooth.id}</span>
                      <div 
                        className={`absolute bottom-0 w-full h-1/3 rounded-b-md ${getToothColor(tooth.condition)}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-8 gap-2 w-full max-w-lg">
                  {adultTeeth.slice(16).map(tooth => (
                    <div 
                      key={tooth.id} 
                      className={`relative cursor-pointer flex items-center justify-center border rounded-md p-2 ${
                        selectedTooth?.id === tooth.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleToothClick(tooth)}
                    >
                      <span className="text-xs font-medium">{tooth.id}</span>
                      <div 
                        className={`absolute top-0 w-full h-1/3 rounded-t-md ${getToothColor(tooth.condition)}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {selectedTooth && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dente {selectedTooth.id} - {selectedTooth.name}</CardTitle>
                  <CardDescription>
                    Condição: <Badge fontVariant="outline">{getToothLabel(selectedTooth.condition)}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "healthy" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("healthy")}
                    >
                      Saudável
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "decay" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("decay")}
                    >
                      Cárie
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "filled" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("filled")}
                    >
                      Restauração
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "missing" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("missing")}
                    >
                      Ausente
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "crown" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("crown")}
                    >
                      Coroa
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "bridge" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("bridge")}
                    >
                      Ponte
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "implant" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("implant")}
                    >
                      Implante
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "root-canal" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("root-canal")}
                    >
                      Canal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="children" className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex justify-center mb-8">
                <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
                  {childrenTeeth.slice(0, 10).map(tooth => (
                    <div 
                      key={tooth.id} 
                      className={`relative cursor-pointer flex items-center justify-center border rounded-md p-2 ${
                        selectedTooth?.id === tooth.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleToothClick(tooth)}
                    >
                      <span className="text-xs font-medium">{tooth.id}</span>
                      <div 
                        className={`absolute bottom-0 w-full h-1/3 rounded-b-md ${getToothColor(tooth.condition)}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
                  {childrenTeeth.slice(10).map(tooth => (
                    <div 
                      key={tooth.id} 
                      className={`relative cursor-pointer flex items-center justify-center border rounded-md p-2 ${
                        selectedTooth?.id === tooth.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleToothClick(tooth)}
                    >
                      <span className="text-xs font-medium">{tooth.id}</span>
                      <div 
                        className={`absolute top-0 w-full h-1/3 rounded-t-md ${getToothColor(tooth.condition)}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {selectedTooth && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dente {selectedTooth.id} - {selectedTooth.name}</CardTitle>
                  <CardDescription>
                    Condição: <Badge fontVariant="outline">{getToothLabel(selectedTooth.condition)}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "healthy" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("healthy")}
                    >
                      Saudável
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "decay" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("decay")}
                    >
                      Cárie
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "filled" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("filled")}
                    >
                      Restauração
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTooth.condition === "missing" ? "default" : "outline"} 
                      onClick={() => updateToothCondition("missing")}
                    >
                      Ausente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
