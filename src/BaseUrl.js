import axios from "axios";

export default axios.defaults.baseURL = "https://dollarempire.onrender.com";

export const PostUrl = axios.create({
  baseURL: "https://dollarempire.onrender.com/api",
  method: "post",
  headers: {
    "Accept-Language": JSON.parse(window.localStorage.getItem("user_lang")),
  },
});

export const GetUrl = axios.create({
  baseURL: "https://dollarempire.onrender.com/api",
  method: "get",
  headers: {
    "Accept-Language": JSON.parse(window.localStorage.getItem("user_lang")),
  },
});