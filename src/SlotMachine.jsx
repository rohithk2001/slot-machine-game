import React, { useState } from "react";
import { motion } from "framer-motion";
import { getRandomReward } from "./rewards";
import Confetti from "react-confetti";

const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSpin = () => {
    setSpinning(true);
    setShowResults(false);

    // Simulate spinning for reels
    setTimeout(() => {
      const newResults = [getRandomReward(), getRandomReward(), getRandomReward()];
      setResults(newResults);

      // Delay showing results for suspense
      setTimeout(() => {
        setSpinning(false);
        setShowResults(true);
      }, 500); // Slight delay for suspense
    }, 2000); // Spin duration
  };

  // Reset the game
  const resetGame = () => {
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="slot-machine">
      <h1> 🎰 Slot Machine Mini-Game 🎰</h1>

      {/* Customized Confetti */}
      {showResults && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200} // Adjust amount of confetti
          gravity={0.3} // Slower falling confetti
          colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]} // Custom colors
        />
      )}

      {/* Container for the Slot Machine Reels */}
      <div className="slot-machine-container">
        <div className="reels">
          {["Reel 1", "Reel 2", "Reel 3"].map((_, index) => {
            let yAnimation = [];
            // Set up the animation pattern for each reel
            if (index === 0) {
              // Reel 1 goes up (goes up and down twice its height)
              yAnimation = ["0px", "20px", "0"];
            } else if (index === 1) {
              // Reel 2 goes down (goes down and up twice its height)
              yAnimation = ["0px", "-20px", "0px"];
            } else {
              // Reel 3 goes up (goes up and down twice its height)
              yAnimation = ["0px", "20px", "0px"];
            }

            return (
              <motion.div
                key={index}
                className="reel"
                animate={{
                  y: spinning ? yAnimation : "0px",
                }}
                transition={{
                  duration: 0.5,
                  repeat: spinning ? 3 : 0, // Repeat 3 times
                  repeatType: "loop", // Loop the animation
                  ease: "easeInOut",
                }}
              >
                <div className="slot-box">
                  {showResults ? (
                    <p className="slot-result">
                      {results[index]?.type} - {results[index]?.count}
                    </p>
                  ) : (
                    <p className="slot-result">?</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <button className="spin-button" onClick={handleSpin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {showResults && (
        <div className="results">
          <h3>🎉Congratulations! You Won🎉</h3>
          {results.map((result, index) => (
            <p
              key={index}
              style={{
                fontWeight: "bold",
                color: result.rarity === "Epic" ? "purple" : "black",
              }}
            >
              {result.type} - {result.rarity} - x{result.count}
            </p>
          ))}
        </div>
      )}

      {/* Reset Button */}
      {showResults && (
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      )}
    </div>
  );
};

export default SlotMachine;
