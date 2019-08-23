import React, { Component } from 'react';
import axios from 'axios';

import classes from './SearchForm.module.css';
import Aux from '../../hoc/Aux';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';

import Oodi from '../../assets/images/Icon-Oodi-Black.svg';
import leftArrow from '../../assets/images/Icon-Arrow-Left.svg';
import rightArrow from '../../assets/images/Icon-Arrow-Right.svg';
import upArrow from '../../assets/images/Icon-Arrow-Up.svg';
import homeImage from '../../assets/images/Icon-Home.svg';
import { withTranslation } from 'react-i18next';

//import Oodi from '../../assets/images/Icon-Oodi-Black.svg';

class SearchForm extends Component {
  state = {
    searchTerm: '',
    notSearching: true,
    books: [],
    showInfoBars: true,
    showBackButton: true,
    showSearchResultsHeader: false,
    chosenBook: '',
    chosenBookId: '',
    arrowMessage: '',
    arrowDirection: '',
    guidanceStarted: false,
    keepBackButtonUnchanged: true,
    savedBookResults: []
  }

  searchTermHandler = (event) => {
    this.setState({searchTerm: event.target.value});
  }

    keepBackButtonUnchangedHandler = () => {
      this.setState({keepBackButtonUnchanged: true});
    }

    changeBackButtonHandler = () => {
      this.setState({keepBackButtonUnchanged: false});
    }

  sendDataHandler = () => {
    this.setState({showSearchResultsHeader: true});
    this.setState({notSearching: false})
    console.log(this.state.searchTerm);
    let searchTerm = this.state.searchTerm;
    axios
      .post('http://localhost:3001/searchterm', {searchTerm})
      .then(() =>
        axios
          .get('http://localhost:3001/get_books')
          .then(response => {
            this.setState({books: Object.entries(Object.entries(response.data)[0][1])});
            console.log("Books received in form:", this.state.books);})
          .catch(err => {
            console.log(err);})
        )
      .catch(err => {
        console.error(err);})
  }

  changeNotSearchingHandler = () => {
    this.setState({notSearching: true});

    //this.setState({searchTerm: ''});
  }

  saveBookResultsHandler = (books) => {
    this.setState({savedBookResults: books});
  }

  changeInfoBarsStateFalseHandler = (bookTitle, bookId) => {
    //will set the states so that the different book result buttons will be hidden.
    //also sets the states to hide the back button in the term results view AND hide the found books.
    //Also, the state for showing the chosen book's title is enabled here.
    this.setState({notSearching: false});
    this.setState({showInfoBars: false});
    this.setState({showBackButton: false});
    this.setState({showSearchResultsHeader: false});
    this.setState({chosenBook: bookTitle})
    this.setState({chosenBookId: bookId});
    console.log("Infobars will be HIDDEN");
  }

  changeInfoBarsStateTrueHandler = () => {
    //reverts the changes done in changeInfoBarsStateFalseHandler!
    this.setState({notSearching: true});
    this.setState({showInfoBars: true});
    this.setState({showBackButton: true});
    this.setState({showSearchResultsHeader: true});
    this.setState({keepBackButtonUnchanged: true});
    console.log("Infobars will be SHOWN");
  }

  startGuidanceHandler = (bookId) => {
    this.setState({guidanceStarted: true})
    axios
      .post('http://localhost:3001/selected_book', {bookId})
      .then(() => ( this.getArrowSignalHandler()
      ))
      .catch(err => {
        console.log(err)})
  }

  getArrowSignalHandler = () => {
    axios
    .get('http://localhost:3001/guidance')
    .then( response => {
      console.log("The arrow response from the server is", response.data.data);
      if (response.data.data === 'home') {
        this.setState({arrowDirection: homeImage});
        this.setState({arrowMessage: "Bye bye! I'm going back to the starting point!"})
        console.log("arrow is currently:", this.state.arrowDirection);
        return this.returnHomeHandler();
      }
      else {
        if (response.data.data === 'l') {
          this.setState({arrowDirection: leftArrow});
          this.setState({arrowSubMessage: "Left"});
          console.log("received left arrow");
        }
        else if (response.data.data === 'r') {
          this.setState({arrowDirection: rightArrow});
          this.setState({arrowSubMessage: "Right"});
          console.log("received right arrow");
        }
        else if (response.data.data === 'lr') {
          this.setState({arrowDirection: leftArrow});
          this.setState({arrowSubMessage: "Both"});
          console.log("received leftright arrow");
        }
        else {
          this.setState({arrowDirection: upArrow});
          this.setState({arrowMessage: "Follow me, please!"});
          console.log("no matching arrow");
        }
        setTimeout(this.getArrowSignalHandler, 2000)
      }
    })
    .catch(err => {
      console.log(err);
      })
  }

  returnHomeHandler = () => {
    axios
      .get('http://localhost:3001/guidance')
      .then( response => {
        if (response.data.data === 'home') {
          console.log("Still only receiving home")
          setTimeout(this.returnHomeHandler, 2000);
        }
        else if (response.data.data === 'home2') {
          console.log("WE ARE BACK HOME!");
          this.props.backToStart();

        }
        else {
          console.log("received something else");
          setTimeout(this.returnHomeHandler, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  render() {
    const { t } = this.props

    //book[1].title, book[1].author, book[1].bibid show the book's title, author and id, in respect.

    return (
        <Aux>
          {this.state.keepBackButtonUnchanged
          ? <div className={classes.BottomBar}>
              <button className={classes.BackButton} onClick={() => {this.props.back(); this.props.showLng()}}>
                <img src={leftArrow} alt="leftArrow" className={classes.LeftArrow} />
                <h1 className={classes.BackButtonText}>Back</h1>
              </button>
              </div>
          : null}
          {this.state.guidanceStarted
            ? <Aux>
            <div className={classes.OodiBox}>
              <img src={Oodi} className={classes.rectangle} alt="Oodi" />
            </div>
            <div>
              <h1>{t(`arrowSubMessage.${this.state.arrowSubMessage}`)}</h1>
              <img src={this.state.arrowDirection} alt="arrow"/>
            </div>
              </Aux>
            : <SearchBar clicked={() => {this.props.clicked(); this.changeBackButtonHandler()}}
            chooseBook={this.changeInfoBarsStateFalseHandler} showCategories={this.props.showCategories} changeBackButton={this.keepBackButtonUnchangedHandler}
            placeWaveDown={this.props.placeWaveDown}
            placeWaveUp={this.props.placeWaveUp}
            startGuidance={this.startGuidanceHandler}/>}
        </Aux>
  )
  }
};

export default withTranslation('common')(SearchForm);
