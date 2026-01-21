import { Button, Icon } from "@uigovpe/components";

interface UserActionMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const UserActionMenu = ({ onEdit, onDelete }: UserActionMenuProps) => {
    return (
        <div className="flex gap-2">
            <Button
                icon={<Icon icon="edit" />}
                outlined
                onClick={onEdit}
                tooltip="Editar"
            />
            <Button
                icon={<Icon icon="delete" />}
                outlined
                severity="danger"
                onClick={onDelete}
                tooltip="Excluir"
            />
        </div>
    );
};
