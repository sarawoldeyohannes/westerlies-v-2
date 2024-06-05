import "./EmailCollectionInput.css";
import "./controller.emailCollectionInput";

export const EmailCollectionInput = () => {
  return (
    <div className="email-collection">
      <input
        className="email-collection-input"
        type="text"
        placeholder="Email address"
      />

      <div className="div-wrapper">
        <button className="sign-up-btn">
          <div className="text-wrapper-4">Sign Up</div>
        </button>
      </div>
    </div>
  );
};
