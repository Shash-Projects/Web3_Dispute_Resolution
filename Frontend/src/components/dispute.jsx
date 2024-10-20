import React, { useState } from "react";

const Dispute = () => {
  const [dispute, setDispute] = useState("");

  const handleDisputeChange = (e) => {
    setDispute(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Dispute uploaded: ${dispute}`);
    // apna backend m uplaod krne ka logic dal dena
    setDispute("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background:
          "linear-gradient(135deg, #FF7E5F, #feb47b, #86A8E7, #91EAE4)",
      }}
    >
      <h1 className="text-4xl font-bold mb-6">Upload Your Dispute</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white bg-opacity-90 rounded-lg shadow-xl backdrop-blur-md">
        <textarea
          className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all transform hover:scale-105"
          rows="6"
          placeholder="Write your dispute here..."
          value={dispute}
          onChange={handleDisputeChange}
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:bg-blue-700 transition-all transform hover:scale-105"
        >
          Upload Dispute
        </button>
      </form>
    </div>
  );
};

export default Dispute;
