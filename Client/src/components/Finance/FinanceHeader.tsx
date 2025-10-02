
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { toast } from "sonner";
import { addAlert } from "@/components/Alerts/AlertSystem";

export const FinanceHeader = ({ 
  onGenerateReport, 
  onCreateTransaction 
}: { 
  onGenerateReport: () => void; 
  onCreateTransaction: () => void;
}) => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={onGenerateReport}>
        <FileText className="mr-2 h-4 w-4" />
        Relatórios
      </Button>
      <Button onClick={onCreateTransaction}>
        <Plus className="mr-2 h-4 w-4" />
        Nova Transação
      </Button>
    </div>
  );
};
