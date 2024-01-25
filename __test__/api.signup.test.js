import signupHandler from "../src/pages/api/signup"
import { createMocks } from "node-mocks-http";
import "@testing-library/jest-dom";
const path = require("path")
require('dotenv').config({path: path.resolve("__test__/.env.local")})

describe("/api/changepassword test", () => {
  test("Should return 200, Operation Completed", async () => {
    //console.log("Firebase project id:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  //  console.log("THis is the path: ",path.resolve("__test__/.env.local"))
  const email = "emailDiProva@gmail.com"
  const username = "UsernamediProva"
  const password = "PasswordDiProva1234!"

    const {req,res} = createMocks({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {email,username,password}
    })
    await signupHandler(req,res);

    expect(res._getStatusCode()).toBe(200)
  });

  test("Should return 400, Invalid Password.", async () => {
    const email = "emailDiProva@gmail.com"
    const username = "UsernamediProva"
    const password = "PasswordSbagliata"
    const { req, res } = createMocks({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {email,username,password}
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });


  test("Should return 400, Ivalid Username", async () => {
    const email = "emailDiProva@gmail.com"
    const username = "Err"
    const password = "PasswordDiProva1234!"
    const {req,res} = createMocks({
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {email,username,password}
    })
    await signupHandler(req,res);

    expect(res._getStatusCode()).toBe(400)
  });

  test("Should return 405, HTTP Method not valid,POST Accepted", async () => {
    const email = "emailDiProva@gmail.com"
    const username = "UsernameDiProva"
    const password = "PasswordDiProva1234!"
    const {req,res} = createMocks({
      method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: {email,username,password}
    })
    await signupHandler(req,res);

    expect(res._getStatusCode()).toBe(405)
  });

  }

        
)