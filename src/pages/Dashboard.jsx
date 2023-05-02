import { Link } from "react-router-dom";
import ContactTable from "../components/ContactTable";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Link to={'/contact/create'}>
        <button className=" bg-blue-500 text-white px-4 py-1 rounded my-10 ml-5">Create Contact</button>
        </Link>
      </div>
      <ContactTable />
    </div>
  );
};

export default Dashboard;
