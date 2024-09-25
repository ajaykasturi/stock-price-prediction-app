import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Graph from "./Graph";
import DataTable from "./Table";
import Table from "./Table";
import LineChart from "./LineChart";
import { stocks } from "../stocks";
function PredictComp() {
  const [selectValue, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [dateList, setDataList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectValue);
    //fetch data from twiiter
    const API_SENTIMENT = "http://127.0.0.1:8000/predict";
    const data = [selectValue];
    axios.post(API_SENTIMENT, data).then((res) => {
      console.log(res.data.predicted);
      setPredicted(res.data.predicted);
      setDataList(res.data.predicted.map((item) => item[0]));
      setPriceList(res.data.predicted.map((item) => item[1]));
      setLoading(false);
    });
  };
  return (
    <div className="pt-8">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-3xl">Predict Stock Price</h1>
        <br></br>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Stock Symbol
        </label>
        <div className="flex flex-col gap-5">
          <select
            value={selectValue}
            onChange={handleSelectChange}
            id="stocktickers"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a Ticker</option>
            {stocks.map((stock) => (
              <option value={stock}>{stock}</option>
            ))}
          </select>
          {!isLoading ? (
            <button
              disabled={!selectValue}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Predict Future Stock Price
            </button>
          ) : (
            <Spinner />
          )}
        </div>
      </form>
      {dateList.length != 0 && (
        <div className="flex justify-center w-full gap-10 flex-col items-center pt-8">
          <LineChart data={{ dateList, priceList }} />
          <Table data={predicted} />
        </div>
      )}
    </div>
  );
}

export default PredictComp;
