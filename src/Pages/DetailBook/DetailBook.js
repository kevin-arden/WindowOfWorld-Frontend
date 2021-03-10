import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../Config/api";

//Component
import Sidebar from "../../Components/Sidebar";
import "../../spinner.css";
//css
import "./DetailBook.css";

const DetailBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const getDetailBook = async () => {
    try {
      setLoading(true);

      const getBook = await API.get(`/book/${id}`);

      setLoading(false);

      setBook(getBook.data.data.book);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailBook();
  }, []);

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div>
      <div className="App-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 detail-book">
              <div className="row">
                <div className="col-md-5">
                  <img
                    src={`http://localhost:5000/image/${book.thumbnail}`}
                    className="detail-image img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-md-7">
                  <p className="title">{book.title}</p>
                  <p className="writer">{book.writer}</p>
                  <p className="upper">Publication Date</p>
                  <p className="lower">{book.publicationDate}</p>
                  <p className="upper">Pages</p>
                  <p className="lower">{book.pages}</p>
                  <p className="upper">ISBN</p>
                  <p className="lower">{book.isbn}</p>
                </div>
              </div>
              <div className="bawah">
                <p className="title-about">About This Book</p>
                <p className="text-about">{book.about}</p>
              </div>
              <div className="row">
                <div className="col-md-9"></div>
                <div style={{ marginBottom: "20px" }} className="col-md-3">
                  <button className="btn btn-danger">
                    Add My List{" "}
                    <svg
                      width="12"
                      height="20"
                      viewBox="0 0 12 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.140625 0V20L6 14.3321L11.8594 20V0H0.140625ZM10.6875 17.2478L6 12.6992L1.3125 17.2478V1.17188H10.6875V17.2478Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <button
                    style={{
                      marginLeft: "20px",
                      color: "black",
                      backgroundColor: "rgba(205, 205, 205, 0.7)",
                    }}
                    className="btn btn-secondary"
                    onClick={() => history.push("/read/" + id)}
                  >
                    Read Book{" "}
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.0079999 15.072V13.368L14.912 7.896L0.0079999 2.376V0.696L17 7.152V8.736L0.0079999 15.072Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
