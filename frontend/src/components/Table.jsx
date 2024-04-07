import React from "react";

function Table({ data }) {
  return (
    <div className="">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Prediceted Price
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="bg-blue-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{index}</td>
                <td className="px-6 py-4">{item[0]}</td>
                <td className="px-6 py-4">{item[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
