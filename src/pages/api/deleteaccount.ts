
import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { regSchema } from "@/utils/yupSchemas"
import { app, auth, firestore } from "@/firebase/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModelAtom";
import { Auth, createUserWithEmailAndPassword, getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { error } from "console";
import { useAuthState } from "react-firebase-hooks/auth";
import { adminAuth } from "@/firebase/firebase-admin-config";

/** 
* @swagger
/api/deleteaccount:
*   delete:
 *     summary: Delete the current user
 *     description: Delete user
 *     tags:
 *      - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: The id the user
 *     responses:
 *       200:
 *         description: Success
 *       204:
 *         description: User already deleted/does not exist

 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Something went wrong, please try again
 */

type Data = {
    success: boolean,
    error?: string;
  };



async function deletehandler(req: NextApiRequest, res:NextApiResponse){
    const uid = req.body
    if (req.method !== "DELETE"){
        return res.status(405).send({
            success:false,
            error: "HTTP method not valid, DELETE accepted."
        });
    }

    try {   
            adminAuth.deleteUser(uid)
            const userRef = doc(firestore,"users",uid)
            await deleteDoc(userRef).catch((error) => {
                return res.status(204).send("Già eliminato")
            });
            
            return res.status(200).send({success:true});
       
        
            
            
    }catch (error) {
        console.log("Internal error")
        return res.status(500).send((error as Error).message);
    
    }
}

export default deletehandler;