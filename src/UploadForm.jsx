import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { GetData } from './temporaryController/GoogleDataFetcher'; // Importing default export

const supabase_project_url = 'https://exttgrmtjbijllepzsxv.supabase.co';
const supabase_api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dHRncm10amJpamxsZXB6c3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MzY4MDMsImV4cCI6MjAzNDAxMjgwM30.-m-nif2yJmggOVd-HgPT2AJJJIo5-etkbVW3j57KfFk';
const supabase = createClient(supabase_project_url, supabase_api_key);

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
    headshot: "", // Store URL for headshot
    fullBody: "", // Store URL for full body
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
            console.log(formData);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Student Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        <div>
        <label className="block text-sm font-medium text-gray-700">
            Headshot Photo
          </label>
          <img
            src={formData.headshot}
            alt="Headshot"
            className="mt-1 block w-full rounded-md"
          />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
            Full Body Photo
          </label>
          <img
            src={formData.fullBody}
            alt="Full Body"
            className="mt-1 block w-full rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;

