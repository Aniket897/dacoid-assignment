import axios from "axios";

// const SERVER_URL = "http://localhost:8080";
const SERVER_URL = "https://dacoid-assignment-xf63.onrender.com";

export default axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
