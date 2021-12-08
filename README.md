# **MERN-Redux-Template: The ultimate starter pack (inProgress)**

Start your project now with this MERN stack Starter Pack

Where your dev environment for MERN with redux is all set up and also includes React templates built with MUI and all the Basic REST api and of course authentication.

## Features Include:

* Backend
  * `Roles`: Admin and User.
  * `Authentication`: JWT-Passport.
  * `User APIs:` 
    * login, register, updateProfile, updatePassword.
    * email-validation: sends email to user to validate email
    * password-reset: sends email to user to reset password
  * `Admin APIs`: CRUD users.
* Frontend
  * `Redux`: actions, reducers, store already set-up and hooked up to all components.
  * `Routes`: setup dynamic routing using react-router-dom v.6
  * `MUI templates`:
    * Header, Footer, Login, Register
    * Can easily customize or add components
  * `Email Templates`:
    *  Password Reset template
    *  Email Confrimation Template
  
In Summary, just download and start whatever great idea you have going on. 

<br/>
<br/>

# **Getting Started**

## **ES Modules**

The backend is using ECMAScript, be sure to have at least `node v14.6+`.

Also **IMPORTANT** note, to import FILES in the backend be sure to add `.js` or you will get at `"module not found"` error. Again, importing FILES (not packages).

<br/>

## **Env Variables**

* Go to `./backend/config`
* Rename `config.env.env` file to `.env`
* Then fill add appropriate values to the variables
* NOTE: READ the comments please.

<br/>

## **Installing (client and server) dependencies**

```bash
npm install
cd client
npm install

#thats it, Easy peasy
```
<br/>

## **Run app**

```bash
#Run both Frontend and Server
npm run dev

#Run Server ONLY
npm run server

#Run Frontend ONLY
npm run client

#NOW you can start Creating your Masterpiece!!!
```

<br/>

## **Seed Database(OPTIONAL)**

You can create your own mock data by adding your mock data files at `./backend/seeder/mockData`

and add import those files in the `backend/seeder/seeder.js`, just look at what I did and copy it.

```bash
#Adds mock data to your DB
npm run seed

#Deletes all data from database
npm run seed-destroy

#THIS is a game changer, I recommend you using this.
#It makes the work so much easier when all mock data can be easily imported and destroyed with just one command.....
```
<br/>
<br/>

# **REST APIs**
> NOTE: More Detailed api docs can be found [here](https://documenter.getpostman.com/view/13697710/UVJkACww)

<br/>

## **User Auth**

```javascript

register = {
    desc: "Adds new user to DB, sends Confirmation email to validate user's email",
    route: "POST /v1/api/users/register",
    access: "PUBLIC"
}

login = {
    desc: "Access user data from DB",
    route: "POST /v1/api/users/login",
    access: "Public"
}

deleteUser = {
    desc: "Delete user from database",
    route: "DELETE /v1/api/users/delete-user",
    access: "Private"
}

updateProfile = {
    desc: "Update user profile",
    route: "PUT /v1/api/users/update-profile",
    access: "Private"
}

updatePassword = {
    desc: "Change user password",
    route: "PUT /v1/api/users/update-password",
    access: "Private"
}

sendVerificationEmail = {
    desc: "If user hasn't received confirmation email when registered, user can ask for another confirmation..",
    route: "GET /v1/api/users/send-verification-email",
    access: "Private"
}

verifyEmail = {
    desc: "User Clicked the link sent. ",
    route: "POST /v1/api/users/verify-email-success",
    access: "Private"
}

forgotPassword = {
    desc: "Reset password requested",
    route: "GET /v1/api/users/forgot-password",
    access: "Public"
}

resetPassword = {
    desc: "Reset password",
    route: "POST /v1/api/users/reset-password",
    access: "Private"
}

```

## **Admin Apis**

```javascript

getAllUsers = {
    desc: "Get all users from DB",
    route: "GET /v1/api/admin/get-all-users",
    access: "Private/Admin"
}

getUserById = {
    desc: "Get single user using ID",
    route: "GET /v1/api/admin/user/:id",
    access: "Private/Admin"
}

updateUserById = {
    desc: "Can update all users info using ID",
    route: "PUT /v1/api/admin/user/:id",
    access: "Private/Admin"
}

deleteUserById = {
    desc: "Delete a single user by ID",
    route: "DELETE /v1/api/admin/user/:id",
    access: "Private/Admin"
}
```

<br/>
<br/>


# **The Stack Used**

## **FrontEnd:**

> `Note: The full list of dependencies for frontend can be found` [here](./client/package.json)

* ### **Built with:**
  * [REACT](https://reactjs.org/) - front-end SPA Framework
  * [Redux](https://redux.js.org/) - state management tool, which allows us to have a global state.

* ### **Dependencies:**
  * [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - Redux middleware, to handle asynchronous actions .
  * [Material UI](https://mui.com/) - Front end framework that follows material design principles.
  * [React-router-dom](https://reactrouter.com/) - Enables us to implement dynamic and customizable routing.
  * [axios](https://www.npmjs.com/package/axios) - Used for sending async HTTP requests to our REST endpoints
  
* ### **Development-dependencies:**
  * []()
  * []()
  * []()



## **Backend:**

> `Note: The full list of dependencies for backend can be found` [here](package.json)

* ### **Built with:**
  * [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/) - Run time Environment to run our Server.
  * [express.js](https://expressjs.com/) - Framework to build REST apis.
  * [Mongo DB](https://www.mongodb.com/) - NoSQL Database.
* ### **Dependencies:**
  * [mongoose](https://www.npmjs.com/package/mongoose) - Makes creation and management of MongoDB much easier.
  * [passport](http://www.passportjs.org/) - Authentication middleware used to secure RESTful endpoints.
  * [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) - Passport strategy to authenticate using JSON web tokens.
  * [nodemailer](https://nodemailer.com/about/) - Used to allow easily send email to users.
  
* ### **Development-dependencies:**
  * [nodemon](https://www.npmjs.com/package/nodemon) - Tool that automatically restarts node.js server when file changes.
  * [concurrently](https://www.npmjs.com/package/concurrently) - Run multiple commands concurrently using just one npm command, in our case, we are using it to run frontend and backend at the same time with just the `"npm run dev"` command. 

<br/>
<br/>


# **License**

The MIT License

Copyright (c) 2021 `EARL BALAGEO`

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.