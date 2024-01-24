
import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { regSchema, uSchema } from "@/utils/yupSchemas"
import { getAuth } from 'firebase-admin/auth';
import { firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModelAtom";
import { adminApp, adminAuth } from "@/firebase/firebase-admin-config";



type Data = {
    success: boolean,
    error?: string;
  };

/**
 * @swagger
 * /api/changepassword:
 *   patch:
 *     summary: Updates the password of the user
 *     description: updates the password of the user
 *     tags:
 *     - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: the Unquie ID associated with the user
 *               password:
 *                 type: string
 *                 description: The new password of the user
 *     responses:
 *       200:
 *         description: Operation completed successfully
 *       204:
 *         description: No matching uid (user does not exist)
 *       401:
 *         description: Invalid username and password combination
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: error updating password
 */

async function changepwhandler(req: NextApiRequest, res:NextApiResponse){
    if (req.method !== "PATCH"){
        return res.status(405).send({
            success:false,
            error: "HTTP method not valid, PATCH accepted."
        });
    }
    const schema = Yup.object().shape({
        uid : uSchema.uid,
        password: regSchema.password,
    });
    try {
        await schema.validate(req.body);
    }catch(error){
        return res.status(400).send((error as Error).message)
    }

    try {
        
        
        const {uid,password} = req.body;
        adminAuth.getUser(uid).catch((error) => {
            return res.status(204).send("Utente inesistente")
        })
        adminAuth.updateUser(uid,{
            password: password
        }).catch((error:any) => {
            return res.status(500).send("Errore del server, riprova");
        })
            return res.status(200).send({success:true});
    }catch (error) {
        if ((error as Error).message == "auth/id-token-expired") return res.status(401).send("Perfavore Reloggati");
        return res.status(500).send((error as Error).message);
    
    }

}

export default changepwhandler;