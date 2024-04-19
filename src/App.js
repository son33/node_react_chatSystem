import {useEffect, useState} from "react";
import "./App.css";
import socket from"./server";
import InputField from "./components/InputField/InputField"
import MessageContainer from "./components/MessageContainer/MessageContainer"

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  useEffect(()=>{
    socket.on("message",(message)=>{
      setMessageList((prevState)=> prevState.concat(message));
    });
    askUserName();
  },[]);
  // 채팅방 참가
  const askUserName = ()=>{
    const userName = prompt("이름을 입력하세요");
    socket.emit("login", userName,(res)=>{
      if(res?.ok){
        setUser(res.data);
      }
    });
  };
  // 메세지 보내기
  const sendMessage=(e)=>{
    e.preventDefault()
    socket.emit("sendMessage", message,(res)=>{
      console.log("sendMessage res", res);
    })
  }
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
