import Car from "../models/car.model.js";

const getCars = async (req, res, isAdmin) => {
  //   // Does not work locally but will on Vercel
  //   res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  console.log("req.user", req.user);
  const query = {};

  if (!isAdmin) {
    query.owner = req.user.sub;
  } else {
    console.log("in admin mode");
  }

  try {
    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addCar = async (req, res, isAdmin) => {
  const carData = { ...req.body };

  // Admin would send a users sub when creating on behalf of a user and that would be part of the request body, so would happen in the line above.
  if (!isAdmin) {
    carData.owner = req.user.sub;
  }
  if (carData.avatar_url === "") {
    delete carData.avatar_url;
  }
  console.info(carData);
  try {
    const newCar = new Car(carData);
    const result = await newCar.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateCar = async (req, res, isAdmin) => {
  const query = { _id: req.params.id };
  const { owner, ...updates } = req.body;
  if (!isAdmin) {
    query.owner = req.user.sub;
  } else {
    query.owner = owner;
  }
  try {
    const result = await Car.updateOne(query, updates);
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeCar = async (req, res, isAdmin) => {
  const query = {
    _id: req.query.id,
  };

  if (!isAdmin) {
    query.owner = req.user.sub;
  }

  try {
    const result = await Car.deleteOne(query);
    if (result.n === 0) return res.sendStatus(404);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getCars, addCar, updateCar, removeCar };
