/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/services/authApi";
import Cookies from "js-cookie";



const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data } = await login(values);
      if (data?.success) {
        Cookies.set("user", JSON.stringify(data?.user));
        Cookies.set("token", data?.token);
        navigate("/");
      }
    },
  });

  const {handleSubmit,getFieldProps,touched,errors} = formik;
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className=" flex flex-col w-96 shadow-lg px-6 py-6 gap-5">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login account
            </h2>
          </div>
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...getFieldProps("email")}
                    className="block w-full rounded-md shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-500 outline-none py-2 px-3"
                  />
                  {touched.email && errors.email ? (
                    <div className=" text-sm text-red-500">
                      {errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...getFieldProps("password")}
                    className="block w-full rounded-md shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-2 focus:ring-blue-500 outline-none py-2 px-3"
                  />
                  {touched.password && errors.password ? (
                    <div className=" text-sm text-red-500">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <p className=" text-sm text-gray-500">
                Don't have an acount?
                <Link to={"/register"}>
                  <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register
                  </span>
                </Link>
              </p>
              <div>
                {isLoading ? (
                  <button type="button" disabled className="w-full  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Processing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
