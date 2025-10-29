import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://partyrock.as/u/seon1/d4UAFgFbx/STDev", // 변경
  timeout: 1000,
});
