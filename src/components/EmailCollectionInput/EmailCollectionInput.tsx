import "./EmailCollectionInput.css";
import "./controller.emailCollectionInput";

export const EmailCollectionInput = ({onClose}: any) => {
  return (
    <div className="email-collection">
      <input
        className="email-collection-input"
        type="text"
        placeholder="Email address"
      />
      <div className="div-wrapper">
        <button onClick={()=>{
          onClose();
        }} className="sign-up-btn">
          <div className="text-wrapper-4">Sign Up</div>
        </button>
      </div>
    </div>
  );
};
