
import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { regSchema } from "@/utils/yupSchemas"
import { auth, firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModelAtom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";



type Data = {
    success: boolean,
    error?: string;
  };



async function signupHandler(req: NextApiRequest, res:NextApiResponse){
    const auth = getAuth()
    if (req.method !== "POST"){
        return res.status(405).send({
            success:false,
            error: "HTTP method not valid, POST accepted."
        });
    }
    const schema = Yup.object().shape({
        email: regSchema.email,
        username: regSchema.username,
        password: regSchema.password,
    });

    try {
        await schema.validate(req.body);
        const {email , username , password} = req.body;
        const newUser = await createUserWithEmailAndPassword(auth,email,password).catch((error) => {
            return res.status(409).send("Email già in utilizzo")
        })
            if (!newUser) return res.status(409).send({
                success:false,
                error: "Email già in utilizzo"
            });
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: username,
                createdAt:Date.now(),
                updatedAt:Date.now(),
                likedP:[],
                solvedProblems:[],
                role: "User"
            }
            await setDoc(doc(firestore,"users",newUser.user.uid),userData)
            return res.status(200).send({success:true});
    }catch (error) {
        return res.status(500).send((error as Error).message);
    
    }

}

export default signupHandler;