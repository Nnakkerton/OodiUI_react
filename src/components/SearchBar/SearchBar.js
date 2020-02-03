import React, { useState } from "react";
import axios from "axios";
import classes from "./SearchBar.module.css";
import Aux from "../../hoc/Aux";
//import Button from '../Button/Button';
import InfoBar from "../InfoBar/InfoBar";

import { withTranslation } from "react-i18next";

import LeftArrow from "../../assets/images/Icon-Arrow-Left.svg";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookResults, setBookResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [askGuidance, setAskGuidance] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [chosenTitle, setChosenTitle] = useState("");
  const [bookId, setBookId] = useState("");

  const { t } = props;

  const changeResultsToFalse = () => {
    setShowResults(false);
  };

  const getChosenBookHandler = (title, id) => {
    setChosenTitle(title);
    setBookId(id);
  };

  const sendDataHandler = event => {
    event.preventDefault();
    setShowResults(true);
    setShowLoading(true);
    let search = searchTerm;
    axios
      .post("http://localhost:3001/searchterm", { search })
      .then(() =>
        axios
          .get("http://localhost:3001/get_books")
          .then(response => {
            setBookList(Object.entries(Object.entries(response.data)[0][1]));
            //this.setState({books: Object.entries(Object.entries(response.data)[0][1])});
            console.log("Books received in form:", bookList);
            setShowLoading(false);
          })

          .catch(err => {
            console.log(err);
          })
      )
      .catch(err => {
        console.error(err);
      });
    console.log("BOOKLIST IS", bookList);
  };
  return (
    <Aux>
      {showForm ? (
        <form onSubmit={sendDataHandler}>
          <input
            type="text"
            className={classes.SearchBar}
            placeholder={t("bookMenu.findBookPlaceholder")}
            onChange={event => setSearchTerm(event.target.value)}
            values={searchTerm}
          />
          <div className={classes.Button}>
            <button
              type="submit"
              onClick={() => {
                props.clicked();
                setBookResults(true);
              }}
            />
          </div>
        </form>
      ) : (
        <Aux>
          <button
            className={classes.No}
            onClick={() => {
              setShowForm(true);
              setShowResults(true);
              setBookResults(true);
              props.placeWaveUp();
            }}
          >
            {t("toiletOrFoodScreen.no")}
          </button>
          <button
            className={classes.Proceed}
            onClick={() => {
              props.startGuidance(bookId);
            }}
          >
            {t("toiletOrFoodScreen.yes")}
          </button>
          <div className={classes.MessageContainer}>
            <h1 className={classes.ConfirmationMessage}>
              {t("bookSearch.startGuidance")}
              {chosenTitle}
            </h1>
          </div>
        </Aux>
      )}
      {showLoading ? (
        <div className={classes.Container}>
          <p className={classes.CommunicationMessage}>{t("bookSearch.searching")}</p>
        </div>
      ) : null}
      {showResults && bookList.length > 0 ? (
        <div className={classes.Container}>
          {bookList.map(book => (
            <div key={book[1].bibid}>
              <InfoBar
                author={book[1].author}
                title={book[1].title}
                id={book[1].bibid}
                chosenBook={getChosenBookHandler}
                showCategories={props.showCategories}
                clicked={() => {
                  changeResultsToFalse();
                  props.placeWaveDown();
                  setAskGuidance(true);
                  setShowForm(false);
                  setBookResults(false);
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
      {!showLoading && showResults && bookList.length === 0 ? (
        <div className={classes.Container}>
          <p className={classes.CommunicationMessage}>{t("bookSearch.nonefound")}</p>
        </div>
      ) : null}
      <div>
        {bookResults ? (
          <div className={classes.BottomBar}>
            <button
              className={classes.BackButton}
              onClick={() => {
                setShowResults(false);
                props.showCategories();
                props.changeBackButton();
                setBookResults(false);
              }}
            >
              <img
                src={LeftArrow}
                alt="leftArrow"
                className={classes.LeftArrow}
              />
              <h1 className={classes.BackButtonText}>Back</h1>
            </button>
            <p className={classes.ResultsNumber}>{bookList.length}/300 (max)</p>
          </div>
        ) : null}
      </div>
    </Aux>
  );
}

export default withTranslation("common")(SearchBar);
