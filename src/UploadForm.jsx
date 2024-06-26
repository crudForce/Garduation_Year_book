import React, { useState } from "react";
<<<<<<< eyob/UploadForm
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase_project_url = 'https://exttgrmtjbijllepzsxv.supabase.co'
const supabase_api_key =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dHRncm10amJpamxsZXB6c3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MzY4MDMsImV4cCI6MjAzNDAxMjgwM30.-m-nif2yJmggOVd-HgPT2AJJJIo5-etkbVW3j57KfFk'
const supabase = createClient(supabase_project_url, supabase_api_key);

=======
import supabase from "./supabaseClient"; // Adjust the path as needed
>>>>>>> master

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
    headshot: null,
    fullBody: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
<<<<<<< eyob/UploadForm
  e.preventDefault();

  try {
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert([
        {
          fullName: formData.fullName,
          studentId: formData.studentId, // Using studentId as the primary key
          department: formData.department,
          nickname: formData.nickname,
          lastWord: formData.lastWord,
          describeYourself: formData.describeYourself,
          futureSelf: formData.futureSelf,
          friendsSay: formData.friendsSay,
          instagramHandle: formData.instagramHandle,
          headshotUrl: `headshots/${formData.studentId}-${formData.headshot.name}`,
          fullBodyUrl: `full-bodies/${formData.studentId}-${formData.fullBody.name}`,
        },
      ]);
            
    if (studentError) {
      throw studentError;
    }

    console.log('Student data inserted successfully:', studentData);
    console.log('Form data:', formData);
  } catch (error) {
    console.error('Error uploading the form', error.message);
  }
};

=======
    e.preventDefault();

    try {
      // Upload headshot
      let headshoturl = null;
      if (formData.headshot) {
        const { data, error } = await supabase.storage
          .from("students")
          .upload(
            `headshots/${formData.id}_${formData.headshot.name}`,
            formData.headshot
          );

        if (error) throw error;
        headshoturl = data.path;
      }

      // Upload full body photo
      let fullbodyurl = null;
      if (formData.fullBody) {
        const { data, error } = await supabase.storage
          .from("students")
          .upload(
            `fullbody/${formData.id}_${formData.fullBody.name}`,
            formData.fullBody
          );

        if (error) throw error;
        fullbodyurl = data.path;
      }

      // Prepare data for insertion
      const studentData = {
        id: formData.id,
        fullname: formData.fullName,
        department: formData.department,
        nickname: formData.nickname,
        lastword: formData.lastWord,
        describeyourself: formData.describeYourself,
        futureself: formData.futureSelf,
        friendssay: formData.friendsSay,
        instagramhandle: formData.instagramHandle,
        headshoturl,
        fullbodyurl,
      };

      // Log data to be inserted
      console.log("Student Data:", studentData);

      // Insert student data into the database
      const { error } = await supabase.from("students").insert([studentData]);

      if (error) throw error;
      alert("Student data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("There was an error uploading the data.");
    }
  };
>>>>>>> master

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Student Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
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
          <input
            type="file"
            name="headshot"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Body Photo
          </label>
          <input
            type="file"
            name="fullBody"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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
      </form>
    </div>
  );
}

export default UploadForm;
