import { Button, Icon, Menu, MenuRef } from "@uigovpe/components";
import { useRef } from "react";

interface UserActionMenuProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

export const UserActionMenu = ({ onEdit, onDelete }: UserActionMenuProps) => {
    const menuRef = useRef<MenuRef>(null);

    const handleActionClick = (event: React.MouseEvent) => {
        menuRef?.current?.toggle(event);
    };

    const menuActions = [
        {
            label: "Editar",
            icon: <Icon icon="edit" />,
            command: () => {
                onEdit?.();
            },
        },
        {
            label: "Excluir",
            icon: <Icon icon="delete" />,
            command: () => {
                onDelete?.();
            },
        },
    ];

    return (
        <>
            <Button
                icon={<Icon icon="more_vert" />}
                plain
                rounded
                onClick={handleActionClick}
            />
            <Menu model={menuActions} popup ref={menuRef} popupAlignment="right" />
        </>
    );
};
