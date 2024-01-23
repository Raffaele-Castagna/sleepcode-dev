import { firestore } from "@/firebase/firebase";
import { DBproblem } from "@/utils/problems/GenericProblem/genericProblem";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

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
    const querySnapshot = await getDocs(q);
    const tmp: DBproblem[] = [];
    querySnapshot.forEach((doc) => {
      tmp.push({ id: doc.id, ...doc.data() } as DBproblem);
    });
    return res.status(200).json(tmp);
  } catch (error) {
    console.log("Internal error");
    return res.status(500).send((error as Error).message);
  }
}

export default getproblemshandler;
