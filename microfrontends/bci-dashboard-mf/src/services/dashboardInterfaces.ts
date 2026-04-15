//===========================================================
//====================GET_DASHBOARD_DATA=====================
//===========================================================

//========================OUTPUT=============================

export interface DashboardResponse {
  city: string;
  temperature: number | null;
  weather: string;
  bitcoinPriceUSD: number | null;
}
