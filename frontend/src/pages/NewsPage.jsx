import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import TweetEmbed from "../components/Tweet";
function NewsPage() {
  //   const { data, isLoading, isError, isSuccess } = useQuery(
  //     "data2",
  //     apiClient.fetchNews
  //   );

  //   if (isLoading)
  //     return (
  //       <div className="flex justify-center items-center h-full text-4xl font-bold ">
  //         Loading...
  //       </div>
  //     );
  //   if (isError)
  //     return (
  //       <div className="flex justify-center items-center h-full text-4xl font-bold ">
  //         Error Fetching Data
  //       </div>
  //     );
  const data1 = [
    "1786979262563561941",
    "1786951953018425427",
    "1786919740696576426",
    "1786916982736011468",
    "1786903898994749909",
    "1786889808230371381",
    "1786870163994038628",
    "1786859921864061176",
    "1786835035225567355",
    "1786828640447025308",
    "1786826432980590632",
    "1786806854066057289",
    "1786797876019884308",
    "1786778435009777748",
    "1786776827341541752",
    "1786773301437604045",
    "1786765444147273916",
    "1786760097860853840",
    "1786756025938284705",
    "1786745533542834391",
  ];
  const data2 = [
    "1786983504149954585",
    "1786978560135045192",
    "1786977466126401953",
    "1786977106468966550",
    "1786969065929470443",
    "1786961516656554325",
    "1786953971690533201",
    "1786946419074478230",
    "1786825621437370524",
    "1786810521058172930",
    "1786795422381637676",
    "1786780323239621088",
    "1786765224416043270",
    "1786750124099555772",
    "1786735026471841849",
    "1786708099409006805",
    "1786705508302287122",
    "1786705361665179979",
    "1786699014173266311",
    "1786698532394586138",
  ];
  const data = [];
  for (let i = 0; i < data1.length; i++) {
    data.push(data1[i], data2[i]);
  }
  return (
    <div className="z-0 flex flex-col justify-center items-center light">
      {data.map((tweetId) => (
        <TweetEmbed id={tweetId} key={tweetId} />
      ))}
    </div>
  );
}

export default NewsPage;
