import React from "react";

function Modal({ handleNext, status, answer, message }) {
  return (
    <div className="modal">
      <h1 className={status}>{answer}</h1>
      <p>{message}</p>
      <div>
        <button className={status} onClick={handleNext}>
          Next Word
        </button>
      </div>
    </div>
  );
}

export default Modal;
