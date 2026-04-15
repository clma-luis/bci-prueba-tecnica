import type { RefreshButtonProps } from "./buttonTypes";

const Button: React.FC<RefreshButtonProps> = (props) => {
  const { onClick, isLoading = false, label = "Actualizar" } = props;
  return (
    <button className="btn-refresh" onClick={onClick} disabled={isLoading}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 4v6h-6"></path>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>

      {isLoading ? "Actualizando..." : label}
    </button>
  );
};

export default Button;
