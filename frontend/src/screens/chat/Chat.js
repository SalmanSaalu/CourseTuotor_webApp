
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChatRoomAction } from "../../actions/ChatRoomActions";
import "./Chat.css";
import { CgProfile } from "react-icons/cg";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { chatRoomDetails } = useSelector((state) => state.chatRoomData);

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // The URL contains the other participant's numeric Django User ID.
  const otherUserId = Number(id);

  // Pass the other participant's username through navigation state.
  const peerName = location.state?.teacherName || "Chat";

  // Create/find the database chat room using the username.
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }

    if (!Number.isInteger(otherUserId) || otherUserId <= 0) {
      return;
    }

    const username = location.state?.teacherName;

    if (!username) {
      // The chat page needs the other participant's username
      // for the existing ChatRoomAction API.
      return;
    }

    dispatch(ChatRoomAction(username));
  }, [dispatch, userInfo, navigate, otherUserId, location.state]);

  // Open one WebSocket connection for this participant.
  useEffect(() => {
    if (!userInfo || !Number.isInteger(otherUserId) || otherUserId <= 0) {
      return;
    }

    const newSocket = new WebSocket(
      `ws://localhost:8000/chat/${otherUserId}?token=${userInfo.token}`
    );

    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((previous) => [...previous, data]);
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      newSocket.close();
    };
  }, [userInfo, otherUserId]);

  const dateTime = (date) => {
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      weekday: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim() || !socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const data = {
      message: message.trim(),
      username: userInfo.username,
      dateDetails: dateTime(new Date()),
    };

    socket.send(JSON.stringify(data));
    setMessage("");
  };

  if (!userInfo) {
    return <p>Please log in to use chat.</p>;
  }

  return (
    <div>
      <p className="teacherName">
        <CgProfile />&nbsp;&nbsp;{peerName}
      </p>

      <div className="container">
        <div className="allMessage">
          {messages.map((item, index) => (
            <div key={index} style={{ marginTop: "10px", overflow: "auto" }}>
              {userInfo.username === item.username ? (
                <div
                  className="talk-bubble tri-right round right-in"
                  style={{
                    borderRadius: "35px",
                    width: "40%",
                    height: "auto",
                    float: "right",
                    marginRight: "2rem",
                  }}
                >
                  <div className="talktext">
                    <p className="message">{item.message}</p>
                  </div>
                  <p className="date">{item.dateDetails}</p>
                </div>
              ) : (
                <div
                  className="talk-bubble tri-right left-in"
                  style={{
                    borderRadius: "35px",
                    width: "40%",
                    height: "auto",
                    float: "left",
                    marginLeft: "2rem",
                  }}
                >
                  <div className="talktext">
                    <p className="message">{item.message}</p>
                  </div>
                  <p className="date">{item.dateDetails}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          bottom: "0px",
          position: "absolute",
          width: "100%",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            className="message"
            style={{ color: "black" }}
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
