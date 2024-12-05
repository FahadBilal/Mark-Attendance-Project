import React from "react";

const AttendanceRecord = () => {
  const storedRecord = JSON.parse(localStorage.getItem("viewAttendanceRecord"));
  const attendanceRecord = storedRecord.attendanceRecord;
  console.log(attendanceRecord);
  return (
    <div className="min-h-screen bg-pink-500 lg:px-32  px-4 py-20 flex justify-center">
      <div className="bg-white lg:p-8 p-4 w-full rounded-lg shadow">
        <h2 className="sm:text-3xl text-xl font-satoshi font-extrabold text-pink-500 text-center mb-8">
          Attendance Record
        </h2>
        {attendanceRecord.length === 0 ? (
          <p className="text-xl font-poppins font-bold text-center text-black">
            No attendance records available.
          </p>
        ) : (
          <div className="w-full max-w-4xl overflow-x-auto mx-auto rounded-md">
            <table className="table-auto border-collapse w-full  shadow-md border-gray-300 border ">
              <thead className="bg-gray-500">
                <tr>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Date
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Status
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    User ID
                  </th>
                </tr>
              </thead>
              {attendanceRecord.map((record) => (
                <tr
                  key={record._id}
                  className="text-center odd:bg-gray-300 even:bg-gray-200"
                >
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black capitalize">
                    {record.status}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.userId}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecord;
