import { inspect } from "node:util";
import {
  // withApiAuthRequired,
  getSession,
  // getAccessToken,
} from "@auth0/nextjs-auth0";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";

import "../../../../lib/db";

import { updateCar, removeCar } from "@/lib/controllers/car.controller";

const router = createRouter();

router
  .use(expressWrapper(cors()))
  .use(async (req, res, next) => {
    try {
      const session = await getSession(req, res);
      req.user = session.user;
      return next();
    } catch (err) {
      res.status(500).end("MW error!");
    }
  })
  .put((req, res) => {
    return updateCar(req, res);
  })
  .delete((req, res) => {
    return deleteCar(req, res);
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
