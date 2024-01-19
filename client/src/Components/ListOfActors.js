import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = process.env.REACT_APP_API_URL;

const ListOfActors = () => {
  const [allActors, setAllActors] = useState([]);

  const getallactors = async () => {
    const response = await axios.get(`${API_URL}/getallactors`);
    setAllActors(response.data.data);
  };

  const deleteActor = (id) => {
    if (window.confirm("Are you Sure to delete?")) {
      axios.delete(`${API_URL}/deleteactor/${id}`);
      setTimeout(() => {
        getallactors();
      }, 1000);
    }
  };

  useEffect(() => {
    getallactors();
    document.title = "List of Actors";
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#9619B2] h-screen md:bg-[#9619B2] md:h-screen xl:bg-[#9619B2] xl:h-screen lg:bg-[#9619B2] lg:h-screen">
      <h1 className=" mt-24 md:mt-24 lg:mt-10 xl:mt-10 font-bold text-[30px] text-white">
        CRUD APP FOR ACTORS
      </h1>
      <div className="flex flex-col lg:flex-row xl:flex-row mt-10 ">
        <table className="w-full sm:w-[640px] md:w-[750px] lg:w-[800px] xl:w-[1000px] bg-white rounded-md shadow-2xl hover:shadow-black transition-all ease-in-out duration-500">
          <thead className="border-b-2">
            <tr>
              <th className=" px-3 py-3 md:px-4 lg:px-6 xl:px-6 text-left">
                Sr.no.
              </th>
              <th className=" px-3 py-3 md:px-4 lg:px-6 xl:px-6 text-left">
                Name
              </th>
              {/* Hide Email and Contact columns on smaller devices */}
              <th className="hidden sm:table-cell  px-3 py-3 md:px-4 lg:px-6 xl:px-6 text-left">
                Email
              </th>
              <th className="hidden sm:table-cell  px-3 py-3 md:px-4 lg:px-6 xl:px-6 text-left">
                Contact
              </th>
              <th className=" px-3 py-3 md:px-4 lg:px-6 xl:px-6 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allActors.map((item, index) => (
              <tr key={index}>
                <td className=" px-3 py-2 md:px-4 lg:px-6 xl:px-6 text-left">
                  {index + 1}
                </td>
                <td className=" px-3 py-2 md:px-4 lg:px-6 xl:px-6 text-left truncate max-w-[20ch]">
                  {item.name}
                </td>
                {/* Hide Email and Contact columns on smaller devices */}
                <td className="hidden sm:table-cell  px-3 py-2 md:px-4 lg:px-6 xl:px-6 text-left truncate max-w-[25ch]">
                  {item.email}
                </td>
                <td className="hidden sm:table-cell  px-3 py-2 md:px-4 lg:px-6 xl:px-6 text-left">
                  {item.contact}
                </td>
                <td className=" px-3 py-2 md:px-4 lg:px-6 xl:px-6 text-left space-x-1 flex flex-row">
                  <button
                    className="px-2 bg-[#E4021B] rounded-md text-white"
                    onClick={() => deleteActor(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <Link to={`/update/${item._id}`}>
                    <button className="px-2 bg-[#381333] rounded-md text-white">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </Link>
                  <Link to={`/read/${item._id}`}>
                    <button className="px-2 bg-[#AB0552] rounded-md text-white">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 lg:mt-0 xl:mt-0 lg:ml-2 xl:ml-4 flex justify-center">
          <Link to={"/create"}>
            {/* Make Create button full-width */}
            <button className="w-[380px] sm:w-[658px] md:w-[750px] lg:w-full xl:w-full px-3 py-2 bg-[#340744] text-white rounded-md shadow-2xl shadow-black">
              Create <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListOfActors;
