import React from "react";
import type { DashboardData } from "../../../types/dashboardTypes";
import { formatTime } from "../../../utils/formatters";


interface StatusCardProps {
  data: DashboardData;
  lastUpdated: Date | null;
}

const StatusCard: React.FC<StatusCardProps> = ({ data, lastUpdated }) => {
  return (
    <aside className="widget-card status-card">
      <h3>Estado del Servicio</h3>

      <ul className="status-list">
        <li>
          <span className="status-label">Ciudad Consultada:</span>
          <span className="status-value">{data.city}</span>
        </li>

        <li>
          <span className="status-label">Última actualización:</span>
          <span className="status-value">
            {lastUpdated ? formatTime(lastUpdated) : "--:--:--"}
          </span>
        </li>

        <li>
          <span className="status-label">Conexión API:</span>
          <span className="status-value badge-success">En línea</span>
        </li>
      </ul>
    </aside>
  );
};

export default StatusCard;