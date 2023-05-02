import { useGetContactsQuery } from "../redux/services/contactApi";
import Dropdown from "./Dropdown";
import Loader from "./Loader";

const ContactTable = () => {
  const { data,isFetching } = useGetContactsQuery();
  const contacts = data?.contacts?.data;
  // console.log(contacts);
  if (isFetching) {
    return <Loader/>
  }

  if (!contacts.length) {
    return
  }
  
  return (
    <table className=" min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b font-semibold border-b-gray-300 text-start pl-4 pr-3 py-[0.875rem] leading-5">Name</th>
          <th className="border-b font-semibold border-b-gray-300 text-start py-[0.875rem] leading-5 px-3">Email</th>
          <th className="border-b font-semibold border-b-gray-300 text-start py-[0.875rem] leading-5 px-3">Phone</th>
          <th className="border-b font-semibold border-b-gray-300 text-start py-[0.875rem] leading-5 px-3">Address</th>
          <th className="border-b font-semibold border-b-gray-300 text-start py-[0.875rem] leading-5 pr-4 pl-3 "></th>
        </tr>
      </thead>
      <tbody>
        {contacts?.map((contact) => (
          <tr key={contact?.id}>
            <td className="border-b font-medium leading-5 pl-4 pr-3 border-b-gray-300 text-start py-4 whitespace-nowrap">{contact?.name}</td>
            <td className="border-b leading-5 py-4 px-3 border-b-gray-300 text-start">{contact?.email}</td>
            <td className="border-b leading-5 py-4 px-3 border-b-gray-300 text-start ">{contact?.phone}</td>
            <td className="border-b leading-5 py-4 px-3 border-b-gray-300 text-start">{contact?.address}</td>
            <td className="border-b leading-5 pr-4 pl-3 py-4 relative border-b-gray-300 text-start "><Dropdown contact={contact}/></td>
          </tr>
        ))}
        
      </tbody>
    </table>
  );
};

export default ContactTable;
