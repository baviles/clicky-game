import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import cards from "./yugi.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = id => {

    const shuffledArray = this.shuffleArray(cards);
    this.setState ({cards: shuffledArray});

    if (this.state.clickedArray.includes(id)) {
      this.setState ({score: 0, clickedArray: [], message: "Incorrect!! Game Over Click an image to start again!", shakeit: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score +1,
        message: "Correct!!",
        shakeit: "false"
      });
    }
    if(this.state.score > this.state.topScore) {
      this.setState({topScore: this.state.score});
    }

    }
    shuffleArray = (picturesArray) => {
      for (let i = picturesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()* (i+1));
        [picturesArray[i], picturesArray[j]]= [picturesArray[j],picturesArray[i]];
        
      }
      return picturesArray;
    }
    render(){
      return (
        <div className = "App">
          <header className= "App-header">
            <img src = {logo} className= "App-logo" alt="logo" />
            <h1 className= "App-title">Welcome to Yugioh Memory Game with React!!</h1>
            </header>
            <h3 className= "App-intro">
              <strong> Click on an image to earn points, but don't click on any, more then once!</strong>
              <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
              <p className="message"><strong>{this.state.message}</strong></p>
            </h3>
            <Wrapper
            shakeWrapper = {this.state.shakeit}
            pictures =
            {this.state.cards.map (picture => (
              <FriendCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
              />

            ))}
            />
        </div>
      )
    }
  }
  export default App;