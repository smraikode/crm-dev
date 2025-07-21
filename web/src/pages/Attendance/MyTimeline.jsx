
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
// import { apiEndpoints } from "../../services/apiConfig";

// const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
//   const toRad = (val) => (val * Math.PI) / 180;
//   const R = 6371000;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const MyTimeline = () => {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [error, setError] = useState("");
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [distance, setDistance] = useState(null);
//   const [siteLocation, setSiteLocation] = useState(null);
//   const intervalRef = useRef(null);
//   const navigate = useNavigate();

//   // 🔁 Office location fetch
//   const fetchSiteLocation = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const response = await axios.get(apiEndpoints.getOfficeLocations, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const office = response.data.office_details;
//       console.log("🏢 Office location received:", office);
//       console.log("latitude:", office.latitude, "longitude", office.longitude);

//       if (office?.latitude && office?.longitude) {
//         setSiteLocation({
//           latitude: office.latitude,
//           longitude: office.longitude,
//         });
//       } else {
//         setError("⚠️ Invalid office location received.");
//         toast.error("⚠️ Invalid office location received.");

//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch office location:", err);
//       setError("Failed to fetch site location.");
//       toast.error("❌ No Site Assigned. Contact Admin.");

//     }
//   };

//   // 📡 Send location to backend
//   const sendLocationToBackend = useCallback(async (coords, status) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const payload = {
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//       status,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       await axios.post(apiEndpoints.mytimeline, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(`📡 Sent [${status}] to backend`, payload);
//     } catch (err) {
//       console.error("❌ Failed to send location:", err);
//       toast.error("❌ Failed to send location.");

//     }
//   }, []);

//   // 📍 Get current location
//   const fetchAndSetLocation = useCallback(
//     (status = null) => {
//       if (!navigator.geolocation) {
//         setError("Geolocation is not supported by your browser.");
//         toast.error("Geolocation not supported.");

//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const coords = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };

//           setLocation(coords);

//           if (siteLocation) {
//             const dist = getDistanceFromLatLonInMeters(
//               coords.latitude,
//               coords.longitude,
//               siteLocation.latitude,
//               siteLocation.longitude
//             );

//             setDistance(Math.round(dist));

//             if (status) {
//               await sendLocationToBackend(coords, status);
//             }
//           }
//         },
//         (err) => {
//           setError("❌ Location access denied. Please enable location.");
//           toast.error("❌ Please enable location permission.");

//           console.error("Geolocation error:", err);
//         },
//         { enableHighAccuracy: true }
//       );
//     },
//     [siteLocation, sendLocationToBackend]
//   );

//   // 🔐 Validate + fetch site + current location
//   useEffect(() => {
//     const isValid = checkUserValid();
//     if (!isValid) {
//       navigate("/login");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       () => { },
//       () => { }
//     );
//     fetchSiteLocation();
//     fetchAndSetLocation();
//   }, [navigate]);

//   useEffect(() => {
//     if (siteLocation) {
//       fetchAndSetLocation();
//     }
//   }, [siteLocation, fetchAndSetLocation]);

//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);

//   // 🕒 Clock In
//   const handleClockIn = async () => {
//     if (!siteLocation) {
//       toast.error("❌ Site location not loaded.");

//       return;
//     }

//     if (distance !== null && distance <= 1500) {
//       setIsClockedIn(true);
//       await sendLocationToBackend(location, "clockin");
//       toast.success("✅ Clocked in successfully.");


//       intervalRef.current = setInterval(() => {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const coords = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };

//           setLocation(coords);

//           const dist = getDistanceFromLatLonInMeters(
//             coords.latitude,
//             coords.longitude,
//             siteLocation.latitude,
//             siteLocation.longitude
//           );

//           setDistance(Math.round(dist));

//           if (dist > 1500) {
//             setIsClockedIn(false);
//             await sendLocationToBackend(coords, "auto-clockout");
//             clearInterval(intervalRef.current);
//             toast.warn("⚠️ Auto clock-out: You moved away from the site.");

//           } else {
//             await sendLocationToBackend(coords, "update");
//           }
//         });
//       }, 60000); // 15 min
//     } else {
//       toast.error(`❌ Too far from site. You are ${distance}m away (must be within 1500m).`);

//     }
//   };

//   // 🕓 Clock Out
//   const handleClockOut = async () => {
//     setIsClockedIn(false);
//     await sendLocationToBackend(location, "clockout");
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     alert("📤 You have successfully clocked out.");
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
//       <h1 className="text-2xl font-bold text-orange-400">MyTimeLine</h1>
//       <p className="text-sm text-gray-500">Track your attendance timeline</p>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="mb-2">
//         <strong>Latitude:</strong> {location.latitude ?? "N/A"} <br />
//         <strong>Longitude:</strong> {location.longitude ?? "N/A"} <br />
//         {distance !== null && <p>📏 Distance from site: {distance} meters</p>}
//       </div>

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

//       {location.latitude && location.longitude ? (
//         <iframe
//           title="Google Map"
//           width="100%"
//           height="400"
//           className="rounded-xl shadow"
//           loading="lazy"
//           frameBorder="0"
//           style={{ border: 0 }}
//           referrerPolicy="no-referrer-when-downgrade"
//           src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
//           allowFullScreen
//         ></iframe>
//       ) : (
//         <p>📍 Fetching your location...</p>
//       )}
//     </div>
//   );
// };

// export default MyTimeline;



import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { apiEndpoints } from "../../services/apiConfig";

const MyTimeline = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Send location to backend
  const sendLocationToBackend = useCallback(async (coords, status) => {
    const token = localStorage.getItem("token");
    if (!token) return;

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
      toast.error("❌ Failed to send location.");
    }
  }, []);

  // ✅ Fetch location without sending
  const fetchOnlyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => {
        setError("❌ Location access denied.");
        toast.error("❌ Please enable location.");
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // ✅ Fetch & send location
  const fetchLocationAndSend = useCallback(
    (status = "update") => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        toast.error("Geolocation not supported.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(coords);
          await sendLocationToBackend(coords, status);
        },
        (err) => {
          setError("❌ Location access denied.");
          toast.error("❌ Please enable location.");
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true }
      );
    },
    [sendLocationToBackend]
  );

  // 🔐 Check user
  useEffect(() => {
    const isValid = checkUserValid();
    if (!isValid) {
      navigate("/login");
      return;
    }

    fetchOnlyLocation(); // ❌ Just fetch — don’t send to backend
  }, [navigate, fetchOnlyLocation]);

  // 🕒 Clock In
  const handleClockIn = async () => {
    setIsClockedIn(true);
    fetchLocationAndSend("clockin");

    // Start interval every 1 min (60000ms)
    intervalRef.current = setInterval(() => {
      fetchLocationAndSend("update");
    }, 60000);

    toast.success("✅ Clocked in successfully.");
  };

  // 🕓 Clock Out
  const handleClockOut = async () => {
    setIsClockedIn(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    await fetchLocationAndSend("clockout");
    toast.info("📤 You have successfully clocked out.");
  };

  // 🧹 Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">MyTimeLine</h1>
      <p className="text-sm text-gray-500">Track your attendance timeline</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-2">
        <strong>Latitude:</strong> {location.latitude ?? "N/A"} <br />
        <strong>Longitude:</strong> {location.longitude ?? "N/A"} <br />
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
          loading="lazy"
          frameBorder="0"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
          allowFullScreen
        ></iframe>
      ) : (
        <p>📍 Fetching your location...</p>
      )}
    </div>
  );
};

export default MyTimeline;
