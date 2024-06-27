import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { GetData } from './temporaryController/GoogleDataFetcher'; // Importing default export

function UploadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "",
    nickname: "",
    lastWord: "",
    describeYourself: "",
    futureSelf: "",
    friendsSay: "",
    instagramHandle: "",
    headshot: "", // Store file ID for headshot
    fullBody: "", // Store file ID for full body
  });

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await GetData();
        setData(fetchedData);
        if (fetchedData.length > 0) {
          setFormData(fetchedData[0]); // Initialize form with the first object
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data.length - 1));
    setFormData(data[currentIndex + 1]);
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    setFormData(data[currentIndex - 1]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFileUrls = {
        ...formData,
        headshotUrl: `headshots/${formData.studentId}-${formData.headshot}`,
        fullBodyUrl: `full-bodies/${formData.studentId}-${formData.fullBody}`,
      };

      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .insert([formDataWithFileUrls]);

      if (studentError) {
        throw studentError;
      }

      console.log('Student data inserted successfully:', studentData);
      console.log('Form data:', formDataWithFileUrls);
    } catch (error) {
      console.error('Error uploading the form', error.message);
    }
  };

  // Function to generate proxied Google Drive thumbnail link
  const getProxiedImageLink = (fileId) => {
    const googleDriveThumbnailLink = `https://drive.google.com/thumbnail?id=${fileId}`;
    return `http://localhost:3000/proxy?url=${encodeURIComponent(googleDriveThumbnailLink)}`;
  };

  return (
    <div className=" p-4 w-full h-full">
      <h1 className="text-2xl font-bold flex mt-12 justify-center mb-4">Upload Student Data</h1>
      <form onSubmit={handleSubmit} className="flex  justify-center my-8 h-full">
                    <div className=" w-[20vw]  mr-8">
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Word
          </label>
          <input
            type="text"
            name="lastWord"
            value={formData.lastWord}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Describe Yourself in One Word
          </label>
          <input
            type="text"
            name="describeYourself"
            value={formData.describeYourself}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            In Ten Years I Will Be
          </label>
          <input
            type="text"
            name="futureSelf"
            value={formData.futureSelf}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            What Do Your Friends Say About You
          </label>
          <input
            type="text"
            name="friendsSay"
            value={formData.friendsSay}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div >
        <div className="my-2">
          <label className="block text-sm font-medium text-gray-700">
            Instagram Handle
          </label>
          <input
            type="text"
            name="instagramHandle"
            value={formData.instagramHandle}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        </div>
                    <div className="flex-col justify-around gap-4 ">
        <div className="">
          <label className="block text-sm font-medium text-gray-700">
            Headshot Photo
          </label>
          <img
            src={getProxiedImageLink(formData.headshot)}
            alt="Headshot"
            className="mt-4 block w-full rounded-md"
          />
        </div>
        <div className= "  " >
          <label className="block text-sm font-medium text-gray-700">
            Full Body Photo
          </label>
          <img
            src={getProxiedImageLink(formData.fullBody)}
            alt="Full Body"
            className="mt-4 block w-full rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full my-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-red-800"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-gray-500"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-gray-500"
          >
            Next
          </button>
        </div>
                    </div>
      </form>
    </div>
  );
}

export default UploadForm;

