import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

// 5:29:14
// Here I am ensuring that the user is authenticated
const AuthUser = async (req) => {

  // 5:32:06
  // The token looks like the following comment
  // Bearer eyJhbciOiJIUzI1NiTs
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {

    // The "default_secret_key" is written in the api/login/route.js file
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");

    if (extractAuthUserInfo) {
      return extractAuthUserInfo;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;
