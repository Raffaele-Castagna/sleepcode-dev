import { authModalState } from '@/atoms/authModelAtom';
import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

type RegistrProps = {
    
};

const Registr:React.FC<RegistrProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = (type:"login" | "register" | "forgotPassword") => {
        setAuthModalState((prev: any) => ({ ...prev, type}))
    };

    const [inputs,setInputs] = useState({email:"",displayName:"",password:"",confirmpassword:""})
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    }

    const router = useRouter();

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (inputs.password != inputs.confirmpassword) { (alert("Password diverse"))
                                                             return;}
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            if (!newUser) return;
            router.push('/')
        }catch (error:any){
            alert(error.message)
        }

    };

    useEffect(() => {
        if (error) alert(error.message);
    },[error])

    return (<form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
    <h3 className="text-x1 font-medium text-white"> Registrati </h3>
    <div>
        <label htmlFor='email' className="text-sm font-medium block mb-2 text-gray-300">
        Email
        </label>
        <input onChange={handleChangeInput} type="email" name="email" id="UEmail"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
    </div>
    
    <div>
        <label htmlFor='displayName' className="text-sm font-medium block mb-2 text-gray-300">
        Username
        </label>
        <input onChange={handleChangeInput} type="displayName" name="displayName" id="displayName"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
    </div>

    <div>
        <label htmlFor='password' className="text-sm font-medium block mb-2 text-gray-300">
        Password
        </label>
        <input onChange={handleChangeInput} type="password" name="password" id="UPassword"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
    </div>

    <div>
        <label htmlFor='confirmpassword' className="text-sm font-medium block mb-2 text-gray-300">
        Conferma Password
        </label>
        <input onChange={handleChangeInput} type="password" name="confirmpassword" id="UCPassword"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
    </div>

    <button type='submit' value='submit' className="w-full text-white focus:ring-blue-300 font-medium rounder-lg text-sm px5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s rounded">
        {loading ? "Registrando..." : "Registrati"}</button>
    
    
    <button>
        <div className="text-sm font-medium text-gray-500"> Hai già un account? <a href="#" className="text-blue-700 hover:underline"> Login</a></div>

    </button>
    
    </form>
    )
}
export default Registr;