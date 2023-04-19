// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// "https://portfolio-fs-app.herokuapp.com/user_authorization"
import {
  withApiAuthRequired,
  getSession,
  getAccessToken,
} from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
  try {
    const session = await getSession(req, res);
    const token = await getAccessToken(req, res);
    const user = session.user;
    const apiRecord =  user[
      "https://portfolio-fs-app.herokuapp.com/user_authorization"
    ]
    const apiPerms = apiRecord.permissions;
    // console.log("session", session);
    // console.log("token", token);
    console.log(apiPerms);
    console.log("user", apiPerms.includes("access:the:special"));
    if (
      !user[
        "http://auth0-training-app-api/rbac/user_authorization"
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
