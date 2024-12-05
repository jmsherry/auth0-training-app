// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  withApiAuthRequired,
  getSession,
  getAccessToken,
} from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
  try {
    const session = await getSession(req, res);
    const token = await getAccessToken(req, res); // These throw if not Auth'd
    const user = session.user;
    console.log("session", session);
    console.log("token", token);
    console.log("user", user);
    res.status(200).json({ message: "Welcome to our private data" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default handler;

// withApiAuthRequired(handler)
