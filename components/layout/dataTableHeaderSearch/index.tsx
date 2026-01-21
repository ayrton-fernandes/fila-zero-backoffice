"use client";

import { Icon, Button, IconName, Search, AutoCompleteChangeEvent } from "@uigovpe/components";
import { ReactNode } from "react";

interface DataTableHeaderSearchProps {
  onSearch: (value: unknown) => void;
  onAddClick?: () => void;
  searchValue: string | null;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchSupportText?: string;
  addButtonLabel?: string;
  showAddButton?: boolean;
  addButtonIcon?: IconName;
  className?: string;
  handleSetSearchValue: (value: string) => void;
  rightContent?: ReactNode;
}

export const DataTableHeaderSearch = ({
  onSearch,
  onAddClick,
  searchValue,
  searchLabel = "Buscar",
  searchPlaceholder = "Digite para buscar...",
  searchSupportText = "Faça sua busca",
  addButtonLabel = "Adicionar novo",
  showAddButton = true,
  addButtonIcon = "add",
  className = "",
  handleSetSearchValue,
  rightContent,
}: DataTableHeaderSearchProps) => {
  return (
    <section className={`flex flex-row gap-3 ${className}`}>
      <div className="flex flex-1 flex-col lg:flex-row lg:items-end gap-3">
        <div className="max-w-[280px]">
          <Search
            label={searchLabel}
            supportText={searchSupportText}
            placeholder={searchPlaceholder}
            value={searchValue}
            showAutocomplete={false}
            onChange={(e: AutoCompleteChangeEvent) => handleSetSearchValue(e.value || '')}
            onSearch={onSearch}
          />
        </div>

        {rightContent && (
          <div className="flex flex-col sm:flex-row lg:flex-row lg:items-end gap-3 w-full lg:w-auto">
            {rightContent}
          </div>
        )}
      </div>

      {showAddButton && (
        <div className="flex items-center gap-8 w-full sm:w-auto">
          <Button
            onClick={onAddClick}
            label={addButtonLabel}
            icon={<Icon icon={addButtonIcon} />}
          />
        </div>
      )}
    </section>
  );
};
