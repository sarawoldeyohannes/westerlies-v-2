import "./SignUpPopUp.css";

const SignUpPopUp = (): JSX.Element => {
  return (
    <div className="sign-up-pop-up">
      <div className="frame">
        <div className="x">X</div>
      </div>
      <div className="div-wrapper">
        <p className="text-wrapper">Sign up to explore with us!</p>
      </div>
      <div className="div">
        <div className="frame-2">
          <div className="text-wrapper-2">Email address</div>
        </div>
        <div className="frame-3">
          <div className="text-wrapper-3">Sign Up</div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPopUp;
