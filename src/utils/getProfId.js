const getProfessionalIdFromToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user); // Log the user object

  if (!user || !user.token) {
    return null;
  }

  const token = user.token;

  // Split the token into parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Invalid token structure");
    return null;
  }

  // Decode the payload (the second part)
  const payload = parts[1];

  // Decode the Base64Url encoded string
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  );

  console.log("Decoded Payload:", decodedPayload); // Log the entire decoded payload

  // Extract the customer ID
  const professionalId = decodedPayload._id; // Adjust based on your token's structure

  return professionalId; // Return the customer ID
};

export default getProfessionalIdFromToken;
