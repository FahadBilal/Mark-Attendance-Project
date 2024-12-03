import React from "react";
import Button from "../global/Button.jsx";
const ViewAttendanceRecord = () => {
  return (
    <div className="w-full p-6 bg-white rounded-xl">
         <Button
                className={`bg-green-500 hover:bg-green-600 text-white transition-all duration-300`}
              >
                {"Record"}
              </Button>
    </div>
  );
};

export default ViewAttendanceRecord;
