import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";

//css
import "../App.css";

//context
import { AppContext } from "../Context/globalContext";

function SignUp() {
  let history = useHistory();

  const [show, setShow] = useState(false);
  const showingModalSignUp = () => setShow(true);
  const closingModalSignUp = () => setShow(false);

  const [state, dispatch] = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = signUpFormData;

  const onChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        fullName,
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoading(true);
      const user = await API.post("/register", body, config);
      setLoading(false);

      
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user.data.data.user,
      });
      setAuthToken(user.data.data.user.token);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <button
        onClick={showingModalSignUp}
        className="btn btn-danger"
        style={{
          width: "190px",
          height: "50px",
          backgroundColor: "rgba(214, 0, 0, 1)",
        }}
      >
        Sign Up
      </button>

      <Modal
        show={show}
        onHide={closingModalSignUp}
        dialogClassName="modal-main"
      >
        <Modal.Body>
          <div className="sign-body">
            <p className="sign-header">Sign Up</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  name="fullName"
                  value={fullName}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-danger"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "31px",
                    marginBottom: "20px",
                    backgroundColor: "rgba(214, 0, 0, 1)",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="sign-bottom">Already Have an account ? Click Here</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignUp;
