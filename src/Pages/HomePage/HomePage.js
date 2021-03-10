import React, { useState, useEffect } from "react";
import { API } from "../../Config/api";

//Component
import Sidebar from "../../Components/Sidebar";
import Card from "../../Components/Card";

//Image
import Frame from "../../Image/Frame1.png";

//css
import "./HomePage.css";
import "../../spinner.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");
      setLoading(false);

      setBooks(allBook.data.data.books);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div className="App-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <img className="center cover" src={Frame} alt="" />

            <p className="book-header">List Book</p>
            <div>
              <div className="book-content">
                {books.map((book, index) => (
                  <Card book={book} key={book.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <pre>{JSON.stringify(state.userLogin.subscribed, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default HomePage;
