import axios from "axios";

import { SERVER_URL } from "./constants";

export const fetchPage = async () => {
  return await axios.get(`${SERVER_URL}/getPage`);
};

export const postComment = async (body) => {
  return await axios.post(`${SERVER_URL}/comment`, body);
};
