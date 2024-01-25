import TopNavBar from "@/components/TopNavBar/TopNavBar";
import { firestore } from "@/firebase/firebase";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  /*
    const [input,setInput] = useState({
        id: '',
        title:'',
        difficulty:'',
        order:'',
        videoId:'',
        likes: 0,

    })*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        */
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*
        const temp = {
            ...input,
            order: Number(input.order)
        }
        try {
            await setDoc(doc(firestore, "problems", input.id),temp);
            toast.success("Aggiunto al database!" , { position: "top-center", autoClose:3000, theme:"dark"});
        }catch (error:any) {
            toast.error(error.message, { position: "top-center", autoClose:3000, theme:"dark"});
        }
        */
  };
  return (
    <>
      <div className="bg-dark-layer-2 h-screen relative">
        <TopNavBar problemPage={false} />
        <div className=" flex items-center justify-center">
          <p className="text-white">
            {" "}
            Non siamo riusciti a sviluppare in tempo questa funzione, ci
            scusiamo per eventuali disagi{" "}
          </p>
        </div>
        <div className=" flex items-center justify-center">
          <form
            className="p-6 flex flex-col max-w-sm gap-3"
            onSubmit={handlesubmit}
          >
            <input
              onChange={handleChange}
              type="text"
              placeholder="pid"
              name="id"
            ></input>
            <input
              onChange={handleChange}
              type="text"
              placeholder="title"
              name="title"
            ></input>
            <input
              onChange={handleChange}
              type="text"
              placeholder="category"
              name="category"
            ></input>
            <input
              onChange={handleChange}
              type="text"
              placeholder="difficulty"
              name="difficulty"
            ></input>
            <input
              onChange={handleChange}
              type="text"
              placeholder="order"
              name="order"
            ></input>
            <input
              onChange={handleChange}
              type="text"
              placeholder="videoId?"
              name="videoId"
            ></input>
            <button className="bg-dark-fill-2 text-white rounded">
              Aggiungi al DB
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default index;
