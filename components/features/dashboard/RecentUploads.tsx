import React from 'react';
import { Card, Typography } from '@uigovpe/components';
import { Upload } from '@/domain/types/dashboard';

interface RecentUploadsProps {
  uploads: Upload[];
}

export function RecentUploads({ uploads }: RecentUploadsProps) {
  return (
    <Card className="p-6">
      <Typography variant="h3" className="text-lg font-semibold text-gray-900 mb-4">
        Últimos Uploads
      </Typography>

      <div className="space-y-3">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="pi pi-file text-blue-600 text-xl" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <Typography variant="small" className="font-semibold text-gray-900">
                {upload.batchNumber}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {upload.date}
              </Typography>
            </div>

            <div className="shrink-0 text-right">
              <Typography variant="small" className="font-medium text-gray-900">
                {upload.registryCount.toLocaleString('pt-BR')} registros
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {upload.userName}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
