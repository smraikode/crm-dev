
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
// import { apiEndpoints } from "../../services/apiConfig";

// const MyTimeline = () => {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [error, setError] = useState("");
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const intervalRef = useRef(null);
//   const navigate = useNavigate();

//   // ?? Validate login on load and get initial location (for map)
//   useEffect(() => {
//     const isValid = checkUserValid();
//     if (!isValid) {
//       navigate("/login");
//       return;
//     }

//     // ?? Get current location for display
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (err) => {
//         setError("Location access denied. Please enable location.");
//         console.error("? Geolocation error:", err);
//       }
//     );

//     // ?? Clear interval on unmount
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [navigate]);

//   // ? API call to backend with current coordinates and status
//   const sendLocationToBackend = (coords, status) => {
//     const token = localStorage.getItem("token");
//     console.log("?? Sending to backend:", coords, status);

//     axios
//       .post(
//         apiEndpoints.mytimeline,
//         { ...coords, status }, // Payload includes latitude, longitude, and status
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(`? ${status} location sent:`, res.data);
//       })
//       .catch((err) => {
//         console.error(`? Failed to send ${status} location:`, err);
//       });
//   };

//   // ? Get current location and send it with desired status (clockin/clockout/updated)
//   const fetchAndSendLocation = (status = "clockin-updated") => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const coords = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         };
//         setLocation(coords);
//         sendLocationToBackend(coords, status);
//       },
//       (err) => {
//         setError("Location access denied. Please enable location.");
//         console.error("? Geolocation error:", err);
//       }
//     );
//   };

//   // ? Clock In Logic
//   const handleClockIn = () => {
//     console.log("?? Clock In Clicked");
//     setIsClockedIn(true);
//     fetchAndSendLocation("clockin");

//     // ?? Start sending updated location every 1 minute
//     intervalRef.current = setInterval(() => {
//       console.log("?? Sending periodic location update");
//       fetchAndSendLocation("clockin-updated");
//     }, 60000);
//   };

//   // ? Clock Out Logic
//   const handleClockOut = () => {
//     console.log("?? Clock Out Clicked");
//     setIsClockedIn(false);
//     fetchAndSendLocation("clockout");

//     // ?? Stop sending periodic updates
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
//       <h1 className="text-2xl font-bold text-orange-400">MyTimeLine</h1>
//       <p className="text-sm text-gray-500">Track your attendance timeline</p>

//       {error && <p className="text-red-500">{error}</p>}

//       {/* ?? Display current coordinates */}
//       <div className="mb-2">
//         <strong>Latitude:</strong> {location.latitude ?? "N/A"} <br />
//         <strong>Longitude:</strong> {location.longitude ?? "N/A"}
//       </div>

//       {/* ? Clock In / Out Buttons */}
//       <div className="space-x-4 mb-4">
//         <button
//           onClick={handleClockIn}
//           disabled={isClockedIn}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//         >
//           Clock In
//         </button>
//         <button
//           onClick={handleClockOut}
//           disabled={!isClockedIn}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//         >
//           Clock Out
//         </button>
//       </div>

//       {/* ?? Embed Google Map */}
//       {location.latitude && location.longitude ? (
//         <iframe
//           title="Google Map"
//           width="100%"
//           height="400"
//           className="rounded-xl shadow"
//           frameBorder="0"
//           style={{ border: 0 }}
//           referrerPolicy="no-referrer-when-downgrade"
//           src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
//           allowFullScreen
//         ></iframe>
//       ) : (
//         <p>Fetching your location...</p>
//       )}

//       {/* ?? Debug only: display endpoint */}
//       {/* <p className="text-xs text-gray-400">Endpoint: {apiEndpoints.mytimeline}</p> */}
//     </div>
//   );
// };

// export default MyTimeline;


import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { apiEndpoints } from "../../services/apiConfig";

// 🏗️ Fixed construction site location
const siteLocation = {
  latitude: 17.4221891,
  longitude: 78.3819498,
};

// 📏 Haversine formula to calculate distance in meters
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MyTimeline = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [distance, setDistance] = useState(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // ✅ API Call to backend with coordinates and status
  const sendLocationToBackend = useCallback(async (coords, status) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ No token found.");
      return;
    }

    const payload = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      status,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(apiEndpoints.mytimeline, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`📡 Sent [${status}] to backend`, payload);
    } catch (err) {
      console.error("❌ Failed to send location:", err);
    }
  }, []);

  // ✅ Fetch current location, calculate distance, optionally send
  const fetchAndSetLocation = useCallback(
    (status = null) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(coords);

          const dist = getDistanceFromLatLonInMeters(
            coords.latitude,
            coords.longitude,
            siteLocation.latitude,
            siteLocation.longitude
          );

          setDistance(Math.round(dist));

          if (status) {
            await sendLocationToBackend(coords, status);
          }
        },
        (err) => {
          setError("Location access denied. Please enable location.");
          console.error("❌ Geolocation error:", err);
        }
      );
    },
    [sendLocationToBackend]
  );

  // ✅ Validate and fetch location on mount
  useEffect(() => {
    const isValid = checkUserValid();
    if (!isValid) {
      navigate("/login");
      return;
    }

    fetchAndSetLocation();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [navigate, fetchAndSetLocation]);

  // ✅ Clock In logic with periodic update and auto clock-out
  const handleClockIn = async () => {
    if (distance !== null && distance <= 1500) {
      setIsClockedIn(true);
      await sendLocationToBackend(location, "clockin");

      intervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(coords);

          const dist = getDistanceFromLatLonInMeters(
            coords.latitude,
            coords.longitude,
            siteLocation.latitude,
            siteLocation.longitude
          );

          setDistance(Math.round(dist));

          if (dist > 1500) {
            setIsClockedIn(false);
            await sendLocationToBackend(coords, "auto-clockout");
            clearInterval(intervalRef.current);
            alert("⚠️ Auto clock-out: You moved away from the site.");
          } else {
            await sendLocationToBackend(coords, "update");
          }
        });
      }, 900000); // Every 15 min
    } else {
      alert(`❌ You are ${distance} meters away from the site. Must be within 1000m.`);
    }
  };

  // ✅ Clock Out
  const handleClockOut = async () => {
    setIsClockedIn(false);
    await sendLocationToBackend(location, "clockout");

    if (intervalRef.current) clearInterval(intervalRef.current);

    alert("📤 You have successfully clocked out.");
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">MyTimeLine</h1>
      <p className="text-sm text-gray-500">Track your attendance timeline</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-2">
        <strong>Latitude:</strong> {location.latitude ?? "N/A"} <br />
        <strong>Longitude:</strong> {location.longitude ?? "N/A"} <br />
        {distance !== null && (
          <p>📏 Distance from site: {distance} meters</p>
        )}
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={handleClockIn}
          disabled={isClockedIn}
          className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!isClockedIn}
          className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Clock Out
        </button>
      </div>

      {location.latitude && location.longitude ? (
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
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default MyTimeline;
