import { CallApi } from "./utilits";

export const fetchData = async <T = unknown>(APIURL: string): Promise<T> => {
  try {
    const res: T = await CallApi("get", `${APIURL}`);
  
    return res;
  } catch (error) {
    console.error(`API fetch error (${APIURL}):`, error);
    throw new Error(`Failed to fetch ${APIURL} data`);
  }
};

export const Postresponse = async <T = unknown, R = unknown>(APIURL: string, data: T): Promise<R> => {
  try {
    const res: R = await CallApi("post", `${APIURL}`, data);
    if (!res) {
      throw new Error("Failed to Post data");
    }
    return res;
  } catch (error) {
    console.error(`API Post error (${APIURL}):`, error);
    throw new Error(`Failed to Post ${APIURL} data`);
  }
};

export const PutResponse = async <T = unknown, R = unknown>(APIURL: string, data: T): Promise<R> => {
  try {
    const res: R = await CallApi("put", `${APIURL}`, data);
    if (!res) {
      throw new Error("Failed to update data");
    }
    return res;
  } catch (error) {
    console.error(`API PUT error (${APIURL}):`, error);
    throw new Error(`Failed to update ${APIURL} data`);
  }
};

export const DeleteResponse = async <R = unknown>(APIURL: string): Promise<R> => {
  try {
    const res: R = await CallApi("delete", `${APIURL}`);
    if (!res) {
      throw new Error("Failed to delete data");
    }
    return res;
  } catch (error) {
    console.error(`API DELETE error (${APIURL}):`, error);
    throw new Error(`Failed to delete ${APIURL} data`);
  }
};