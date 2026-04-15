import React from "react";
import type { DashboardData } from "../../../types/dashboardTypes";
import { formatCurrency, getValidWeather } from "../../../utils/formatters";

interface WidgetCardProps {
  data: DashboardData;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ data }) => {
  return (
    <article className="widget-card primary-card">
      <div className="card-section">
        <span className="section-label">Mercado Cripto</span>
        <div className="data-highlight bitcoin">
          {data.bitcoinPriceUSD !== null && <span className="currency-symbol">BTC</span>}
          <span className={`amount ${data.bitcoinPriceUSD === null ? "unavailable" : ""}`}>
            {data.bitcoinPriceUSD !== null ? formatCurrency(data.bitcoinPriceUSD) : "N/D"}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card-section">
        <span className="section-label">Condiciones Locales</span>

        <div className="local-data-grid">
          <div className="data-item">
            <span className="data-value">{data.city}</span>
            <span className="data-subtitle">Ciudad</span>
          </div>

          <div className="data-item">
            <span className={`data-value ${data.temperature === null ? "unavailable" : ""}`}>
              {data.temperature !== null ? `${data.temperature}°C` : "N/D"}
            </span>
            <span className="data-subtitle">Temperatura</span>
          </div>

          <div className="data-item">
            <span className="data-value capitalize">{getValidWeather(data.weather)}</span>
            <span className="data-subtitle">Clima</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WidgetCard;
