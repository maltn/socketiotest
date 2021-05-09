import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io.connect(`${process.env.REACT_APP_ADDRESS}`)

function App() {
  const [messages, setMessages] = useState<any[]>([])
  const inputField = useRef<any>()


  useEffect(() => {
    socket.on("message", (data:any) => {
      setMessages(x => [data, ...x])
      console.log("Message received: ", JSON.stringify(data))
    })
  }, [])

  const sendMessage = () => {
    const msg = inputField.current.value
    console.log("Sent: " + msg)
    msg.length > 0 && socket.emit("message", msg) 
  }

  return (
    <div className="container">
      <div id="contentWrapper">
        {messages.map((x,i) => {
          return(
            <React.Fragment key={i}>
              {x.senderid === socket.id ? 
              <div className="self">{x.msg}</div>
              :
              <div className="sender">{x.msg}</div>
              }
            </React.Fragment>
          )
        })}
      </div>
      <div id="messageWrapper">
        <form onSubmit={(e) => {e.preventDefault(); sendMessage()}}>
          <input id="inputField" ref={inputField} type="text" />
          <input onClick={sendMessage} id="sendBttn" type="button" value="Send"/>
        </form>
      </div>
    </div>
  );
}

export default App;