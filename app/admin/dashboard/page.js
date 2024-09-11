"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

function Dashboard() {
  const [data, setData] = useState([]);
  const [onlineMode, setOnlineMode] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [attendOrganized, setAttendOrganized] = useState(""); // For "Attended/Organized"
  const [fromDate, setFromDate] = useState(""); // Start date filter
  const [toDate, setToDate] = useState(""); // End date filter
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const COLORS = ["#7F3FBF", "#9B5B77", "#BF8A30", "#BF4D8C"]; // Purple shades

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/achievement");
      const result = await response.json();
      setData(result.achievements);
    };

    fetchData();
  }, []);

  // Handle Export to Excel
  const handleExport = () => {
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "exported_data.xlsx");
  };

  // Filter Data based on form input and date range
  const filteredData = data.filter((item) => {
    const eventStartDate = new Date(item.eventId.eventStartDate);
    const eventEndDate = new Date(item.eventId.eventEndDate);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    // Filtering logic
    return (
      (!selectedDepartment || item.facultyId.department_name === selectedDepartment) &&
      (!onlineMode || item.eventId.eventMode === onlineMode) &&
      (!attendOrganized || item.participationType === attendOrganized) &&
      (!fromDate || eventStartDate >= fromDateObj) &&
      (!toDate || eventEndDate <= toDateObj)
    );
  });

  // Create Pie Chart Data
  const pieChartData = filteredData.reduce((acc, item) => {
    const category = acc.find((cat) => cat.name === item.participationType);
    if (category) {
      category.value += 1;
    } else {
      acc.push({ name: item.participationType, value: 1 });
    }
    return acc;
  }, []);

  // Create Bar Chart Data
  const barChartData = filteredData.map((item) => ({
    name: item.facultyId.name_of_faculty,
    value: 1, // You can modify this based on what value you want to represent
  }));

  return (
    <div className="ml-64 p-6 min-h-screen bg-purple-100 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Dashboard</h1>

      {/* Export Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleExport}
          className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
        >
          Export Data
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            {/* Department Filter */}
            <div className="flex flex-col w-1/4">
              <label className="block mb-2 text-purple-700">
                Select Department:
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-purple-50"
              >
                {[
                  "",
                  "AERO",
                  "AIML",
                  "AIDS",
                  "CSE",
                  "MECT",
                  "MECH",
                  "R&A",
                  "BIOTECH",
                  "BIOMED",
                  "CSE(CY)",
                  "CSBS",
                  "CSD",
                  "EEE",
                  "ECE",
                ].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept || "All Departments"}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div className="flex flex-col w-1/4">
              <label className="block mb-2 text-purple-700">Mode:</label>
              <select
                value={onlineMode}
                onChange={(e) => setOnlineMode(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-purple-50"
              >
                <option value="">All Modes</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Attended/Organized Filter */}
            <div className="flex flex-col w-1/4">
              <label className="block mb-2 text-purple-700">
                Attended/Organized:
              </label>
              <select
                value={attendOrganized}
                onChange={(e) => setAttendOrganized(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-purple-50"
              >
                <option value="">All</option>
                <option value="Attended">Attended</option>
                <option value="Organized">Organized</option>
              </select>
            </div>

            {/* From Date Filter */}
            <div className="flex flex-col w-1/4">
              <label className="block mb-2 text-purple-700">From Date:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-purple-50"
              />
            </div>

            {/* To Date Filter */}
            <div className="flex flex-col w-1/4">
              <label className="block mb-2 text-purple-700">To Date:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full bg-purple-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">
          Category Distribution (Attended/Organized)
        </h3>
        {pieChartData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p className="text-purple-700">
            No data available for the Pie Chart.
          </p>
        )}
      </div>

      {/* Bar Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">
          Faculty Participation Comparison
        </h3>
        {barChartData.length > 0 ? (
          <BarChart width={500} height={300} data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#9B5B77" />
          </BarChart>
        ) : (
          <p className="text-purple-700">
            No data available for the Bar Chart.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
