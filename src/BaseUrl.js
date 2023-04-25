import axios from "axios";

export default axios.defaults.baseURL = "https://dollarempire.onrender.com/api";

export const PostUrl = axios.create({
  baseURL: "https://dollarempire.onrender.com/api",
  method: "post",
  //   headers: {
  //     Authorization: token,
  //   },
});

export const GetUrl = axios.create({
  baseURL: "https://dollarempire.onrender.com/api",
  method: "get",
});
