import changepwhandler from "../src/pages/api/changepassword"
import { createMocks } from "node-mocks-http";
import "@testing-library/jest-dom";
const path = require("path")
require('dotenv').config({path: path.resolve("__test__/.env.local")})

describe("/api/changepassword test", () => {
  test("Should return 200, Operation Completed", async () => {
    const uid = "1"
    const password = "PasswordDiProva1234!"
    const {req,res} = createMocks({
      method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: {uid,password}
    })
    await changepwhandler(req,res);

    expect(res._getStatusCode()).toBe(200)
  });

  test("Should return 405, HTTP method not valid, PATCH accepted.", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await changepwhandler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });


  test("Should return 401, Ivalid Password", async () => {
    const uid = "1"
    const password = "Password Sbagliata!"
    const {req,res} = createMocks({
      method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: {uid,password}
    })
    await changepwhandler(req,res);

    expect(res._getStatusCode()).toBe(401)
  });

  }
        
)
    