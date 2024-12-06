import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../global/Button.jsx";

const ShowAllLeaveRequest = () => {
  const navigate = useNavigate();

  const handleUpdateClick = (leaveId) => {
    navigate(`/admin/update-leave/${leaveId}`);
  };


  const leaveRecord = JSON.parse(localStorage.getItem("allLeaveRequest"));
  console.log(leaveRecord);
  return (
    <div className="min-h-screen bg-red-500 lg:px-24  px-4 py-20 flex justify-center">
      <div className="bg-white lg:p-8 p-4 w-full rounded-lg shadow">
        <h2 className="sm:text-3xl text-xl font-satoshi font-extrabold text-red-500 text-center mb-8">
          All Leave Records
        </h2>
        {leaveRecord.length === 0 ? (
          <p className="text-xl font-poppins font-semibold text-center text-black">
            No Leave Request records available.
          </p>
        ) : (
          <div className="w-full max-w-7xl overflow-x-auto mx-auto rounded-md">
            <table className="table-auto border-collapse w-full shadow-md border-gray-300 border ">
              <thead className="bg-gray-500">
                <tr>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    FullName
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Status
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Leave Date
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Email
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Leave ID
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black"></th>
                </tr>
              </thead>
              {leaveRecord.map((record) => (
                <tr
                  key={record._id}
                  className="text-center odd:bg-gray-300 even:bg-gray-200"
                >
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.userId.fullName}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black capitalize">
                    {record.status}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {new Date(record.leaveDate).toISOString().split("T")[0]}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.userId.email}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record._id}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    <Button
                      onClick={() =>
                        handleUpdateClick(record._id)
                      }
                      title="Update Attendance"
                      className="text-emerald-500 hover:text-emerald-600 "
                    >
                      {<FaEdit className="sm:text-xl text-lg" />}
                    </Button>
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

export default ShowAllLeaveRequest;
