"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/hooks/features/users/useUsersList";
import { Button, Card, InputText, Typography } from "@uigovpe/components";
import { useToast } from "@/hooks/common/useToast";

interface UserFormData {
    name: string;
    email: string;
}

export default function CadastrarUsuarioPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>();
    const { createUser, loading } = useCreateUser();
    const { toast } = useToast();

    const onSubmit = async (data: UserFormData) => {
        try {
            await createUser({
                variables: {
                    name: data.name,
                    email: data.email,
                },
            });
            toast({
                severity: "success",
                summary: "Sucesso",
                detail: "Usuário cadastrado com sucesso!",
            });
            router.push("/usuarios");
        } catch (error) {
            console.error(error);
            toast({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao cadastrar usuário.",
            });
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <Card title="Cadastrar Usuário">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <Typography variant="label">Nome</Typography>
                        <InputText
                            {...register("name", { required: "Nome é obrigatório" })}
                            placeholder="Nome completo"
                            className="w-full"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div>
                        <Typography variant="label">Email</Typography>
                        <InputText
                            {...register("email", { required: "Email é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                            placeholder="email@exemplo.com"
                            className="w-full"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            label="Cancelar"
                            outlined
                            onClick={() => router.back()}
                            type="button"
                        />
                        <Button
                            label="Salvar"
                            loading={loading}
                            type="submit"
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
}
