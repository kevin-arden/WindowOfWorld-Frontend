import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../Config/api";

//Image
import logoPic from "../../Image/IconMini.png";

//css
import "../../spinner.css";

const ReadBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const rid = useParams();

  const getBook = async () => {
    try {
      setLoading(true);

      const getBook = await API.get(`/book/${rid.rid}`);
      console.log(getBook);

      setLoading(false);

      setBooks(getBook.data.data.book);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  console.log(books);

  const history = useHistory();

  const goToHome = () => {
    history.push(`/home`);
  };

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div>
      <div className="row">
        <div className="col-md-2">
          <img
            className="logos"
            src={logoPic}
            alt=""
            onClick={() => goToHome()}
          />
        </div>
        <div className="col-md-10"></div>
      </div>
      <div className="row" style={{ height: "700px" }}>
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <ReactReader
            url={`http://localhost:5000/ebook/${books.bookFile}`}
            title={"Creative Selection"}
            location={"epubcfi(/6/2[cover]!/6)"}
            locationChanged={(epubcifi) => console.log(epubcifi)}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default ReadBook;
