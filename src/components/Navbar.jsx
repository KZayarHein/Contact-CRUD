import Cookies from "js-cookie";
import { useLogoutMutation } from "../redux/services/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const logoutHandle = async () => {
    const { data } = await logout(token);
    if (data?.success) {
      Cookies.remove("user");
      Cookies.remove("token");
      navigate("/login");
    }
  };
  return (
    <div className=" flex justify-between py-5 px-5 shadow-lg">
      <h2 className=" text-2xl font-medium">Contact</h2>
      <button
        onClick={logoutHandle}
        className=" bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
