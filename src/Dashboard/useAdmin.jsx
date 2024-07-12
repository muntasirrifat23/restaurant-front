import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Component/Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
      if (!user?.email) {
        return false;
      }
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      return res.data?.admin;
    }
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
