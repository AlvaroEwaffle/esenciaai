import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogOut, onLogin } from "../store/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { users } from ".././mocks/data";
import { useNavigateTo } from ".";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { onLogOutUser } from "../store/dashboard/dashboardSlice";

export const useAuthSlice = () => {
  const { loading, errorMessage, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { handleNavigate } = useNavigateTo();

  const firstLog = localStorage.getItem("firstLoggin");
  if (!firstLog) localStorage.setItem("firstLoggin", "0");

  useEffect(() => {}, [loading]);

  const startCheckingUser = (data: string[]) => {
    dispatch(onChecking());

    setTimeout(() => {
      const foundUser = users.find((user) => user.email === data.Email && user.password === data.Password);
      if (foundUser) {
        console.log(foundUser);
        const userObject = {
          id: foundUser.id,
          name: foundUser.name,
          lastName: foundUser.lastName,
        };
        console.log(userObject);

        dispatch(onLogin(userObject));

        localStorage.setItem("userLogged", JSON.stringify(userObject));
      } else {
        dispatch(onLogOut("Invalid Email or Password "));
      }
    }, 3000);
  };

  const startRegisteringUser = (data: string[]): void => {
    dispatch(onChecking());
    setTimeout(() => {
      const foundUser = users.find((user) => user.email === data.email);
      if (foundUser) {
        dispatch(onLogOut("Email already in use"));
      } else {
        toast.success("Successfully registered. Redirecting to login. 👍", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          dispatch(onLogOut());
          handleNavigate("/auth/login");
        }, 3000);
      }
    }, 3000);
  };

  const startLogingOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userTeams");
    dispatch(onLogOut());
    dispatch(onLogOutUser());
    handleNavigate("/auth/login");
  };
  return {
    startCheckingUser,
    loading,
    errorMessage,
    status,
    startRegisteringUser,
    startLogingOut,
    firstLog,
  };
};
