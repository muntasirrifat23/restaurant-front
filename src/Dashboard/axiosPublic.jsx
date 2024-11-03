import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://restaurant-backend-pearl.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;