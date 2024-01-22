
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



async function changepwhandler(req: NextApiRequest, res:NextApiResponse){
    if (req.method !== "POST"){
        return res.status(405).send({
            success:false,
            error: "HTTP method not valid, POST accepted."
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
            return res.status(500).send(error.message);
        })
            return res.status(200).send({success:true});
    }catch (error) {
        if ((error as Error).message == "auth/id-token-expired") return res.status(401).send("Perfavore Reloggati");
        return res.status(500).send((error as Error).message);
    
    }

}

export default changepwhandler;