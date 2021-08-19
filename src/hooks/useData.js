import { useState, useEffect } from "react";

const getData = async (page) => {
  const endPoint = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const response = await fetch(endPoint);
  return response.json();
};

export const useData = (page = 1) => {
  let [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setResult(null);
        const data = await getData(page);
        setResult(data);
      } catch (err) {
        setResult({
          error: "Some error occurred, please try again."
        });
      }
    })();
  }, [page]);

  return result;
};
