import React from "react";

const StudentDetail = () => {
  return (
    <div className="min-h-screen bg-gray-100  p-8">
      <span className="text-2xl font-normal mb-4">Student Details of</span>{" "}
      <span className="text-2xl ml-2 mb-4 font-bold">Company Name</span>
      <div className="p-8 mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">SR no.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">Company A</td>
                <td className="py-3 px-4">$50.25</td>
                <td className="py-3 px-4">100</td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">Company A</td>
                <td className="py-3 px-4">$50.25</td>
                <td className="py-3 px-4">100</td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">Company A</td>
                <td className="py-3 px-4">$50.25</td>
                <td className="py-3 px-4">100</td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">Company A</td>
                <td className="py-3 px-4">$50.25</td>
                <td className="py-3 px-4">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
