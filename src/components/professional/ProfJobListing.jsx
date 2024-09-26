import React, { useState } from "react";
import AddJob from "./AddJob"; // Import AddJob component

const ProfJobListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-primary font-primary">Job Listing</h1>
        <button
          onClick={handleOpenModal}
          className="bg-primary text-white font-primary py-2 px-4 rounded-xl shadow-md hover:bg-secondary"
        >
          <i className="fas fa-plus mr-2 text-secondary"></i>
          Add Job
        </button>
      </div>

      {/* Modal for Adding Job */}
      <AddJob isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default ProfJobListing;
