import React from 'react';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    
    return <form className="space-y-6 px-6 pb-4">
        <h3 className="text-x1 font-medium text-white"></h3>
        <div>
            <label htmlFor='email' className="text-sm font-medium block mb-2 text-gray-300">
            Email
            </label>
            <input type="email" name="email" id="UEmail"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
        </div>
        <div>
            <label htmlFor='password' className="text-sm font-medium block mb-2 text-gray-300">
            Password
            </label>
            <input type="password" name="password" id="UPassword"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
        </div>
        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounder-lg text-sm px5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s rounded">Login</button>
        
        <button className="flex w-ful justify-end">
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
                Password Dimenticata?
            </a>
        </button>
        <button>
            <div className="text-sm font-medium text-gray-500"> Non sei Registrato? <a href="#" className="text-blue-700 hover:underline"> Crea Account</a></div>

        </button>
        
        </form>
}
export default Login;