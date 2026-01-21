'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, Button, InputText, Typography } from '@uigovpe/components';
import { PageInfo } from '@/components/layout/pageInfo';
import { getUserById, updateUser } from '@/services/userService';
import { UpdateUserInput, User } from '@/domain/entities/User';

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<UpdateUserInput>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUserById(id);
        setFormData({
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar usuário');
        router.push('/usuarios');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id, router]);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (formData.name && !formData.name.trim()) {
      newErrors.name = 'Nome não pode ser vazio';
    }

    if (formData.email && formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await updateUser(id, formData);
      router.push('/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/usuarios');
  };

  if (fetching) {
    return (
      <div className="px-2 py-3.5">
        <Typography variant="p">Carregando...</Typography>
      </div>
    );
  }

  return (
    <div className="px-2 py-3.5 flex flex-col gap-4">
      <PageInfo title="Editar Usuário" descriptions={['Atualize as informações do usuário']} />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Typography variant="small" className="mb-2 block">
              Nome
            </Typography>
            <InputText
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome"
              className="w-full"
            />
            {errors.name && (
              <Typography variant="small" className="text-red-600 mt-1">
                {errors.name}
              </Typography>
            )}
          </div>

          <div>
            <Typography variant="small" className="mb-2 block">
              E-mail
            </Typography>
            <InputText
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite o e-mail"
              type="email"
              className="w-full"
            />
            {errors.email && (
              <Typography variant="small" className="text-red-600 mt-1">
                {errors.email}
              </Typography>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" onClick={handleCancel} label="Cancelar" severity="secondary" />
            <Button type="submit" label={loading ? 'Salvando...' : 'Salvar'} disabled={loading} />
          </div>
        </form>
      </Card>
    </div>
  );
}
