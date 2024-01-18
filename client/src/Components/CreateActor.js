import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./Validation";
const API_URL = process.env.REACT_APP_API_URL;

const CreateActor = () => {
  const history = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(Validation(input));
  };

  const callCreateFunc = async () => {
    if (error.name === "" && error.email === "" && error.contact === "") {
      await axios.post(`${API_URL}/create`, input);
      // const response = await axios.post(`${API_URL}/create`, input);
      // console.log("Data posted successfully:", response.data.data);
      // Reset the form fields
      setInput({
        name: "",
        email: "",
        contact: "",
      });
      setTimeout(() => {
        history("/");
      }, 100);
    }
  };

  useEffect(() => {
    callCreateFunc();
    // eslint-disable-next-line
  }, [error]);

  return (
    <div className="bg-[#340744] h-screen flex flex-col items-center ">
      <h1 className=" text-[30px] font-bold mt-24 md:mt-24 lg:mt-10 xl:mt-10 text-white">
        CREATE ACTOR
      </h1>
      <div className=" bg-white w-[380px] md:w-[500px] lg:w-[500px] xl:w-[500px] rounded-md mt-10 shadow-2xl hover:shadow-black transition-all ease-in-out duration-500">
        <form onSubmit={handleSubmit} className=" flex flex-col mx-10 my-2">
          <label className=" text-black mt-5 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            className=" border-black border-[1px] rounded-md px-3 py-1 mb-1"
            id="name"
            placeholder="Please Enter Name"
          />
          {error.name ? (
            <p className={`text-sm mb-1 text-center text-red-500`}>
              {error.name}
            </p>
          ) : (
            <p className=" text-sm invisible mb-1 text-center">abc</p>
          )}
          <label className=" text-black font-semibold" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleInput}
            type="text"
            name="email"
            className=" border-black border-[1px] rounded-md px-3 py-1 mb-1"
            id="email"
            placeholder="Please Enter Email"
          />
          {error.email ? (
            <p className={`text-sm mb-1 text-center text-red-500`}>
              {error.email}
            </p>
          ) : (
            <p className=" text-sm invisible mb-1 text-center">abc</p>
          )}
          <label className=" text-black font-semibold" htmlFor="contact">
            Contact
          </label>
          <input
            onChange={handleInput}
            type="text"
            name="contact"
            className=" border-black border-[1px] rounded-md px-3 py-1 mb-1"
            id="contact"
            placeholder="Please Enter Contact"
          />
          {error.contact ? (
            <p className={`text-sm mb-1 text-center text-red-500`}>
              {error.contact}
            </p>
          ) : (
            <p className=" text-sm invisible mb-1 text-center">abc</p>
          )}
          <div className=" flex justify-between">
            <button
              type="submit"
              className=" text-white mb-3 bg-[#340744] hover:bg-[#603F8B] rounded-md px-3 py-1"
            >
              Save
            </button>
            <Link
              to={"/"}
              className=" mb-3 font-bold text-[#340744] hover:text-[#603F8B] rounded-md px-3 py-1"
            >
              Go Back?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActor;
