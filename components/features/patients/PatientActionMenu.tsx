'use client';

import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from '@uigovpe/components';
import { MenuItem } from 'primereact/menuitem';

interface PatientActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onReschedule: () => void;
  onExclude: () => void;
}

export function PatientActionMenu({
  onView,
  onEdit,
  onReschedule,
  onExclude,
}: PatientActionMenuProps) {
  const menu = useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: 'Visualizar',
      icon: 'pi pi-eye',
      command: onView,
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: onEdit,
    },
    {
      label: 'Remarcar',
      icon: 'pi pi-calendar',
      command: onReschedule,
    },
    {
      separator: true,
    },
    {
      label: 'Indicar Exclusão',
      icon: 'pi pi-user-minus',
      command: onExclude,
      className: 'text-red-500',
    },
  ];

  return (
    <>
      <Button
        icon="pi pi-ellipsis-v"
        onClick={(e) => menu.current?.toggle(e)}
        text
        size="small"
      />
      <Menu model={items} popup ref={menu} />
    </>
  );
}
