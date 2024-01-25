import deletehandler from "../src/pages/api/deleteaccount"
import { createMocks } from "node-mocks-http";
import "@testing-library/jest-dom";
const path = require("path")
require('dotenv').config({path: path.resolve("__test__/.env.local")})

describe("/api/changepassword test", () => {
  test("Should return 200, Operation Completed", async () => {

    const uid = "12345678USER"
    const {req,res} = createMocks({
      method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: uid
    })
    await deletehandler(req,res);

    expect(res._getStatusCode()).toBe(200)
  });

  test("Should return 405, HTTP method not valid, DELETE accepted.", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await deletehandler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });


  test("Should return 500, Firebase cannot use UserID", async () => {
    const uid = ""
    const {req,res} = createMocks({
      method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: uid
    })
    await deletehandler(req,res);

    expect(res._getStatusCode()).toBe(500)
  });

  }
        
)