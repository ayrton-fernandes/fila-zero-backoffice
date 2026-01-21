'use client';

import { useRef, useState } from 'react';
import { Icon, Typography } from '@uigovpe/components';
import styles from './UploadDropzone.module.scss';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

export const UploadDropzone = ({
  onFileSelect,
  acceptedFormats = ['.xlsx', '.xls', '.csv'],
  maxSizeMB = 10,
}: UploadDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      return `Formato não aceito. Use: ${acceptedFormats.join(', ')}`;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      return `Arquivo muito grande. Máximo: ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    setError(null);
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className={styles.iconContainer}>
          <Icon icon="upload_file" className={styles.icon} />
        </div>
        <Typography variant="h3" className={styles.title}>
          Arraste sua planilha aqui
        </Typography>
        <Typography variant="p" className={styles.subtitle}>
          ou clique para selecionar um arquivo
        </Typography>
        <Typography variant="small" className={styles.formats}>
          Formatos aceitos: {acceptedFormats.join(', ')}
        </Typography>
      </div>

      {error && (
        <Typography variant="small" className={styles.error}>
          {error}
        </Typography>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
    </div>
  );
};
