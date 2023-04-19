// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// "https://portfolio-fs-app.herokuapp.com/user_authorization"
import {
  withApiAuthRequired,
  getSession,
  getAccessToken,
} from "@auth0/nextjs-auth0";

const API_IDENTIFIER = "http://auth0-training-app-api/rbac/user_authorization"

const handler = async (req, res) => {
  try {
    const session = await getSession(req, res);
    const user = session.user;

    if (
      !user[
        API_IDENTIFIER
      ]?.permissions?.includes?.("access:the:special")
    ) {
      return res.status(401).json({ message: `You ain't got the skilzz` });
    }
    res
      .status(200)
      .json({
        message: `You got dem skillz, fam! Mad props! RUUUUSPEC'! Brrrrap, etc.`,
      });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default handler;
