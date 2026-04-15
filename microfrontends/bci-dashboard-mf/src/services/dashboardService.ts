import type { DashboardResponse } from "./dashboardInterfaces";
import { dashboardPaths } from "./dashboardPaths";

const { GET_DASHBOARD_DATA } = dashboardPaths;

const BASE_URL = import.meta.env.VITE_API_URL;

export const getDashboardDataService = async (value: string): Promise<DashboardResponse> => {
  const response = await fetch(`${BASE_URL}${GET_DASHBOARD_DATA.replace(":city", value)}`);

  if (!response.ok) {
    throw new Error(`Error en el servidor: ${response.status}`);
  }

  const data: DashboardResponse = await response.json();
  return data;
};
