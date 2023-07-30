import ChartComponent from "./Components/ChartComponent";
import { useEffect, useState } from "react";
const API_URL =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";

function App() {
  const [labels, setLabels] = useState(["1"]);
  const [dataObject, setDataObject] = useState(["1"]);
  const [average, setAverage] = useState(0);
  const [partial_average, setPartialAverage] = useState(0);

  const [start_day, setStartDay] = useState(0);
  const [end_day, setEndDay] = useState(0);
  const bringData = async () => {
    const res = await fetch(API_URL);
    const result = await res.json();
    let dataObj = result["Time Series (Daily)"];
    let keys = Object.keys(dataObj);

    setLabels(keys);
    setDataObject(dataObj);
    averagef();
  };

  function averagef() {
    if (!dataObject || !labels) return;
    let count = 0;
    let sum = 0;
    for (let label of labels) {
      count++;
      sum += dataObject[label]["1. open"] * 1;
    }
    sum = sum / count;
    setAverage(sum);
  }

  function partial_averagef() {
    if (!dataObject || !labels) return;
    let count = 0;
    let sum = 0;
    for (let i = start_day; i <= end_day; i++) {
      let label = labels[i];
      count++;
      if (dataObject[label] === undefined) continue;
      sum += dataObject[label]["1. open"] * 1;
    }
    sum = sum / count;
    setPartialAverage(sum);
  }

  useEffect(() => {
    bringData();
  }, []);

  useEffect(() => {
    partial_averagef();
  }, [start_day, end_day]);
  return (
    <div className="App">
      <ChartComponent
        dataObject={dataObject}
        labels={labels}
        average={average}
        partial_average={partial_average}
        start_day={start_day}
        end_day={end_day}
      />
      <label>
        start day
        <input
          value={start_day}
          onChange={(e) => {
            setStartDay(e.target.value);
          }}
          type="range"
          min="0"
          max={labels.length}
        />
      </label>

      <label>
        end day
        <input
          value={end_day}
          onChange={(e) => {
            setEndDay(e.target.value);
          }}
          type="range"
          min="0"
          max={labels.length}
        />
      </label>
    </div>
  );
}

export default App;
