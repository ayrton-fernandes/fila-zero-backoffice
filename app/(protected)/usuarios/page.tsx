'use client';

import { useRouter } from 'next/navigation';
import { Button, Card } from '@uigovpe/components';
import { PageInfo } from '@/components/layout/pageInfo';
import { UsersTable } from '@/components/features/users/UsersTable';
import { useUsersList } from '@/hooks/features/user/useUsersList';

export default function UsuariosPage() {
  const router = useRouter();
  const { users, loading, error, deleteUser: handleDelete } = useUsersList();

  const handleAddUser = () => {
    router.push('/usuarios/cadastrar');
  };

  return (
    <div className="px-2 py-3.5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <PageInfo
          title="Usuários"
          descriptions={['Gerenciamento de usuários do sistema']}
        />
        <Button onClick={handleAddUser} label="Adicionar Usuário" />
      </div>

      <Card>
        <UsersTable users={users} loading={loading} onDelete={handleDelete} error={error} />
      </Card>
    </div>
  );
}
