import axios from "axios";

// const baseURL="http://localhost:8080/api/";
const baseURL="https://limitless-island-44820.herokuapp.com/api";
// console.log(baseURL)
export default axios.create({
  baseURL: baseURL,
});
