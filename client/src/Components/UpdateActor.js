import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Validation from "./Validation";
const API_URL = process.env.REACT_APP_API_URL;

const UpdateActor = () => {
  const [ReadData, setReadData] = useState({});
  const { id } = useParams();
  const history = useNavigate();

  const [update, setUpdate] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
    // Clear the error for the field being updated
    setErrors({ ...errors, [name]: "" });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = Validation(update);
    setErrors(validationErrors);

    // If there are validation errors, return without submitting the form
    if (Object.values(validationErrors).some((error) => error !== "")) {
      return;
    }

    // If no validation errors, proceed with the update
    try {
      await axios.put(`${API_URL}/update/${id}`, update);
      setTimeout(() => {
        history("/");
      }, 100);
    } catch (error) {
      // Handle error from the update request, if needed
      console.error("Error updating data:", error);
    }
  };

  const getReadData = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/read/${id}`);
      setReadData(response.data.data);
      setUpdate({
        name: response.data.data.name,
        email: response.data.data.email,
        contact: response.data.data.contact,
      });
    } catch (error) {
      // Handle error from the read request, if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getReadData(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="bg-[#524864] h-screen text-white flex flex-col items-center">
      <h1 className="text-[30px] font-bold mt-10">UPDATE ACTOR</h1>
      <div className="bg-white w-[500px] rounded-md mt-10 shadow-2xl hover:shadow-black transition-all ease-in-out duration-500">
        <form
          className="flex flex-col mx-10 my-2"
          onSubmit={handleUpdateSubmit}
        >
          <label className="text-black mt-5 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            defaultValue={ReadData.name}
            onChange={handleUpdate}
            type="text"
            name="name"
            className="border-black border-[1px] rounded-md px-3 py-1 mb-1 text-black"
            id="name"
            placeholder="Please Enter Name"
          />
          {errors.name && (
            <p className="text-sm text-center text-red-500">{errors.name}</p>
          )}
          {!errors.name && (
            <p className="text-sm text-center invisible text-red-500">-</p>
          )}
          <label className="text-black mt-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            defaultValue={ReadData.email}
            onChange={handleUpdate}
            type="text"
            name="email"
            className="border-black border-[1px] rounded-md px-3 py-1 mb-1 text-black"
            id="email"
            placeholder="Please Enter Email"
          />
          {errors.email && (
            <p className="text-sm text-center text-red-500">{errors.email}</p>
          )}
          {!errors.email && (
            <p className="text-sm text-center invisible text-red-500">-</p>
          )}

          <label className="text-black mt-1 font-semibold" htmlFor="contact">
            Contact
          </label>
          <input
            defaultValue={ReadData.contact}
            onChange={handleUpdate}
            type="text"
            name="contact"
            className="border-black border-[1px] rounded-md px-3 py-1 mb-1 text-black"
            id="contact"
            placeholder="Please Enter Contact"
          />
          {errors.contact && (
            <p className="text-sm text-center text-red-500">{errors.contact}</p>
          )}
          {!errors.contact && (
            <p className="text-sm text-center invisible text-red-500">-</p>
          )}
          <div className="flex justify-between">
            <button className="text-white mb-3 bg-[#524864] hover:bg-[#926A72] rounded-md px-3 py-1">
              Update
            </button>
            <Link
              to={"/"}
              className="mb-3 font-bold text-[#524864] hover:text-[#926A72] rounded-md px-3 py-1"
            >
              Go Back?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateActor;
