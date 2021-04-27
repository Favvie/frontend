import { request } from "graphql-request";

const fetcher = (query: string, variables: any) => {
  return request(`http://kwekapi.com/v1/graphql`, query, variables);
};

export default fetcher;
