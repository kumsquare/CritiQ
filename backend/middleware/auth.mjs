import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
   // ✅ Debugging: Log request headers
   console.log("Request Headers:", req.headers);
   
  const token = req.header('Authorization'); // Ensure correct capitalization
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const jwtToken = tokenParts[1]; // Extract token
    const verified = jwt.verify(jwtToken, "jon"); // Verify using the correct key
    req.user = verified;  // Store user details in `req.user`

    console.log("Decoded Token Data:", verified); // Debugging log

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
