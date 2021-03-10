import React, { useContext, useState, useEffect } from "react";
import { API } from "../../Config/api";

//Component
import Sidebar from "../../Components/Sidebar";

//Image
import mail from "../../Image/mail.png";
import gender from "../../Image/gender.png";
import phone from "../../Image/phone.png";
import map from "../../Image/map.png";
import profilepic from "../../Image/profilepiclarge.png";

//css
import "./Profile.css";
import "../../spinner.css";

//context
import { AppContext } from "../../Context/globalContext";

const ProfilePage = () => {
  const [state] = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    email: state.userLogin.email,
    gender: "",
    mobilePhone: "",
    address: "",
  });

  const getProfile = async (id) => {
    try {
      setLoading(true);
      const getProfile = await API.get(`/user/${id}`);

      const profileData = getProfile.data.data.users;
      setProfile(profileData);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile(state.userLogin.id);
  }, []);

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div className="App-header">
      <div className="container-fluid" style={{ height: "900px" }}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="content">
              <p className="profile">Profile</p>
              <div className="box">
                <div className="col-md-7 left-side">
                  <div className="item">
                    <div>
                      <img src={mail} alt="" />
                    </div>
                    <div className="textInner">
                      <p className="upperText">{profile.email}</p>
                      <p className="lowerText">Email</p>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <img src={gender} alt="" />
                    </div>
                    <div className="textInner">
                      <p className="upperText">{profile.gender}</p>
                      <p className="lowerText">Gender</p>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <img src={phone} alt="" />
                    </div>

                    <div className="textInner">
                      <p className="upperText">{profile.mobilePhone}</p>
                      <p className="lowerText">Mobile Phone</p>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <img src={map} alt="" />
                    </div>

                    <div className="textInner">
                      <p className="upperText">{profile.address}</p>
                      <p className="lowerText">Address</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 right-side">
                  <img src={profilepic} alt="" />
                  <div>
                    <button
                      className="btn btn-danger editButton"
                      style={{
                        width: "227px",
                        height: "50px",
                        marginTop: "36px",
                        marginBottom: "21px",
                        backgroundColor: "rgba(214, 0, 0, 1)",
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              <p className="profile">My List Book</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
