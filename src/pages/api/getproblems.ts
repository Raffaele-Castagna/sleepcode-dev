import { firestore } from "@/firebase/firebase";
import { adminAuth, adminFirestore } from "@/firebase/firebase-admin-config";
import { DBproblem } from "@/utils/problems/GenericProblem/genericProblem";
import { Firestore } from "firebase-admin/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const admin = require('firebase-admin');

/**
 * @swagger
 * /api/getproblems:
 *   get:
 *     summary: Gets all the currently available problems
 *     description: Gets all the currently available problems
 *     tags:
 *     - problems
 *     responses:
 *       200:
 *         description: Operation completed successfully
 *       405:
 *         description: HTTP method not valid, GET accepted.
 *       500:
 *         description: Something went wrong, please try again
 */

type Data = {
  success: boolean;
  error?: string;
};

async function getproblemshandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).send({
      success: false,
      error: "HTTP method not valid, GET accepted.",
    });
  }

  try {
  
    const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q)
    const tmp: DBproblem[] = [];
    querySnapshot.forEach((doc) => {
      tmp.push({...doc.data() } as DBproblem);
    });
    return res.status(200).json(tmp);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
}

export default getproblemshandler;
