import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { apiEndpoints } from "../../services/apiConfig";

const MyTimeline = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const intervalRef = useRef(null); // to hold interval ID

  // Send coordinates to backend
  const sendLocationToBackend = (coords) => {
    axios
      .post(apiEndpoints.mytimeline, coords, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("✅ Location sent:", res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to send location:", err);
      });
  };

  // Get current position and send to backend
  const fetchAndSendLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coords); // update state for UI
        sendLocationToBackend(coords); // send to backend
      },
      (err) => {
        setError("Location access denied. Please enable location.");
        console.error("❌ Geolocation error:", err);
      }
    );
  };

  useEffect(() => {
    // Check user validity
    const isValid = checkUserValid();
    if (!isValid) {
      navigate("/login");
      return;
    }

    // Send location immediately once
    fetchAndSendLocation();

    // Set interval to send location every 15 minutes
    intervalRef.current = setInterval(() => {
      console.log("🔁 Interval fired");
      fetchAndSendLocation();
    }, 900000); // 900,000 ms = 15 minutes

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [navigate]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">MyTimeLine</h1>
      <p className="text-sm text-gray-500">This is your current time:</p>

      {error && <p className="text-red-500">{error}</p>}

      {location.latitude && location.longitude ? (
        <>
          <div className="mb-2">
            <strong>Latitude:</strong> {location.latitude} <br />
            <strong>Longitude:</strong> {location.longitude}
          </div>

          <iframe
            title="Google Map"
            width="100%"
            height="400"
            className="rounded-xl shadow"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default MyTimeline;
