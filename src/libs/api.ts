import axios from "axios";

export const getReviews = async () => {
  const res = await axios.get("http://o-complex.com:1337/reviews");
  return res.data
};

export const getProducts = async (page = 1, pageSize = 20) => {
  return await axios.get(`http://o-complex.com:1337/products?page=${page}&page_size=${pageSize}`);
};

export const postOrder = async (orderData: {
  phone: string;
  cart: { id: number; quantity: number }[];
}) => {
  const response = await axios.post(
    "http://o-complex.com:1337/order",
    orderData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
