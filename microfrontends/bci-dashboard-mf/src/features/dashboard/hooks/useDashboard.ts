import { useState, useEffect, useCallback } from "react";
import { getDashboardDataService } from "../../../services/dashboardService";
import type { DashboardResponse } from "../../../services/dashboardInterfaces";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getDashboardDataService("Lima");
      setData(result);
      setLastUpdated(new Date());
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    fetchDashboardData,
  };
};
