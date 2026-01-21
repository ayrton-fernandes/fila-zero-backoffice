import { Button, Typography } from "@uigovpe/components";

interface SearchInputProps {
  label?: string;
  supportText?: string;
  className?: string;
  onSearch?: () => void;
  placeholder?: string;
  buttonDisabled?: boolean;
  handleSetSearchValue: (value: string) => void;
  searchValue?: string;
}

export const SearchInput = ({
  label = "Encontrar usuário",
  supportText = "Faça busca por nome do usuário",
  className = "w-full",
  onSearch = () => console.log("Realizando busca..."),
  placeholder,
  buttonDisabled = false,
  handleSetSearchValue = () => {},
  searchValue = "",
}: SearchInputProps) => {
  return (
    <div className={className}>
      <Typography variant="p" className="block mb-1 text-sm font-bold">
        {label}
      </Typography>

      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          className="
            w-full
            bg-background-default
            border border-gray-300
            rounded-lg
            py-2 px-4
            pr-10
            focus:outline-none
            focus:ring-2 focus:ring-blue-400
          "
          onChange={(e) => {
            handleSetSearchValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <Button
          disabled={buttonDisabled}
          type="button"
          onClick={() => {
            onSearch();
          }}
          aria-label={`Buscar ${label.toLowerCase()}`}
          className={`
            border-none
            absolute
            right-1
            top-1/2
            -translate-y-1/2
            flex items-center justify-center
            px-2
            py-0
            bg-surface-primary-default
            rounded-md
            min-h-8
            transition
            ${
              buttonDisabled
                ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                : "cursor-pointer"
            }
          `}
        >
          <i className="fi fi-rr-search text-white flex"></i>
        </Button>
      </div>

      {supportText && (
        <Typography variant="p" className="mt-1 text-xs">
          {supportText}
        </Typography>
      )}
    </div>
  );
};
