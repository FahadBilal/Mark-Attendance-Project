import React from "react";


const ShowAllGrade = () => {


  const gradeRecord = JSON.parse(localStorage.getItem("AllGrades"));
  console.log(gradeRecord);
  return (
    <div className="min-h-screen bg-red-500   px-4 py-20 flex justify-center">
      <div className="bg-white p-4 w-full rounded-lg shadow">
        <h2 className="sm:text-3xl text-xl font-satoshi font-extrabold text-red-500 text-center mb-8">
          All Grade Records
        </h2>
        {gradeRecord.length === 0 ? (
          <p className="text-xl font-poppins font-semibold text-center text-black">
            No Grade records available.
          </p>
        ) : (
          <div className="w-full max-w-full overflow-x-auto mx-auto rounded-md">
            <table className="table-auto border-collapse w-full shadow-md border-gray-300 border ">
              <thead className="bg-gray-500">
                <tr>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    FullName
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Email
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Attendance Percentage
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Grade
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    Description
                  </th>
                  <th className="font-poppins sm:text-xl text-md font-semibold px-4 py-2 text-black">
                    User ID
                  </th>
                </tr>
              </thead>
              {gradeRecord.map((record) => (
                <tr
                  key={record._id}
                  className="text-center odd:bg-gray-300 even:bg-gray-200"
                >
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.fullName}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.email}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.attendancePercentage}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.grade}
                  </td>
                  <td className="font-poppins sm:text-lg text-sm font-normal px-4 py-2 text-black">
                    {record.description}
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

export default ShowAllGrade;
