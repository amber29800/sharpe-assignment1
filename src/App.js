import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    const data = await fetch(
      "https://api.llama.fi/summary/fees/lyra?dataType=dailyFees"
    );
    const json = await data.json();
    const dataInJson = getDataInJSON(json.totalDataChart);
    setChartData(dataInJson);
  };

  const getDataInJSON = (dataInArray) => {
    const convertedData = [];

    for (const innerArray of dataInArray) {
      const timestamp = new Date(innerArray[0] * 1000); // Convert to milliseconds
      const month = timestamp.toLocaleString("default", { month: "long" });
      const day = timestamp.getDate();
      const year = timestamp.getFullYear();
      const jsonObject = {
        date: `${month} ${day}, ${year}`,
        value: innerArray[1],
      };
      convertedData.push(jsonObject);
    }
    const mainJSON = {
      totalDataChart: convertedData,
    };
    return mainJSON.totalDataChart;
  };

  console.log(chartData);

  return (
    <div className="App">
        <AreaChart
          width={1450}
          height={720}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
    </div>
  );
}

export default App;
