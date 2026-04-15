import Button from "../../../shared/ui/button/Button";


interface HeaderProps {
  onRefresh: () => void | Promise<void>;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading }) => {
  return (
    <header className="main-header">
      <h1>Resumen Financiero y Climático</h1>

      <Button label="Actualizar" onClick={onRefresh} isLoading={isLoading} />
    </header>
  );
};

export default Header;
