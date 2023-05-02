import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateContactMutation } from "../redux/services/contactApi";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.number().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const CreateContact = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { data } = await createContact(values);
      //   console.log(data);
      data?.success && navigate("/");
    },
  });

  const {touched,errors,getFieldProps} = formik;
  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 w-96 p-5 shadow-md rounded"
        >
          <h2 className="text-2xl text-center">Create Contact</h2>

          <div>
            <label htmlFor="name" className="text-sm font-semibold leading-6">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                name="name"
                {...getFieldProps("name")}
                className=" w-full block border-0 outline-0 text-gray-900 rounded font-light ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-3"
              />
              {touched.name && errors.name ? (
                <div className="text-sm text-red-500">{errors.name}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold leading-6">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                {...getFieldProps("email")}
                className=" w-full block border-0 outline-0 text-gray-900 rounded font-light ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-3"
              />
              {touched.email && errors.email ? (
                <div className="text-sm text-red-500">
                  {errors.email}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold leading-6">
              Phone
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="phone"
                name="phone"
                {...getFieldProps("phone")}
                className=" w-full block border-0 outline-0 text-gray-900 rounded font-light ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-3"
              />
              {touched.phone && errors.phone ? (
                <div className="text-sm text-red-500">
                  {errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="text-sm font-semibold leading-6"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="address"
                name="address"
                {...getFieldProps("address")}
                className=" w-full block border-0 outline-0 text-gray-900 rounded font-light ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 py-2 px-3"
              />
              {touched.address && errors.address ? (
                <div className="text-sm text-red-500">
                  {errors.address}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Link to={"/"}>
              <button className=" border border-blue-500 rounded px-4 py-1 text-blue-500 hover:border-blue-400 hover:text-blue-400">
                Cancel
              </button>
            </Link>
            {isLoading ? (
              <button
                disabled
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-400"
              >
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-400"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
