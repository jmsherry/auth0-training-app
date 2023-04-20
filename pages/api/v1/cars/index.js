import { inspect } from "node:util";
import {
  // withApiAuthRequired,
  getSession,
  // getAccessToken,
} from "@auth0/nextjs-auth0";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";

import "../../../../lib/db";

import { getCars, addCar } from "@/lib/controllers/car.controller";

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
  .get((req, res) => {
    return getCars(req, res);
  })
  .post((req, res) => {
    return addCar(req, res);
  })

// const handler = async (req, res) => {
//   try {
//     const session = await getSession(req, res);
//     req.user = session.user;
//     switch (req.method) {
//       case "GET":
//         return getCars(req, res);
//       case "POST":
//         return addCar(req, res);
//       default:
//         res.status(400).json({
//           message: `Method ${req.method} not supported for ${new URL(req.url).pathname}`
//         });
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       message: err.message,
//     })
//   }

// }

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
