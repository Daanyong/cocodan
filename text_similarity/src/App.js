import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  // 입력받은 값 설정
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = async (e) => {
    e.preventDefault(); // 폼 제출 x

    // from 데이터 전송
    const Data = new FormData();
    Data.append("inputText", inputText);

    const response = await fetch("http://shogle.site:10021/result", {
      method: "POST",
      body: Data,
    });

    if (response.ok) {
      const data = await response.json();
      // 전달 잘 됐을 때 저장
      setItems([...items, data]);
      setInputText("");
    } else {
      console.error("Failed to fetch data");
    }
  };

  const handleInvalidInput = (e) => {
    e.target.setCustomValidity("영문자만 입력 가능해요!");
  };

  // API를 호출, 데이터 받아옴
  function fetchData() {
    const data = new URLSearchParams();
    data.append("inputText", inputText);

    fetch("http://shogle.site:10021/", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json()) // JSON 형식으로 변환
      .then((data) => {
        console.log(data); // 데이터 확인용
      })
      .catch((error) => console.error("Error:", error));
  }

  fetchData();

  return (
    // 시간이 있을진 모르겠지만 아래 부분엔 페이지를 위한 간략한 설명 부분도 추가되어 있음 좋을 거 같습니다.
    <div className="App">
      <h3>꼬꼬단 - 꼬리의 꼬리를 무는 단어</h3>
      오늘의 꼬꼬단 영단어를 맞혀보세요.
      <form onSubmit={handleAdd}>
        <div className="guess-wrapper">
          <input
            type="text"
            name="inputText"
            className="inputText"
            placeholder="추측할 단어를 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            pattern="[A-Za-z]+"
            maxLength={20}
            onInvalid={handleInvalidInput}
            required
          />
          <input
            type="submit"
            value="추측"
            className="w-btn w-btn-green"
            id="guess-btn"
          />
        </div>
      </form>
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
          </thead>
          {items.length > 0 && (
            <tbody>
              <tr className="recent">
                <td>{items.length}</td>
                <td>{items[items.length - 1].inputText}</td>
                <td>{items[items.length - 1].translated}</td>
                <td>{items[items.length - 1].simlity}</td>
                <td>순위</td>
              </tr>
            </tbody>
          )}
          <tr>
            <td>
              <hr className="table-hr" />
            </td>
          </tr>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.inputText}</td>
                <td>{item.translated}</td>
                <td>{item.simlity}</td>
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
