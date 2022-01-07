import axios from "axios";

export const fetchData = async (url) => {
  try {
    let data = await axios.get(url).then((res) => {
      return res.data;
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
