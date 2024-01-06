import { auth } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type ModifyPwProps = {
    
};

const ModifyPw:React.FC<ModifyPwProps> = () => {
    const [inputs,setInputs] = useState({password:"",confirmpassword:""})
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    
        
    }
    const handlePwUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            toast.loading("Sto cambiando la tua password",{position:"top-center",toastId:"loading",theme:"dark"})
            if (inputs.password != inputs.confirmpassword) { toast.error("Password diverse!",{position:"top-center",toastId:"failure",theme:"dark"})
                                                             return;}
            const success = await updatePassword(inputs.password)
            console.log(success);
            if (success) {
                toast.success("Password Modificata!",{position:"top-center",toastId:"success",theme:"dark"})
            }
        }catch (error:any){
            toast.error("Impossibile Registrarti,controlla e riprova", { position: "top-center", autoClose:3000,  theme:"dark"});
        }finally {
            toast.dismiss("loading")
        }

        


    };
    useEffect(() => {
        if (error) toast.error(error.message,{position:"top-center",toastId:"error",theme:"dark"});
    },[error])
    return (
        <main>
            <p className='text-4xl text-center text-white dark:text-white font-medium uppercase mt-10 mb-5'> Modifica Password   </p>
        <form className="space-y-6 px-6 pb-4" onSubmit={handlePwUpdate}>
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
        {updating ? "Modificando..." : "Modifca Password"}</button>
        </form>
        </main>
    )


}
export default ModifyPw;