"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function FormEditFormat() {
  const [format, setFormat] = useState(null);
  const [tailles, setTailles] = useState([]);
  const [selectedTailles, setSelectedTailles] = useState([]);
  const [type, setType] = useState('');
  const { id } = useParams();
  const { token } = useAuth();
  
  // Fetch format data by id
  useEffect(() => {
    const fetchFormat = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats/${id}`);
        const data = await response.json();
        setFormat(data.data);
        setType(data.data.type);
        setSelectedTailles(data.data.tailles.map(taille => taille._id));
      } catch (error) {
        console.error("Error fetching format:", error);
      }
    };
    fetchFormat();
  }, [token, id]);

  // Fetch tailles data
  useEffect(() => {
    const fetchTailles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`);
        const data = await response.json();
        setTailles(data.data);
      } catch (error) {
        console.error("Error fetching tailles:", error);
      }
    };
    fetchTailles();
  }, [token]);

  // Update the selected tailles
  const handleTailleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTailles(selectedOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormat = {
      type,
      tailles: selectedTailles,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormat),
      });
      const data = await response.json();
      console.log("Format updated successfully:", data);
    } catch (error) {
      console.error("Error updating format:", error);
    }
  };

  if (!format) return <p>Loading format...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Format</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="type" className="block text-lg font-medium">Type :</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Tailles</label>
          <div>
            <label className="block text-teal-600 font-semibold mb-1">Select tailles:</label>
            <select
              multiple
              value={selectedTailles}
              onChange={handleTailleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              {tailles.map((taille) => (
                <option key={taille._id} value={taille._id}>
                  {`${taille.width} x ${taille.height} ${taille.unit}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}