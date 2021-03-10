/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { API } from "../../Config/api";

//Image
import logoPic from "../../Image/IconMini.png";
import profilePic from "../../Image/ProfilePic.png";

//context
import { AppContext } from "../../Context/globalContext";

import "./AddBook.css";
import "../../spinner.css";

const AddBook = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const goTransaction = () => {
    history.push(`/transaction`);
  };
  const [show, setShow] = useState(false);
  
  const [loading, setLoading] = useState(false);
  
  const [addBookFormData, setAddBookFormData] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: null,
    thumbnail: null,
  });

  const onChange = (e) => {
    const updateForm = { ...addBookFormData };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setAddBookFormData(updateForm);
  };

  const {
    title,
    publicationDate,
    pages,
    author,
    isbn,
    about,
    bookFile,
    thumbnail,
  } = addBookFormData;

  const handleClose = () => setShow(false);
  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("publicationDate", publicationDate);
      body.append("pages", pages);
      body.append("author", author);
      body.append("isbn", isbn);
      body.append("about", about);
      body.append("epubFile", bookFile);
      body.append("imageFile", thumbnail);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);
      await API.post("/book", body, config);
      setLoading(false);

      setAddBookFormData({
        title: "",
        publicationDate: "",
        pages: "",
        author: "",
        isbn: "",
        about: "",
        bookFile: null,
        thumbnail: null,
      });

      setShow(true)

      
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div className="transaction-body">
      <div className="container-fluid">
        <div className="row">
          <div>
            <img className="logos" src={logoPic} alt="" />
          </div>
          <div className="col-md-10"></div>
          <div>
            <div class="dropdown">
              <img className="foto" src={profilePic} alt="" />
              <div class="dropdown-content">
                <a onClick={goTransaction}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.8762 19.9345V0H5.26825C2.38934 0 0.0338745 2.35547 0.0338745 5.23438V34.7656C0.0338745 37.6565 2.37739 40 5.26825 40H29.7247C35.3245 40 39.9904 35.4184 39.9661 29.8187C39.9449 24.9502 36.4737 20.8809 31.8762 19.9345ZM29.5367 19.7314C24.3672 19.8788 20.1551 23.9153 19.729 29.0115H9.49512V2.33945H29.5367V19.7314ZM5.23458 2.33945H7.15567V29.0115H5.52809C4.38442 29.0115 3.32153 29.3631 2.44106 29.9634V5.13297C2.44106 3.59258 3.69419 2.33945 5.23458 2.33945ZM5.52809 37.6605C3.78856 37.6605 2.37333 36.2453 2.37333 34.5058C2.37333 32.7663 3.78856 31.351 5.52809 31.351H19.8023C19.9008 32.0181 20.0647 32.6642 20.287 33.2827H6.02997V35.6222H21.4925C22.02 36.3836 22.6487 37.0697 23.3595 37.6605H5.52809ZM29.8295 37.6605C25.5301 37.6605 22.0323 34.1628 22.0323 29.8634C22.0323 25.5641 25.5301 22.0663 29.8295 22.0663C34.1288 22.0663 37.6266 25.5641 37.6266 29.8634C37.6266 34.1628 34.1289 37.6605 29.8295 37.6605Z"
                      fill="#929292"
                    />
                    <path
                      d="M30.9993 26.2985H28.6598V28.6936H26.2645V31.0331H28.6598V33.4283H30.9993V31.0331H33.3945V28.6936H30.9993V26.2985Z"
                      fill="#929292"
                    />
                    <path
                      d="M15.7357 6.88831H23.5654V9.22776H15.7357V6.88831Z"
                      fill="#929292"
                    />
                    <path
                      d="M13.0909 11.9673H26.2101V14.3067H13.0909V11.9673Z"
                      fill="#929292"
                    />
                  </svg>{" "}
                  Transaction
                </a>
                <a onClick={() => dispatch({ type: "LOGOUT" })}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.218 11.7192H14.3224C13.8911 11.7192 13.5411 11.3692 13.5411 10.938C13.5411 10.5067 13.8911 10.1567 14.3224 10.1567H24.218C24.6492 10.1567 24.9992 10.5067 24.9992 10.938C24.9992 11.3692 24.6492 11.7192 24.218 11.7192Z"
                      fill="#929292"
                    />
                    <path
                      d="M20.3118 15.6252C20.1117 15.6252 19.9118 15.5491 19.7596 15.3962C19.4545 15.0908 19.4545 14.5961 19.7596 14.2909L23.1138 10.9369L19.7596 7.58276C19.4545 7.27759 19.4545 6.78284 19.7596 6.47768C20.065 6.17232 20.5597 6.17232 20.8649 6.47768L24.771 10.3838C25.0762 10.689 25.0762 11.1837 24.771 11.4889L20.8649 15.395C20.7118 15.5491 20.5119 15.6252 20.3118 15.6252Z"
                      fill="#929292"
                    />
                    <path
                      d="M8.33314 25C8.11018 25 7.89866 24.9687 7.68733 24.9031L1.41864 22.8146C0.565702 22.5167 0 21.7219 0 20.8335V2.08406C0 0.935113 0.934381 0.000732422 2.08333 0.000732422C2.3061 0.000732422 2.51762 0.032012 2.72914 0.0976227L8.99764 2.1861C9.85077 2.48402 10.4163 3.27879 10.4163 4.16721V22.9166C10.4163 24.0656 9.48209 25 8.33314 25ZM2.08333 1.56318C1.79686 1.56318 1.56245 1.79759 1.56245 2.08406V20.8335C1.56245 21.0553 1.71141 21.2615 1.92388 21.3355L8.1632 23.4146C8.20802 23.4291 8.26638 23.4375 8.33314 23.4375C8.61961 23.4375 8.85383 23.2031 8.85383 22.9166V4.16721C8.85383 3.94539 8.70487 3.73921 8.4924 3.66521L2.25308 1.58607C2.20826 1.57158 2.1499 1.56318 2.08333 1.56318Z"
                      fill="#929292"
                    />
                    <path
                      d="M15.8849 8.33387C15.4536 8.33387 15.1037 7.98388 15.1037 7.55264V2.86529C15.1037 2.14758 14.5194 1.56318 13.8017 1.56318H2.08335C1.65211 1.56318 1.30212 1.2132 1.30212 0.781958C1.30212 0.35072 1.65211 0.000732422 2.08335 0.000732422H13.8017C15.3819 0.000732422 16.6661 1.2851 16.6661 2.86529V7.55264C16.6661 7.98388 16.3161 8.33387 15.8849 8.33387Z"
                      fill="#929292"
                    />
                    <path
                      d="M13.8016 21.8751H9.63499C9.20375 21.8751 8.85376 21.5251 8.85376 21.0939C8.85376 20.6627 9.20375 20.3127 9.63499 20.3127H13.8016C14.5194 20.3127 15.1036 19.7283 15.1036 19.0106V14.3232C15.1036 13.892 15.4536 13.542 15.8848 13.542C16.316 13.542 16.666 13.892 16.666 14.3232V19.0106C16.666 20.5907 15.3818 21.8751 13.8016 21.8751Z"
                      fill="#929292"
                    />
                  </svg>{" "}
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row transaction-content">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p className="transaction-header">Add Book</p>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row transaction-content">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <input
                  name="publicationDate"
                  value={publicationDate}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Publication Date"
                />
              </div>
              <div className="form-group">
                <input
                  name="pages"
                  value={pages}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Pages"
                />
              </div>
              <div className="form-group">
                <input
                  name="author"
                  value={author}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Author"
                />
              </div>
              <div className="form-group">
                <input
                  name="isbn"
                  value={isbn}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="ISBN"
                />
              </div>
              <div className="form-group">
                <input
                  name="about"
                  value={about}
                  onChange={(e) => onChange(e)}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                  }}
                  type="textarea"
                  class="form-control"
                  placeholder="About This Book"
                />
              </div>
              <div className="form-group">
                <input
                  name="bookFile"
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="actual-btn"
                  className="form-control"
                  placeholder="Attach Book File"
                  hidden
                />
                <label for="actual-btn">
                  Attache Book File{" "}
                  <svg
                    width="20"
                    height="30"
                    viewBox="0 0 20 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 30C4.83002 30 0.625 25.795 0.625 20.625V7.5C0.625 6.80878 1.18507 6.25008 1.87492 6.25008C2.565 6.25008 3.12508 6.80878 3.12508 7.5V20.625C3.12508 24.4151 6.2088 27.4999 10 27.4999C13.7912 27.4999 16.8749 24.4151 16.8749 20.625V6.87492C16.8749 4.46251 14.9125 2.50008 12.5001 2.50008C10.0874 2.50008 8.125 4.46251 8.125 6.87492V19.3751C8.125 20.4087 8.96614 21.2501 10 21.2501C11.0339 21.2501 11.875 20.4087 11.875 19.3751V7.5C11.875 6.80878 12.4351 6.25008 13.1249 6.25008C13.815 6.25008 14.3751 6.80878 14.3751 7.5V19.3751C14.3751 21.7875 12.4124 23.7499 10 23.7499C7.58759 23.7499 5.62492 21.7875 5.62492 19.3751V6.87492C5.62492 3.0851 8.70865 0 12.5001 0C16.2913 0 19.375 3.0851 19.375 6.87492V20.625C19.375 25.795 15.17 30 10 30Z"
                      fill="#D60000"
                    />
                  </svg>
                </label>
              </div>
              <div className="form-group">
                <input
                  name="thumbnail"
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="actual-btn2"
                  className="form-control"
                  placeholder="Attach thumbnail"
                  hidden
                />
                <label for="actual-btn2">
                  Attach thumbnail{" "}
                  <svg
                    width="20"
                    height="30"
                    viewBox="0 0 20 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 30C4.83002 30 0.625 25.795 0.625 20.625V7.5C0.625 6.80878 1.18507 6.25008 1.87492 6.25008C2.565 6.25008 3.12508 6.80878 3.12508 7.5V20.625C3.12508 24.4151 6.2088 27.4999 10 27.4999C13.7912 27.4999 16.8749 24.4151 16.8749 20.625V6.87492C16.8749 4.46251 14.9125 2.50008 12.5001 2.50008C10.0874 2.50008 8.125 4.46251 8.125 6.87492V19.3751C8.125 20.4087 8.96614 21.2501 10 21.2501C11.0339 21.2501 11.875 20.4087 11.875 19.3751V7.5C11.875 6.80878 12.4351 6.25008 13.1249 6.25008C13.815 6.25008 14.3751 6.80878 14.3751 7.5V19.3751C14.3751 21.7875 12.4124 23.7499 10 23.7499C7.58759 23.7499 5.62492 21.7875 5.62492 19.3751V6.87492C5.62492 3.0851 8.70865 0 12.5001 0C16.2913 0 19.375 3.0851 19.375 6.87492V20.625C19.375 25.795 15.17 30 10 30Z"
                      fill="#D60000"
                    />
                  </svg>
                </label>
              </div>
              <div className="form-group">
                <button className="btn btn-danger" type="submit">
                  Send{"  "}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9227 12.4591V0H3.29272C1.49341 0 0.0212402 1.47217 0.0212402 3.27148V21.7285C0.0212402 23.5353 1.48594 25 3.29272 25H18.578C22.0779 25 24.994 22.1365 24.9789 18.6367C24.9656 15.5938 22.7961 13.0506 19.9227 12.4591ZM18.4605 12.3321C15.2296 12.4243 12.597 14.9471 12.3307 18.1322H5.93452V1.46216H18.4605V12.3321ZM3.27168 1.46216H4.47236V18.1322H3.45513C2.74033 18.1322 2.07603 18.352 1.52573 18.7271V3.20811C1.52573 2.24536 2.30894 1.46216 3.27168 1.46216ZM3.45513 23.5378C2.36792 23.5378 1.4834 22.6533 1.4834 21.5661C1.4834 20.4789 2.36792 19.5944 3.45513 19.5944H12.3765C12.4381 20.0113 12.5405 20.4151 12.6794 20.8017H3.7688V22.2639H13.4329C13.7626 22.7397 14.1555 23.1686 14.5998 23.5378H3.45513ZM18.6435 23.5378C15.9564 23.5378 13.7703 21.3518 13.7703 18.6646C13.7703 15.9775 15.9564 13.7915 18.6435 13.7915C21.3306 13.7915 23.5167 15.9775 23.5167 18.6646C23.5167 21.3518 21.3306 23.5378 18.6435 23.5378Z"
                      fill="white"
                    />
                    <path
                      d="M19.3745 16.4365H17.9124V17.9335H16.4153V19.3957H17.9124V20.8927H19.3745V19.3957H20.8715V17.9335H19.3745V16.4365Z"
                      fill="white"
                    />
                    <path
                      d="M9.83496 4.30518H14.7285V5.76733H9.83496V4.30518Z"
                      fill="white"
                    />
                    <path
                      d="M8.18188 7.47949H16.3814V8.94165H8.18188V7.47949Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body style={{ color: "#29BD11" }}>
            Add Book Successful
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddBook;
