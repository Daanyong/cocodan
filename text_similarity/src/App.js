import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  // 입력받은 값 설정
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // 정규표현식을 통한 검사
    const isValid = /^[A-Za-z]+$/.test(inputValue);

    // 입력이 유효하지 않으면 경고 메시지 출력
    if (!isValid) {
      e.target.setCustomValidity("영문자만 입력 가능해요!");
    } else {
      e.target.setCustomValidity("");
      setInputText((prevInputText) => {
        return inputValue;
      }); //입력이 제대로 되면 저장
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault(); // 폼 제출 x

    // from 데이터 전송
    const Data = new FormData();
    Data.append("test", inputText);

    try {
      const response = await fetch("http://127.0.0.1:10021/result", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: Data,
      }).then((data) => {
        console.log(data); // 데이터 확인용
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Failed to fetch data",
          response.status,
          response.statusText,
          errorMessage
        );
        return;
      }

      const data = await response.json();
      setItems([...items, data]);
      setInputText("");
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }

    //fetchData();
  };

  // API를 호출, 데이터 받아옴
  // function fetchData() {
  //   const data = new URLSearchParams();
  //   data.append("inputText", inputText);

  //   fetch("/result", {
  //     method: "POST",
  //     body: data,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //     .then((response) => response.json()) // JSON 형식으로 변환
  //     .then((data) => {
  //       console.log(data); // 데이터 확인용
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }

  return (
    // 시간이 있을진 모르겠지만 아래 부분엔 페이지를 위한 간략한 설명 부분도 추가되어 있음 좋을 거 같습니다.
    <div className="App">
      <h3>꼬꼬단 - 꼬리에 꼬리를 무는 단어</h3>
      오늘의 꼬꼬단 영단어를 맞혀보세요. <br />
      꼬꼬단은 영어 실력 향상을 위한 서비스입니다. 토익 단어들로 구성되어
      있으며, 하루 하나의 단어가 제공됩니다. <br />
      꼬꼬단은 여러분의 영어 공부를 응원합니다!!
      <form onSubmit={handleAdd}>
        <div className="guess-wrapper">
          <input
            type="text"
            name="inputText"
            className="inputText"
            placeholder="추측할 단어를 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            maxLength={20}
            required
          />
          <input
            type="submit"
            value="추측"
            className="w-btn w-btn-green"
            id="guess-btn"
          />
        </div>
        <div>정답입니다! 오늘의 단어는 ~~입니다.</div>
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
          <tbody>
            {items.length > 0 && (
              <tr className="recent">
                <td>{items.length}</td>
                <td>{items[items.length - 1].inputText}</td>
                <td>{items[items.length - 1].translated}</td>
                <td>{items[items.length - 1].simlity}</td>
                <td>순위</td>
              </tr>
            )}
            <tr>
              <td>
                <hr className="table-hr" />
              </td>
            </tr>
          </tbody>
          <tbody>
            {items
              .sort((a, b) => b.similarity - a.similarity)
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.inputText}</td>
                  <td>{item.translated}</td>
                  <td>{item.simlity}</td>
                  <td>{index}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
