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
      }, 100);
    }
  };
  useEffect(() => {
    getallactors();
  }, []);
  return (
    <div className=" flex flex-col items-center bg-[#FFC363] h-screen">
      <h1 className=" mt-10 font-bold text-[30px] text-white">
        CRUD APP FOR ACTORS
      </h1>
      <div className=" flex flex-row mt-10">
        <table className=" w-[800px] bg-white rounded-md shadow-2xl hover:shadow-black transition-all ease-in-out duration-500">
          <thead className=" border-b-2">
            <tr>
              <th className="px-6 py-3 text-left">Sr.no.</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allActors.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-2 text-left">{index + 1}</td>
                  <td className="px-6 py-2 text-left truncate max-w-[20ch]">
                    {item.name}
                  </td>
                  <td className="px-6 py-2 text-left truncate max-w-[25ch]">
                    {item.email}
                  </td>
                  <td className="px-6 py-2 text-left">{item.contact}</td>
                  <td className="px-6 py-2 text-left">
                    <button
                      className=" px-2 bg-[#E10032] rounded-md mx-1 text-white"
                      onClick={() => deleteActor(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link to={`/update/${item._id}`}>
                      <button className=" px-2 bg-[#524864] rounded-md mx-1 text-white">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </Link>
                    <Link to={`/read/${item._id}`}>
                      <button className=" px-2 bg-[#EBB30A] rounded-md mx-1 text-white">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Link to={"/create"}>
            <button className="px-3 py-2 bg-[#0A4B39] text-white ml-6 rounded-md shadow-2xl shadow-black">
              Create <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListOfActors;
