import connectDB from "../config/db.js";
import dotenv from "dotenv";
import User from "../models/UserModel.js";
import fakeUsers from "./mockData/fakeUsers.js";

dotenv.config({ path: "./backend/config/.env" });

connectDB();

// Delete all data first then Imports all mock data to DataBase
// Terminal command: npm run seed
const importData = async () => {
  try {
    //delete all data
    await User.deleteMany();
    //===> await <Model>.deleteMany();

    //Import all Mock-Data
    await User.insertMany(fakeUsers);
    //===> await <Model>.insertMany(<fakeData>);

    console.log("+++++ ALL MOCK-DATA HAS BEEN IMPORTED +++++");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Delete all data from DataBase
// Terminal command: npm run seed-destroy
const destroyData = async () => {
  try {
    //DELETE all Data
    await User.deleteMany();
    //===> await <Model>.deleteMany();

    console.log("***** All DATA Has Been Destroyed *****");

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
