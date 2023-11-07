import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    setItems([...items, inputText]);
    setInputText("");
  };

  return (
    <div className="App">
      <h3>꼬꼬단 - 꼬리의 꼬리를 무는 단어</h3>
      오늘의 꼬꼬단 영단어를 맞혀보세요.
      <div className="guess-wrapper">
        <input
          type="text"
          name="inputText"
          placeholder="추측할 단어를 입력하세요"
          value={inputText}
          onChange={handleInputChange}
        />
        <input type="submit" value="추측" id="guess-btn" onClick={handleAdd} />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>횟수</th>
              <th>단어</th>
              <th>뜻</th>
              <th>유사도</th>
              <th>순위</th>
            </tr>
            <tr>
              <td>
                <hr className="table-hr" />
              </td>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td>뜻</td>
                <td>유사도</td>
                <td>순위</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
