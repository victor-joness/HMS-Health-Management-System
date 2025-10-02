
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, FileText } from "lucide-react";

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type (PDF only)
      if (selectedFile.type !== "application/pdf") {
        toast.error("Formato inválido", {
          description: "Por favor selecione um arquivo PDF"
        });
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Arquivo muito grande", {
          description: "O tamanho máximo permitido é 10MB"
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast.success("Upload concluído", {
        description: `${file.name} foi enviado com sucesso`
      });
      setFile(null);
      setUploading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="max-w-sm"
              id="pdf-upload"
            />
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading}
            >
              {uploading ? "Enviando..." : "Enviar"}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {file && (
            <div className="flex items-center p-3 border rounded-md bg-muted/20">
              <FileText className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
