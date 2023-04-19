import { inspect } from "node:util";
import {
  // withApiAuthRequired,
  getSession,
  // getAccessToken,
} from "@auth0/nextjs-auth0";
import nc from "next-connect";

import "../../../../lib/db";

import {
  updateCar,
  removeCar,
} from "@/lib/controllers/car.controller";

const API_IDENTIFIER = "http://auth0-training-app-api/rbac/user_authorization"

const handler = async (req, res) => {
  const isAdmin = user[
    API_IDENTIFIER
  ]?.permissions?.includes?.("access:the:special");

  if(!isAdmin) {
    return res.status(401).send('Unauthorised');
  }
  try {
    const session = await getSession(req, res);
    req.user = session.user;
    switch (req.method) {
      case "PUT":
        return updateCar(req, res, true);
      case "DELETE":
        return removeCar(req, res, true);
      default:
        res.status(400).json({
          message: `Method ${req.method} not supported for ${new URL(req.url).pathname}`
        });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message,
    })
  }

}

export default handler;
