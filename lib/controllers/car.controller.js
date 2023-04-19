import Car from "../models/car.model.js";

const getCars = async (req, res) => {
  //   // Does not work locally but will on Vercel
  //   res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
  console.log("req.user", req.user);
  let query = {
    owner: req.user.sub,
  };

  try {
    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addCar = async (req, res) => {
  const carData = { ...req.body, owner: req.user.sub };
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

const updateCar = async (req, res) => {
  try {
    const result = await Car.updateOne(
      { _id: req.params.id, owner: req.user.sub },
      req.body
    );
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeCar = async (req, res) => {
  try {
    const result = await Car.deleteOne({
      _id: req.query.id,
      owner: req.user.sub,
    });
    if (result.n === 0) return res.sendStatus(404);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getCars, addCar, updateCar, removeCar };
