import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import heart from "./heart.png";
import GameOver from "./GameOver";

function App() {
  const apiLink = `https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase`;
  const [word, setWord] = useState("");
  const [origWord, setOrigWord] = useState("");
  const [normal, setNormal] = useState("");
  const [selected, setSelected] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [buttonClick, setButtonClick] = useState(0);
  const [lives, setLives] = useState(3);

  // Modal Message
  const [isCorrect, setIsCorrect] = useState(false);
  const [IsWrong, setIsWrong] = useState(false);

  const shuffle = (word) => {
    const arryStr = word.split("");
    const arryLength = word.length;
    for (let index = arryLength - 1; index > 0; index--) {
      let ranNumb = Math.floor(Math.random() * (index + 1));
      let temp = arryStr[index];
      arryStr[index] = arryStr[ranNumb];
      arryStr[ranNumb] = temp;
    }
    const toString = arryStr.join("");
    setNormal(toString);
    console.log(toString);
    return toString;
  };

  const generate = async () => {
    fetch(apiLink)
      .then((response) => response.json())
      .then((data) => setWord(data))
      .then(console.log("WORD: " + word))
      .then(setOrigWord(word))
      .then(console.log("CURRENT LEVEL: " + buttonClick));
  };

  useEffect(() => {
    generate();
    shuffle(String(word));
  }, [buttonClick]);

  const handleSubmit = () => {
    if (answer == null) return;
    if (answer.length < 5) return;
    if (answer != "") {
      console.log("Your Answer: " + answer.join(""));
      if (answer.join("") == origWord) {
        console.log("You are correct!");
        setIsCorrect(true);
      }
      if (answer.join("") != origWord) {
        console.log("You are wrong!");
        setIsWrong(true);
        setLives(lives - 1);
      }
    }
  };

  const handleNext = () => {
    console.log("HandleNext clicked!");
    setIsCorrect(false);
    setIsWrong(false);
    setButtonClick(buttonClick + 1);
    setAnswer("");
    setSelected("");
  };

  const exit = () => {
    setButtonClick(0);
    setIsCorrect(false);
    setIsWrong(false);
    setAnswer("");
    setSelected("");
    setWord("");
    setOrigWord("");
    setLives(3);
  };

  return (
    <div className="screen">
      {isCorrect && (
        <Modal
          handleNext={handleNext}
          status={"status-correct"}
          answer={answer}
          message={"Keep it going, your answer is correct!"}
        />
      )}
      {IsWrong && lives > 0 && (
        <Modal
          handleNext={handleNext}
          status={"status-wrong"}
          answer={origWord}
          message={"Your answer " + answer.join("") + " is incorrect!"}
        />
      )}
      {IsWrong && lives == 0 && lives == 0 && <GameOver exit={exit} />}
      {isCorrect || IsWrong ? <Backdrop /> : null}

      <div className="container">
        {buttonClick > 0 && (
          <>
            <header>
              <h2>Word Shuffle</h2>
              <div className="ingame-info-container">
                <p className="level">Level: {buttonClick}</p>
                <p className="lives">
                  Tries:{" "}
                  {lives > 0 &&
                    [...Array(lives)].map((i, index) => {
                      return <img src={heart} alt="<3" key={index} />;
                    })}
                </p>
              </div>
              {/* <p onClick={() => setButtonClick(buttonClick + 1)}>Start</p> */}
            </header>
            <div className="content-container">
              <div className="word-shuffle-container">
                <div className="word-shuffle">
                  {normal.split("").map((letter, index) => (
                    <button
                      key={Math.floor(Math.random() * 99999 + 1)}
                      onClick={() => {
                        if (!selected.includes(index)) {
                          setAnswer((newArry) => [...newArry, letter]);
                          console.log(answer);
                          setSelected((newArry) => [...newArry, index]);
                          console.log(selected);
                        }
                      }}
                      style={
                        selected.includes(index)
                          ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                          : { backgroundColor: "white" }
                      }>
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input">
                <p className="user-answer">{answer ? answer.join("") : null}</p>
                {selected.length > 0 && (
                  <button
                    onClick={() => {
                      setAnswer("");
                      setSelected("");
                    }}
                    className="clear">
                    clear
                  </button>
                )}
              </div>
              <div className="user-action">
                <button
                  onClick={() => {
                    shuffle(normal);
                    setAnswer("");
                    setSelected("");
                  }}
                  className="shuffle-btn">
                  Re-shuffle
                </button>
                <button onClick={handleSubmit} className="submit-btn">
                  Submit
                </button>
              </div>
            </div>
          </>
        )}

        {buttonClick == 0 && (
          <div className="lobby-container">
            <h1>Word Shuffle</h1>
            <button onClick={() => setButtonClick(buttonClick + 1)}>
              START GAME
            </button>
            <p>Developed by: Euro Abao</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
