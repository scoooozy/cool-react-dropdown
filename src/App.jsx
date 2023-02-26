import React from "react";
import "./App.css";
import { useState } from "react";


const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleClick}>
        <span className="selected">{selectedOption}</span>
        <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
      </div>
      <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={option === selectedOption ? "active" : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  const options = ["item 1", "item 2", "item 3", "item 4", "item 5"];

  return (
    <div className="App">
      <Dropdown options={options} />
    </div>
  );
}


