import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const ReadActor = () => {
  const [ReadData, setReadData] = useState({});

  const { id } = useParams();

  const fetchSingleData = async () => {
    try {
      const response = await axios.get(`${API_URL}/read/${id}`);
      setReadData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSingleData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="bg-[#FF4500] h-screen text-white flex flex-col items-center">
      <h1 className=" text-[30px] font-bold mt-24 md:mt-24 lg:mt-10 xl:mt-10">
        READ ACTOR
      </h1>
      <div className=" bg-white w-[380px] md:w-[500px] lg:w-[500px] xl:w-[500px] rounded-md mt-10 shadow-2xl hover:shadow-black transition-all ease-in-out duration-500 flex flex-col">
        <p className="text-black mt-5 font-bold text-center text-[20px] border-b-[2px]">
          {ReadData.name}
        </p>
        <div className=" flex justify-between mx-8">
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            Name
          </p>
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            {ReadData.name}
          </p>
        </div>
        <div className=" flex justify-between mx-8">
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            Email
          </p>
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            {ReadData.email}
          </p>
        </div>
        <div className=" flex justify-between mx-8 mb-5">
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            Contact
          </p>
          <p className=" text-black mt-5 font-semibold" htmlFor="name">
            {ReadData.contact}
          </p>
        </div>

        <Link
          to={"/"}
          className=" text-center mb-3 font-bold text-[#FF4500] hover:text-[#FF8300] rounded-md px-3 py-1"
        >
          Go Back?
        </Link>
      </div>
    </div>
  );
};

export default ReadActor;
