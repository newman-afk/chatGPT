import axios from "axios";
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [testResult, setTestResult] = useState("");
  const [testApiKey, setTestApiKey] = useState("");
  const [isTestApiKeySuccess, setIsTestApiKeySuccess] = useState(false);

  const XRapidAPIKey = isTestApiKeySuccess
    ? testApiKey
    : process.env.REACT_APP_X_RapidAPI_Key;
  const options = {
    method: "POST",
    url: "https://you-chat-gpt.p.rapidapi.com/TextOnly",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${XRapidAPIKey}`,
      "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com",
    },
    data: `{"question":"${question}","max_response_time":20}`,
  };
  const testOptions = {
    method: "GET",
    url: "https://you-chat-gpt.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Key": `${testApiKey}`,
      "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com",
    },
  };
  function askQueation(e) {
    e.preventDefault();
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAnswer(response.data.answer);
        setResponseTime(response.data.response_elapsed_time);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function handleTestApiKey() {
    axios
      .request(testOptions)
      .then(function (response) {
        setTestResult(response.data.content);
        setIsTestApiKeySuccess(true);
        console.log(answer);
      })
      .catch(function (error) {
        console.error(error);
        setTestResult(error.message);
        setIsTestApiKeySuccess(false);
      });
  }
  return (
    <>
      <div className="app">
        <h1 className="title">ChatGPT</h1>
        <p>本站使用You Chat GPT免费API,100次请求/月，请勿挥霍，假装感激！</p>
        <p>
          点击{" "}
          <a
            href="https://rapidapi.com/florianbreut/api/you-chat-gpt"
            target="_blank"
            rel="noreferrer"
          >
            You Chat API 链接
          </a>{" "}
          可免费注册获取个人API
          KEY,粘贴至下方测试按钮左边框点击测试，成功后即可使用。提示：测试结果见提交按钮上方文本框。
        </p>
        <p>也可以跳过直接输入问题进行互动，真的没事的</p>
        <div className="input-control">
          <input
            type="text"
            placeholder="X-RapidAPI-Key"
            value={testApiKey}
            onChange={(e) => setTestApiKey(e.target.value)}
          />
          <button
            onClick={() => handleTestApiKey()}
            disabled={testApiKey === "" ? true : false}
          >
            测试
          </button>
        </div>
        <div className="input-control">
          <label htmlFor="testResult">测试结果: </label>
          <input type="text" id="testResult" value={testResult} />
        </div>
        <form onSubmit={(e) => askQueation(e)}>
          <label htmlFor="question">问题总长度无法超过100字节 免费的嘛</label>
          <textarea
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入问题"
            maxLength={100}
          />
          <label htmlFor="answer">响应时间：{responseTime} s</label>
          <textarea
            type="text"
            id="answer"
            placeholder="ChatGPT回复"
            disabled={true}
            value={answer}
          />
          <button disabled={question.length === 0 ? true : false}>提交</button>
        </form>
      </div>
    </>
  );
}

export default App;
