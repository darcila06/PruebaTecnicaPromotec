import axios from "axios";

// Se crea una herramienta axios para poder utilizarla en el use Fetchs
export const backendApi = axios.create({
    baseURL: "https://dummyapi.io/data/v1/",
    headers: {
        'app-id' : '63473330c1927d386ca6a3a5'
    }
});

// Se crea la variable de la url base de la API
const baseURL = "https://dummyapi.io/data/v1/";
export default baseURL