import { User } from '@/domain/entities/User';
import { Column, Table } from '@uigovpe/components';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/common/loading/loading';
import { UserActionMenu } from './UserActionMenu';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onDelete: (id: string) => void;
  error?: string | null;
}

export const UsersTable = ({ users, loading, onDelete, error }: UsersTableProps) => {
  const router = useRouter();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/usuarios/${id}/editar`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <Table value={users} emptyMessage="Nenhum usuário encontrado">
      <Column field="name" header="Nome" sortable />
      <Column field="email" header="E-mail" sortable />
      <Column
        field="created_at"
        header="Data de Cadastro"
        body={(rowData: User) => formatDate(rowData.created_at)}
        sortable
      />
      <Column
        header="Ações"
        body={(rowData: User) => (
          <UserActionMenu
            onEdit={() => handleEdit(rowData.id)}
            onDelete={() => onDelete(rowData.id)}
          />
        )}
      />
    </Table>
  );
};
