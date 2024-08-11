import { IoIosCloseCircleOutline } from "react-icons/io";
import { EmailCollectionInput } from "../EmailCollectionInput/EmailCollectionInput";
import "./SignUpPopUp.css";
import { SignUpPopUpProps } from "./controller.signUpPopUp";

const SignUpPopUp = ({ onClose }: SignUpPopUpProps): JSX.Element => {

  // only show 
  return (
    <div className="sign-up-pop-up">
      <div className="overlay" onClick={onClose}></div>
      <div className="frame">
        <div className="close" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </div>

        <div className="sign-wrapper">
          <p className="text-wrapper">Sign up to explore with us</p>
        </div>
        <EmailCollectionInput onClose={onClose} />
      </div>
    </div>
  );
};
export default SignUpPopUp;
