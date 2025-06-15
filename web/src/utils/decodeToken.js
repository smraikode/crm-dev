import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export default getDecodedToken;
