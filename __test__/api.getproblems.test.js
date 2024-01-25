import getproblemshandler from "../src/pages/api/getproblems"
import { createMocks } from "node-mocks-http";
import "@testing-library/jest-dom";

const admin = require('firebase-admin')
jest.mock('firebase/auth');
jest.mock('firebase-admin/auth')
describe("/api/getproblems test", () => {
    test("Should return list of problems", async () => {
       // const mockSnapshot = { data: () => ({id:1,title: "hello",category: "hello",difficulty: "hard",likes:1,order:1})}
       // admin.firestore().collection('problems').doc('two-sum').get.mockResolvedValue(mockSnapshot)
        const {req, res} = createMocks({
            method: "GET",
        });
        
        await getproblemshandler(req,res);


        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
    })
    test("Should return 405, HTTP method not valid, GET accepted.", async () => {
        const { req, res } = createMocks({
          method: "POST",
        });
    
        await getproblemshandler(req, res);
    
        expect(res._getStatusCode()).toBe(405);
      });
    });
