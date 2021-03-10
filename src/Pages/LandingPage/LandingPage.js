import React from "react";

//Component
import LoginComponent from "../../Components/LoginComp";
import SignUp from "../../Components/SignUpComp";

//Image
import vector from "../../Image/Vector1.png";
import logoPic from "../../Image/Icon.png";

//css
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="background" style={{ backgroundImage: `url(${vector})` }}>
      <div className="row-fluid">
        <div className="col-md-6 landing-content">
          <img src={logoPic} alt="" />
          <p className="landing-text">
            Sign-up now and subscribe to enjoy all the cool and latest books -
            The best book rental service provider in Indonesia
          </p>
          <p className="button">
            <p style={{ marginRight: "31px" }}>
              <SignUp />
            </p>
            <p>
              <LoginComponent />
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
