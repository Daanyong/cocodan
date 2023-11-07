import "./App.css";

function App() {
  return (
    <div className="App">
      <h3>꼬꼬단 - 꼬리의 꼬리를 무는 단어</h3>
      오늘의 꼬꼬단 영단어를 맞혀보세요.
      <form>
        <div className="guess-wrapper">
          <input placeholder="추측할 단어를 입력하세요" />
          <input type="submit" value="추측" id="guess-btn" />
        </div>
      </form>
      <div>
        <table>
          <tbody>
            <tr>
              <th>횟수</th>
              <th>단어</th>
              <th>뜻</th>
              <th>유사도</th>
              <th>순위</th>
            </tr>
            <tr>
              <td>
                <hr></hr>
              </td>
            </tr>
            <tr>
              <td>횟수</td>
              <td>단어</td>
              <td>뜻</td>
              <td>유사도</td>
              <td>순위</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
