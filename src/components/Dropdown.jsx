/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import EditInactiveIcon from "./EditInactiveIcon";
import DeleteInactiveIcon from "./DeleteInactiveIcon";
import Modal from "./Modal";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../redux/services/contactApi";

const Dropdown = ({contact}) => {
  const {data} = useGetContactsQuery()
  const contacts = data?.contacts?.data;
  const currentContact = contacts?.find(item => item.id === contact.id)
  const [isOpen, setIsOpen] = useState(false);
  const [deleteContact] = useDeleteContactMutation()

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const deleteContactHandler = async () => {
    if (window.confirm(`Do you want to delete ${contact.name}?`)) {
      // eslint-disable-next-line no-unused-vars
      const data = await deleteContact(currentContact?.id);
    }
  };
  return (
    <div className=" w-auto inline-block text-right ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="icon">
            <EllipsisHorizontalIcon
              className=" h-5 w-5 text-gray-500 hover:text-gray-800"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openModal}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={deleteContactHandler}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Modal form */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} contact={contact}/>
      
    </div>
  );
};

export default Dropdown;
