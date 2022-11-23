import { useState, useEffect } from "react";
import { backendApi } from "./axiosBase";

/**
 * Se crea el hook useFetch con los atributos necesarios para poder realizar cualquier
 * tipo de peticion a la API suministada, se retorna la respuesta de la api y las
 * variables de estado de error y isLoading
 */

export default function useFetch({
  api = backendApi,
  method = 'get',
  url,
  data = null,
  config = null,
}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api[method](url, JSON.parse(config), JSON.parse(data))
          .then((res) => {
            setResponse(res.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [api, method, url, data, config]);

  return { response, error, isLoading };
}
