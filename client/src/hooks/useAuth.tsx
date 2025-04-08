import { setUser } from "@/store/slices/auth";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    handleAuth().finally(() => {
      setLoading(false);
    });
  }, []);

  const handleAuth = async () => {
    const { data } = await axios.get("/auth");
    console.log(data);
    dispatch(setUser(data.userData));
  };

  return {
    loading,
  };
};
