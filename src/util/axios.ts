import axios from "axios";
import store from "store2";

export default function axiosAuthInstance() {
  const token = store.get("token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
