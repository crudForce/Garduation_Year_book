import React from "react";
import StudentCard from "./components/StudentCard";

const Students = () => {
  return (
    <div>
      <div className="App">
        <h1 className="text-center text-3xl font-bold">Graduation Year Book</h1>

        <div className="p-4">
          <StudentCard />
        </div>
      </div>
    </div>
  );
};

export default Students;
