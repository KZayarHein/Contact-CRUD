/* eslint-disable react/prop-types */
const formFields = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
  },
];

// eslint-disable-next-line no-unused-vars
const ContactForm = ({ formik, closeModal }) => {
  const {handleSubmit,getFieldProps,isSubmitting} = formik;
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map(({ id, label, type }) => (
        <div className="flex items-center gap-3 mb-3" key={id}>
          <label htmlFor={id} className="w-[90px] text-right">
            {label}
          </label>
          <div className="w-full">
            <input
              type={type}
              id={id}
              name={id}
              {...getFieldProps(id)}
              className="block w-full border-0 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded py-1 px-2"
            />
          </div>
        </div>
      ))}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="ring-blue-100 ring-1 rounded ring-inset text-blue-900 hover:ring-blue-200 hover:ring-2 px-4 py-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
