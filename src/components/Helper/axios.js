import axios from "axios";
import strings from "../../components/strings";

const BASE_URL = strings.API_ROUTE;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});  