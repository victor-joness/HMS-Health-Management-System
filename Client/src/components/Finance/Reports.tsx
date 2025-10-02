
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, Download, ChartBar, ChartPie, ChartLine } from "lucide-react";

type ReportType = "revenue" | "expenses" | "balance" | "cashflow" | "tax";
type ReportPeriod = "month" | "quarter" | "year" | "custom";
type ReportFormat = "pdf" | "excel" | "csv";

export const FinancialReports = () => {
  const [reportType, setReportType] = useState<ReportType>("revenue");
  const [period, setPeriod] = useState<ReportPeriod>("month");
  const [format, setFormat] = useState<ReportFormat>("pdf");
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    
    // Simulate report generation
    setTimeout(() => {
      toast.success("Relatório gerado", {
        description: `O relatório foi gerado com sucesso no formato ${format.toUpperCase()}`
      });
      setLoading(false);
    }, 1500);
  };

  const getReportIcon = () => {
    switch (reportType) {
      case "revenue":
        return <ChartLine className="h-5 w-5 text-green-500" />;
      case "expenses":
        return <ChartBar className="h-5 w-5 text-red-500" />;
      case "balance":
        return <ChartPie className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Financeiros</CardTitle>
        <CardDescription>Gere relatórios detalhados em diferentes formatos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Receitas</SelectItem>
                  <SelectItem value="expenses">Despesas</SelectItem>
                  <SelectItem value="balance">Balanço</SelectItem>
                  <SelectItem value="cashflow">Fluxo de Caixa</SelectItem>
                  <SelectItem value="tax">Impostos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={period} onValueChange={(value) => setPeriod(value as ReportPeriod)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mensal</SelectItem>
                  <SelectItem value="quarter">Trimestral</SelectItem>
                  <SelectItem value="year">Anual</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={format} onValueChange={(value) => setFormat(value as ReportFormat)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleGenerateReport} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Gerando..." : "Gerar Relatório"}
            {loading ? null : (
              <>
                {getReportIcon()}
                <Download className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-8 border-t pt-4">
          <h3 className="font-medium mb-3">Relatórios Recentes</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/20">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                <span>Relatório de Receitas - Maio 2023</span>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </li>
            <li className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/20">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-red-500" />
                <span>Relatório de Despesas - Maio 2023</span>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </li>
            <li className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/20">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-green-500" />
                <span>Balanço Financeiro - Q1 2023</span>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
