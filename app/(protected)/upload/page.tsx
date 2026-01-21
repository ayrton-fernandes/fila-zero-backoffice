'use client';

import { useState } from 'react';
import { Card, Typography, Button } from '@uigovpe/components';
import { PageInfo } from '@/components/layout/pageInfo';
import { UploadDropzone } from '@/components/features/upload/UploadDropzone';
import { UploadHistoryTable } from '@/components/features/upload/UploadHistoryTable';
import { InfoCard } from '@/components/features/upload/InfoCard';
import { useUploadsList } from '@/hooks/features/upload/useUploadsList';
import { useToast } from '@/hooks/common/useToast';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [batchName, setBatchName] = useState('');
  const { uploads, loading, error, createUpload, refreshList } = useUploadsList();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Auto-generate batch name based on uploads count
    setBatchName(`Lote ${(uploads.length + 1).toString().padStart(3, '0')}`);
  };

  const handleUpload = async () => {
    if (!selectedFile || !batchName) {
      toast({ 
        severity: 'error', 
        summary: 'Erro', 
        detail: 'Por favor, selecione um arquivo e defina o nome do lote' 
      });
      return;
    }

    try {
      await createUpload({
        batchName,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadedBy: 'Usuário Atual', // TODO: Get from auth context
      });

      toast({ 
        severity: 'success', 
        summary: 'Sucesso', 
        detail: 'Upload realizado com sucesso!' 
      });
      setSelectedFile(null);
      setBatchName('');
      await refreshList();
    } catch {
      toast({ 
        severity: 'error', 
        summary: 'Erro', 
        detail: 'Erro ao realizar upload' 
      });
    }
  };

  return (
    <div className="px-2 py-3.5 flex flex-col gap-4">
      <PageInfo
        title="Upload de Planilha"
        descriptions={['Importe sua planilha de pacientes para processamento']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <div className="p-4">
              <Typography variant="h2" className="mb-2">
                Anexar Planilha
              </Typography>
              <Typography variant="p" className="text-gray-600 mb-4">
                Arraste um arquivo ou clique para selecionar
              </Typography>

              <UploadDropzone onFileSelect={handleFileSelect} />

              {selectedFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="span" className="font-semibold block mb-1">
                        Arquivo selecionado:
                      </Typography>
                      <Typography variant="p" className="text-gray-700">
                        {selectedFile.name} (
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </Typography>
                    </div>
                    <Button
                      label="Enviar"
                      onClick={handleUpload}
                      icon="upload"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Info Cards */}
        <div className="flex flex-col gap-4">
          <InfoCard
            icon="warning"
            title="Limite de registros"
            items={[
              'O arquivo deve conter no máximo 2.000 registros',
              'Uploads com mais registros serão bloqueados',
            ]}
            variant="warning"
          />

          <InfoCard
            icon="info"
            title="Layout Esperado"
            items={[
              'Nome Completo',
              'CPF',
              'Telefone',
              'Data de Nascimento',
              'Procedimento',
              'Data Agendamento',
              'Nº Solicitação CMCE',
            ]}
            variant="info"
          />
        </div>
      </div>

      {/* Upload History */}
      <Card>
        <div className="p-4">
          <Typography variant="h2" className="mb-4">
            Histórico de Uploads
          </Typography>
          <Typography variant="p" className="text-gray-600 mb-4">
            Últimos uploads realizados no sistema
          </Typography>

          <UploadHistoryTable uploads={uploads} loading={loading} error={error} />
        </div>
      </Card>
    </div>
  );
}
