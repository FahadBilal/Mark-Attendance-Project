import React from "react";

const ShowAllUser = () => {
  const userRecord = JSON.parse(localStorage.getItem("allUser"));
  console.log(userRecord);
  return (
    <div className="min-h-screen bg-red-500 lg:px-32  px-4 py-20 flex justify-center">
      <div className="bg-white lg:p-8 p-4 w-full rounded-lg shadow">
        <h2 className="sm:text-3xl text-xl font-satoshi font-extrabold text-red-500 text-center mb-8">
          All User's Record
        </h2>
        {userRecord.length === 0 ? (
          <p className="text-xl font-poppins font-bold text-center text-black">
            No user records available.
          </p>
        ) : (
          <div className="w-full max-w-5xl overflow-x-auto mx-auto rounded-md">
            <table className="table-auto border-collapse w-full  shadow-md border-gray-300 border ">
              <thead className="bg-gray-500">
                <tr>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    FullName
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Role
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Email
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    User ID
                  </th>
                </tr>
              </thead>
              {userRecord.map((record) => (
                <tr
                  key={record._id}
                  className="text-center odd:bg-gray-300 even:bg-gray-200"
                >
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.fullName}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black capitalize">
                    {record.role}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.email}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record._id}
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

export default ShowAllUser;
