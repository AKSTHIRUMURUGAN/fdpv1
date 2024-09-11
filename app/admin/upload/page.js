'use client';

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { DataContext } from "../../context/DataContext";

function Upload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [departmentName, setDepartmentName] = useState(""); // New state for department name
    const router = useRouter(); // Next.js useRouter
    const { setData: setContextData } = useContext(DataContext);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDepartmentNameChange = (event) => {
        setDepartmentName(event.target.value); // Update department name state
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const reader = new FileReader();
        reader.readAsArrayBuffer(file); // Read the file as a binary buffer

        reader.onload = async (e) => {
            const buffer = e.target.result;
            const workbook = XLSX.read(buffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert to JSON with header

            // Define the mapping from old keys to new keys
            const keyMapping = [
                "sl_no",
                "name_of_faculty",
                "designation",
                "fdp_attended",
                "fdp_organized",
                "workshop_attended",
                "workshop_organized",
                "webinar_attended",
                "webinar_organized",
                "seminar_attended",
                "seminar_organized",
                "conference_attended",
                "conference_organized",
                "lectures_delivered",
                "nptel_courses_attended",
                "mooc_courses_attended"
            ];

            console.log("Raw JSON Data:", jsonData); // Log initial JSON data

            // Filter out empty rows
            const filteredData = jsonData.filter(row =>
                row.some(cell => cell !== null && cell !== undefined && cell !== '')
            );
            filteredData.shift();

            const mappedData = filteredData.map(row => {
                const rowData = {};
                keyMapping.forEach((key, index) => {
                    // Shift values by 1 column to align with the keyMapping
                    rowData[key] = row[index + 1] || 0; // Adjust index to account for column shift
                });
                return rowData;
            });

            console.log("Mapped Data:", mappedData); // Log transformed data

            // Store the data locally without sending it to the API
            setData(mappedData);
            setContextData(mappedData);

            // Post data to the API
            if (departmentName) {
                await postDataToAPI(departmentName, mappedData);
            } else {
                alert("Please enter a department name!");
            }
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };
    };

    const postDataToAPI = async (departmentName, staffData) => {
        try {
            const response = await fetch('/api/upload', { // Adjust the API endpoint as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ department_name: departmentName, staffData }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.message); // Log success message
                alert("Data successfully saved!");
                // router.push('/success'); // Redirect on successful upload (optional)
            } else {
                console.error(result.message); // Log error message
                alert("Error saving data: " + result.message);
            }
        } catch (error) {
            console.error("Error posting data:", error); // Log any errors
            alert("Error posting data: " + error.message);
        }
    };

    // Helper function to render nested objects
    const renderNestedObject = (obj) => {
        return Object.entries(obj).map(([key, value]) => (
            <div key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {value}
            </div>
        ));
    };

    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Upload Dataset</h2>
            <input
                type="text"
                placeholder="Enter department name"
                value={departmentName}
                onChange={handleDepartmentNameChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleFileUpload}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
            >
                Upload
            </button>

            {data.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Uploaded Data</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key} className="border px-4 py-2">{key.replace(/_/g, ' ')}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.entries(row).map(([key, value], idx) => (
                                        <td key={idx} className="border px-4 py-2">
                                            {typeof value === 'object' ? (
                                                <div className="flex flex-col space-y-1">
                                                    {renderNestedObject(value)}
                                                </div>
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Upload;
