import React, { Component } from 'react';
import Score from './Score';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.askQuestion(), // spread object returned from askQuestion()
      numCorrect: 0,
      numQuestions: 0
    };
  }

  // return an object with the properties of a new question
  askQuestion() {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    const proposedAnswer =
      Math.floor(Math.random() * 3) + value1 + value2 + value3;

    return {
      value1: value1,
      value2: value2,
      value3: value3,
      proposedAnswer: proposedAnswer
    };
  }

  answerQuestion(response) {
    this.setState(prevState => {
      // determine actual answer to equation
      const actualAnswer =
        prevState.value1 + prevState.value2 + prevState.value3 ===
        prevState.proposedAnswer;

      return {
        ...this.askQuestion(), // spread object returned from askQuestion()
        numCorrect:
          actualAnswer === response
            ? prevState.numCorrect + 1
            : prevState.numCorrect,
        numQuestions: prevState.numQuestions + 1
        // https://stackoverflow.com/questions/39316376/how-to-use-the-increment-operator-in-react
      };
    });
  }

  render() {
    return (
      <div className="game">
        <h2>Mental Math</h2>
        <div className="equation">
          <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
        </div>
        <button onClick={() => this.answerQuestion(true)}>True</button>
        <button onClick={() => this.answerQuestion(false)}>False</button>
        <Score
          numCorrect={this.state.numCorrect}
          numQuestions={this.state.numQuestions}
        />
      </div>
    );
  }
}

export default Game;
