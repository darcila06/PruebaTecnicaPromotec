import axios from "axios";

export const backendApi = axios.create({
    baseURL: "https://dummyapi.io/data/v1/",
    headers: {
        'app-id' : '63473330c1927d386ca6a3a5'
    }
});

const baseURL = "https://dummyapi.io/data/v1/";
export default baseURL