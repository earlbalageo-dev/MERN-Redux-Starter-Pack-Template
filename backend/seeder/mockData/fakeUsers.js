import bcrypt from "bcryptjs";

const fakeUsers = [
  {
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
    isAdmin: true,
  },
  {
    email: "earlbalageo@gmail.com",
    firstName: "Earl",
    lastName: "Balageo",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "earl@example.com",
    firstName: "Earl",
    lastName: "Balageo",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "john@example.com",
    firstName: "john",
    lastName: "doe",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "jane@example.com",
    firstName: "jane",
    lastName: "doe",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "will@example.com",
    firstName: "Will",
    lastName: "Smith",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "selena@example.com",
    firstName: "Selena",
    lastName: "Gomez",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "vanessa@example.com",
    firstName: "Vanessa",
    lastName: "Hudgens",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "justin@example.com",
    firstName: "Justin",
    lastName: "Bieber",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "emma@example.com",
    firstName: "Emma",
    lastName: "Stone",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "bruno@example.com",
    firstName: "Bruno",
    lastName: "Mars",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
  {
    email: "anna@example.com",
    firstName: "Anna",
    lastName: "Kendrick",
    password: bcrypt.hashSync("123456", 10),
    isEmailConfirm: true,
  },
];

export default fakeUsers;
