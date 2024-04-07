import { set } from "mongoose";
import React, { useState } from "react";
import { fetchTweets } from "../api-client";
import axios from "axios";
import Pie from "./Pie";
import Spinner from "./Spinner";
function SelectForm() {
  const [selectValue, setValue] = useState("");
  const [polarity, setPolarity] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [isLoading, setLoading] = useState(false);
  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };
  let recommand = "";
  let indicator = "";
  let option = "";
  if (
    polarity.positive > polarity.negative &&
    polarity.positive > polarity.neutral
  ) {
    recommand = "positive";
    indicator = "rise";
    option = "Buy";
  } else if (
    polarity.negative > polarity.positive &&
    polarity.negative > polarity.neutral
  ) {
    recommand = "negative";
    indicator = "fall";
    option = "No Buy";
  } else {
    recommand = "neutral";
    indicator = "rise/fall";
    option = "Can't Say";
  }
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectValue);
    //fetch data from twiiter
    fetchTweets(selectValue).then((res) => {
      console.log(res);
      const API_SENTIMENT = "http://127.0.0.1:8001/sentiment";
      axios.post(API_SENTIMENT, res).then((res) => {
        setPolarity({
          positive: res.data?.positive,
          negative: res.data?.negative,
          neutral: res.data?.neutral,
        });
        setLoading(false);
      });
    });
    //post the data to sentimental analysis endpoint
  };

  return (
    <>
      <div className="pt-8">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl">Sentiment Analysis</h1>
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
              <option value="">Choose a country</option>
              <option value="AAPL stock">AAPL</option>
              <option value="GOOG stock">GOOG</option>
              <option value="INFY stock">INFY</option>
            </select>
            {!isLoading ? (
              <button
                disabled={!selectValue}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Get Sentimental Analysis
              </button>
            ) : (
              <Spinner />
            )}
          </div>
        </form>
        <div className="flex justify-center flex-col items-center pt-8">
          {(polarity.negative !== 0 ||
            polarity.positive !== 0 ||
            polarity.neutral !== 0) && (
            <>
              <Pie
                positive={polarity.positive}
                negative={polarity.negative}
                neutral={polarity.neutral}
              />
              <br />
              <button
                type="button"
                class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Overall {recommand}
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                According to Sentimental Analysis of Tweets, a{" "}
                <strong>{indicator}</strong> in <strong>{selectValue}</strong>{" "}
                stock is expected - <strong>{option}</strong>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SelectForm;
