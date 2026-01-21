import { useState, useCallback, useEffect } from "react";
import { getUsers, deleteUser } from "@/services/userService";
import { User } from "@/domain/entities/User";

export const useUsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError("Não foi possível carregar os usuários");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = useCallback(async (userId: string) => {
        try {
            await deleteUser(userId);
            await fetchUsers();
        } catch (err) {
            console.error("Erro ao deletar usuário:", err);
            throw err;
        }
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        deleteUser: handleDelete,
        refreshList: fetchUsers,
    };
};
