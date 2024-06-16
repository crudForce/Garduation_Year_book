import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient"; // Adjust the path as needed

function StudentCard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from("students").select("*");

      if (error) {
        console.error("Error fetching students:", error);
      } else {
        setStudents(data);
      }
    };

    fetchStudents();

    // Test getPublicUrl with a known path

    const testGetPublicUrl = () => {
      const testUrl = supabase.storage
        .from("students")
        .getPublicUrl("headshots/1901_1.png").publicURL;
      console.log("Test Public URL:", testUrl);
    };

    testGetPublicUrl();
  }, []);

  console.log(students);

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{student.fullname}</h2>
            <p className="text-gray-700 mb-2">ID: {student.id}</p>
            <p className="text-gray-700 mb-2">
              Department: {student.department}
            </p>
            <p className="text-gray-700 mb-2">Nickname: {student.nickname}</p>
            <p className="text-gray-700 mb-2">Last Word: {student.lastword}</p>
            <p className="text-gray-700 mb-2">
              Describe Yourself: {student.describeyourself}
            </p>
            <p className="text-gray-700 mb-2">
              Future Self: {student.futureself}
            </p>
            <p className="text-gray-700 mb-2">
              Friends Say: {student.friendssay}
            </p>
            <p className="text-gray-700 mb-2">
              Instagram: {student.instagramhandle}
            </p>
            {student.headshoturl && (
              <img src="https://pixobpdscpbakwlbeoxu.supabase.co/storage/v1/object/public/students/fullbody/1900_Opera%20Snapshot_2024-06-09_104317_localhost.png" />
            )}
            {student.fullbodyurl && (
              <img
                src={
                  supabase.storage
                    .from("students")
                    .getPublicUrl(student.fullbodyurl).publicURL
                }
                alt="Full Body"
                className="w-full h-48 object-cover mt-2 rounded-md"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentCard;
