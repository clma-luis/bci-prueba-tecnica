import React from "react";

interface ErrorCardProps {
  error: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  return (
    <article className="error-card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>

      <div className="error-content">
        <h3>Servicio no disponible</h3>
        <p>No pudimos conectar con el backend. Verifica la red o inténtalo más tarde.</p>
        <span className="error-details">Detalle: {error}</span>
      </div>
    </article>
  );
};

export default ErrorCard;