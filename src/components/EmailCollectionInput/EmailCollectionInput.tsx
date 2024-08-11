import { useState } from "react";
import "./EmailCollectionInput.css";
import "./controller.emailCollectionInput";
import { addEmail } from "./controller.emailCollectionInput";

export const EmailCollectionInput = ({onClose}: any) => {
  const [email,setEmail] = useState<string>("");

  return (
    <div className="email-collection">
      <input
      onChange={(e: any) => {
            setEmail(e.target.value);
      }}
        className="email-collection-input"
        type="text"
        placeholder="Email address"
      />
      <div className="div-wrapper">
        <button onClick={async ()=>{
            await addEmail(email).then((res) => {

            }).catch((err)=>{
              
            })
          onClose();
        }} className="sign-up-btn">
          <div className="text-wrapper-4">Sign Up</div>
        </button>
      </div>
    </div>
  );
};
