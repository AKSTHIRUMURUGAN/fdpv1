"use client";
import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    facultyId: "",
    eventId: "",
    participationType: "",
    certificateUrl: "",
    learningOutcomes: "",
    learningOutcomesUrl: "",
    studyMaterials: "",
    studyMaterialsUrl: "",
  });

  const [showLearningOutcomesUrl, setShowLearningOutcomesUrl] = useState(false);
  const [showStudyMaterialsUrl, setShowStudyMaterialsUrl] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Conditionally show URL inputs based on selections
    if (id === "learningOutcomes" && value === "YES") {
      setShowLearningOutcomesUrl(true);
    } else if (id === "learningOutcomes" && value === "NO") {
      setShowLearningOutcomesUrl(false);
      setFormData({
        ...formData,
        learningOutcomesUrl: "", // Clear URL if not applicable
      });
    }

    if (id === "studyMaterials" && value === "YES") {
      setShowStudyMaterialsUrl(true);
    } else if (id === "studyMaterials" && value === "NO") {
      setShowStudyMaterialsUrl(false);
      setFormData({
        ...formData,
        studyMaterialsUrl: "", // Clear URL if not applicable
      });
    }
  };

  const handleFileUpload = (e) => {
    const { id, files } = e.target;
    const file = files[0];
    const fileUrl = URL.createObjectURL(file); // Creating a temporary URL

    setFormData({
      ...formData,
      [id]: fileUrl, // Assuming this URL will be uploaded and stored
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with the following data:", formData);
    // API call or form submission logic
    // For example:
    fetch('/api/achievement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="ml-64 p-6 min-h-screen bg-blue-100 overflow-y-auto">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Faculty Achievement Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-purple-700 text-sm">Faculty ID</label>
            <input
              type="text"
              id="facultyId"
              value={formData.facultyId}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
              placeholder="Enter Faculty ID"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 text-sm">Event ID</label>
            <input
              type="text"
              id="eventId"
              value={formData.eventId}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
              placeholder="Enter Event ID"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 text-sm">Participation Type</label>
            <select
              id="participationType"
              value={formData.participationType}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
              required
            >
              <option value="">Select Participation Type</option>
              <option value="Attended">Attended</option>
              <option value="Organized">Organized</option>
            </select>
          </div>

          <div>
            <label className="block text-purple-700 text-sm">Certificate Upload</label>
            <input
              type="file"
              id="certificateUrl"
              onChange={handleFileUpload}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <div>
            <label className="block text-purple-700 text-sm">Report on Learning Outcomes</label>
            <select
              id="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
            >
              <option value="">Select</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            {showLearningOutcomesUrl && (
              <div>
                <label className="block text-purple-700 text-sm">Learning Outcomes URL</label>
                <input
                  type="url"
                  id="learningOutcomesUrl"
                  value={formData.learningOutcomesUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
                  placeholder="Enter URL for Learning Outcomes"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-purple-700 text-sm">Proceedings/Study Materials</label>
            <select
              id="studyMaterials"
              value={formData.studyMaterials}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
            >
              <option value="">Select</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
            {showStudyMaterialsUrl && (
              <div>
                <label className="block text-purple-700 text-sm">Study Materials URL</label>
                <input
                  type="url"
                  id="studyMaterialsUrl"
                  value={formData.studyMaterialsUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-purple-300 rounded-md w-full text-sm"
                  placeholder="Enter URL for Study Materials"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button className="bg-purple-700 text-white py-2 px-6 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
