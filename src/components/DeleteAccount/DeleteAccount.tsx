import { authModalState } from '@/atoms/authModelAtom';
import { app, auth, firestore } from '@/firebase/firebase';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc, runTransaction, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState, useDeleteUser, useSignOut } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

type DeleteProgressProps = {
    
};




const DeleteProgress:React.FC<DeleteProgressProps> = () => {
    const auth = getAuth();
    const [inputs,setInputs] = useState({conferma:""})
    const [user] = useAuthState(auth)
    const [signOut,loading,error] = useSignOut(auth)

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    }
    const setAuthModal = useSetRecoilState(authModalState);
    const router = useRouter();
    const currentUser = auth.currentUser;

    
    const handleDelete = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (user) {
        try {
            toast.loading("Sto eliminando il tuo account",{position:"top-center",toastId:"loading",theme:"dark"})
            if (inputs.conferma != "CONFERMA") { toast.error("Scrivi CONFERMA tutto maiuscolo e senza spazi!",{position:"top-center",toastId:"failure",theme:"dark"})
                                                             return;}
            const res = await fetch("/api/deleteaccount", {
                method:"DELETE",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(user.uid)
            })
            if (res.status === 200) {
                // DEVE ESSERE FATTO CON LA SESSIONE CORRENTE PER LIMITAZIONE DI FIREBASE (DOVREI PAGARE
                // PER IL PIANO BLAZE PER OTTENERE IL PLUGIN CHE NON HA BISOGNO DELLA SESSIONE CLIENT)
                await auth.currentUser?.delete().catch((error) =>  {
                    toast.error("Non eliminato l'account proprio",{position:"top-center",toastId:"success",theme:"dark"})
                });
                toast.success("Account eliminato!",{position:"top-center",toastId:"success",theme:"dark"})
                setAuthModal((prev) => ({ ...prev,isOpen : false}))
                signOut();
                
                router.push("/")
            }else {
                throw new Error(await res.text());
            }

            
        }catch (error:any){
            toast.error(error.message, { position: "top-center", autoClose:3000,  theme:"dark"});
        }finally {
            toast.dismiss("loading")
        }
    }

        


    };
    
    return  (
        <main>
        <p className='text-4xl text-center text-white dark:text-white font-medium uppercase mt-10 mb-5'> Elimina Account   </p>
        <form className="space-y-6 px-6 pb-4" onSubmit={handleDelete}>
        <div>
        <label htmlFor='password' className="text-sm font-medium block mb-2 text-gray-300">
        Scrivi "CONFERMA" per eliminare i tuoi progressi
        </label>
        <input onChange={handleChangeInput} type="confirm" name="conferma" id="Uconfirm"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
    </div>

        <button type='submit' value='submit' className="w-full text-white focus:ring-blue-300 font-medium rounder-lg text-sm px5 py-2.5 text-center bg-red-600 hover:bg-red-700 rounded">
        {loading ? "Eliminando..." : "Elimina DEFINITIVAMENTE"}</button>
        </form>
        </main>
    )

    
}
export default DeleteProgress;
