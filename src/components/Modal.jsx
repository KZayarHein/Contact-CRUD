/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Transition, Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { Fragment } from "react";
import {
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../redux/services/contactApi";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.number().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const Modal = ({ isOpen, closeModal, contact }) => {
  const [updateContact] = useUpdateContactMutation();
  const { data } = useGetContactsQuery();
  const contacts = data?.contacts?.data;
  const currentContact = contacts?.find((item) => item.id === contact.id);
  // console.log(currentContact);
  const formik = useFormik({
    initialValues: {
      name: `${currentContact.name}`,
      email: `${currentContact.email}`,
      phone: `${currentContact.phone}`,
      address: `${currentContact.address}`,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await updateContact({ id: currentContact.id, values });
      // console.log(data);
    },
  });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit contact
                </Dialog.Title>
                <div className="mt-2 mb-3">
                  <p className="text-sm text-gray-500">
                    Make changes to your profile here. Click save when you're
                    done.
                  </p>
                </div>
                <ContactForm formik={formik} closeModal={closeModal} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
