import { APIClient } from "./axios";

export const fetcher = async (url) => {
  const { data } = await APIClient.get(url, {
    headers: {},
  });
  return data;
};
