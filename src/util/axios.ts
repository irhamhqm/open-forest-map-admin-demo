import axios from "axios";
import store from "store2";

export default function axiosAuthInstance() {
  const token = store.get("token");
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error);

      return Promise.reject(error);
    }
  );

  return instance;
}
