import { Table, Column } from "@uigovpe/components";
import { UserActionMenu } from "./UserActionMenu";

interface User {
    id: string;
    name: string;
    email: string;
    created_at?: string;
}

interface UsersTableProps {
    users: User[];
    loading: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const headerCellStyle = {
    headerCell: {
        className: "font-bold text-sm",
    },
};

export const UsersTable = ({ users, loading, onEdit, onDelete }: UsersTableProps) => {
    
    // Formata dados para incluir o componente de ação
    const formattedUsers = users.map(user => ({
        ...user,
        action: (
            <UserActionMenu
                onEdit={() => onEdit && onEdit(user.id)}
                onDelete={() => onDelete && onDelete(user.id)}
            />
        ),
    }));

    return (
        <Table
            value={formattedUsers}
            loading={loading}
            emptyMessage="Nenhum usuário encontrado."
            tableStyle={{ width: "100%" }}
        >
            <Column field="name" header="Nome" pt={headerCellStyle} />
            <Column field="email" header="Email" pt={headerCellStyle} />
            <Column field="created_at" header="Criado em" pt={headerCellStyle} />
            <Column field="action" header="Ações" pt={headerCellStyle} />
        </Table>
    );
};