import {backendServer} from "../theme";
import axios from "axios";

export const sethomeData = async () => {
    const res = await axios.get(backendServer.homeApi);
    const data = res.data;
    const categories = JSON.parse(data.categories);
    return { categories, popular_products: data.popular_products, new_products: data.new_products };
};