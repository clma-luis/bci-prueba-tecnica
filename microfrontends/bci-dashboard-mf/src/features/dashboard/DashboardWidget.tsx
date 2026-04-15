import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WidgetCard from "./components/WidgetCard";
import StatusCard from "./components/StatusCard";
import ErrorCard from "./components/ErrorCard";
import Skeleton from "./components/Skeleton";
import { useDashboard } from "./hooks/useDashboard";
import "./DashboardWidget.css";

const DashboardWidget = () => {
  const { data, isLoading, error, lastUpdated, fetchDashboardData } = useDashboard();

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <Header onRefresh={fetchDashboardData} isLoading={isLoading} />

        {isLoading && !data && <Skeleton />}
        {!isLoading && error && <ErrorCard error={error} />}

        {!isLoading && !error && data && (
          <div className="content-grid">
            <WidgetCard data={data} />
            <StatusCard data={data} lastUpdated={lastUpdated} />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardWidget;
