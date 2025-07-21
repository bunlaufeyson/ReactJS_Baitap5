import { useState, useEffect, useMemo, useCallback } from "react";
import Child from "./child";
import Child2 from "./child2";
import CustomHook from "./custom-hooks";

export default function Hooks() {
  const [number, setNumber] = useState(0);
  const [keyword, setKeyword] = useState("");

  //   const fetchData = () => {
  //     console.log("Data");
  //   };

  //   fetchData();

  useEffect(() => {
    // useEffect chạy 1 lần duy nhất - vì array rỗng
    // call api
    console.log("Response Data");
  }, []);

  useEffect(() => {
    console.log(
      `useEffect - update - call api search - domain/api/search?key=${keyword}`
    );
  }, [keyword]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Hello Cybersoft");
    }, 1000);

    return () => {
      // destroy
      clearInterval(interval);
    };
  }, []);

  const numberCountUp = () => {
    let i = 0;

    while (i < 1000) {
      i++;
    }

    console.log(i);

    return i;
  };

  const numberCountUpMemo = useMemo(() => numberCountUp(), []);

  const renderNoti = () => {
    return `Ban da like 0 lan`;
  };

  const renderNotiCallback = useCallback(renderNoti, []);

  return (
    <div>
      <input
        placeholder="search abc..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <h1 className="text-3xl">Hooks</h1>
      <p>Number: {number}</p>
      <button
        onClick={() => setNumber(number + 1)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Increament
      </button>

      <p>Number Up: {numberCountUpMemo}</p>
      <hr />
      <Child number={number} />
      <hr />
      <Child2 renderNoti={renderNotiCallback} />
      <hr />
      <CustomHook />
    </div>
  );
}
