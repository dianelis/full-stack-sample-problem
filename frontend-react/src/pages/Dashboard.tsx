import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../hooks/useUser";

import { IrisData } from "../interfaces/iris";

import Plot from "../components/Plot";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [irisData, setIrisData] = useState<IrisData[]>([]);

  const getIrisData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/iris`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();
      console.log(response);

      if (response.status === 401) {
        logout();
      }

      setIrisData(data);
    } catch (error) {
      console.error(error);
    }
  }, [user, logout]);

  useEffect(() => {
    getIrisData();
  }, [getIrisData]);

  return (
    <div className="flex flex-col h-screen">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Plot data={irisData} xAxisKey="sepal.length" />

        <Plot data={irisData} xAxisKey="petal.length" />
      </div>
    </div>
  );
}
