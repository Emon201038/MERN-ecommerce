const jwt = require("jsonwebtoken");

const createJSONWebToken = (payload, secretkey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }
  if (typeof secretkey !== "string" || secretkey === "") {
    throw new Error("secretkey must be a non-empty string");
  }
  try {
    const token = jwt.sign(payload, secretkey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Failed to create JSON Web Token", error);
  }
};

module.exports = { createJSONWebToken };
