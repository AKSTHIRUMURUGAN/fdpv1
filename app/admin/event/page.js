"use client";
import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Event() {
  const { events, setEvents } = useContext(DataContext);
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventMode, setEventMode] = useState(""); // Updated state for dropdown
  const [participantsCount, setParticipantsCount] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [sponsoringAgency, setSponsoringAgency] = useState("");

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventTime,
      eventVenue,
      eventDescription,
      eventStartDate: eventStartDate.toISOString(),
      eventEndDate: eventEndDate.toISOString(),
      eventMode,
      participantsCount,
      organizationName,
      sponsoringAgency
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const result = await response.json();
      console.log(result.message);

      setEvents([...events, newEvent]);

      // Clear the form fields after submission
      setEventName("");
      setEventTime("");
      setEventVenue("");
      setEventDescription("");
      setEventStartDate(new Date());
      setEventEndDate(new Date());
      setEventMode(""); // Reset dropdown
      setParticipantsCount("");
      setOrganizationName("");
      setSponsoringAgency("");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ml-64 p-6 min-h-screen bg-purple-100 overflow-y-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Add New Event</h2>
      <form
        onSubmit={handleEventSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-purple-700">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Event Start Date</label>
          <DatePicker
            selected={eventStartDate}
            onChange={(date) => setEventStartDate(date)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Event End Date</label>
          <DatePicker
            selected={eventEndDate}
            onChange={(date) => setEventEndDate(date)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Event Time</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Venue</label>
          <input
            type="text"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Event Mode</label>
          <select
            value={eventMode}
            onChange={(e) => setEventMode(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          >
            <option value="" disabled>Select Event Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Participants Count</label>
          <input
            type="number"
            value={participantsCount}
            onChange={(e) => setParticipantsCount(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Organization Name</label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700">Sponsoring Agency</label>
          <input
            type="text"
            value={sponsoringAgency}
            onChange={(e) => setSponsoringAgency(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default Event;
