import React from "react";

const ShowAllUser = () => {
  const userRecord = JSON.parse(localStorage.getItem("allUser"));
  console.log(userRecord);
  return (
    <div className="min-h-screen bg-red-500 sm:px-32 px-2 py-20 flex justify-center">
      <div className="bg-white sm:p-8 p-2 w-full rounded-lg shadow">
        <h2 className="text-3xl font-satoshi font-extrabold text-red-500 text-center mb-8">
          All User's Record
        </h2>
        {userRecord.length === 0 ? (
          <p className="text-xl font-poppins font-bold text-center text-black">
            No user records available.
          </p>
        ) : (
          <table className="table-auto border-collapse w-full max-w-4xl mx-auto shadow-md bg-gray-400 rounded-lg">
            <thead className="bg-gray-500">
              <tr>
                <th className="font-poppins text-xl font-bold px-4 py-2 border border-white text-white">
                  FullName
                </th>
                <th className="font-poppins text-xl font-bold px-4 py-2 border border-white text-white">
                  Role
                </th>
                <th className="font-poppins text-xl font-bold px-4 py-2 border border-white text-white">
                  Email
                </th>
                <th className="font-poppins text-xl font-bold px-4 py-2 border border-white text-white">
                  User ID
                </th>
              </tr>
            </thead>
            {userRecord.map((record) => (
              <tr key={record._id} className="text-center">
                <td className="font-poppins text-[16px] font-normal px-4 py-2 border border-white text-white">
                  {record.fullName}
                </td>
                <td className="font-poppins text-[16px] font-normal px-4 py-2 border border-white text-white capitalize">
                  {record.role}
                </td>
                <td className="font-poppins text-[16px] font-normal px-4 py-2 border border-white text-white">
                  {record.email}
                </td>
                <td className="font-poppins text-[16px] font-normal px-4 py-2 border border-white text-white">
                  {record._id}
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowAllUser;
