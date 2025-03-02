// =============================================================================
// Chat Agent with User & Agent Bubbles (React + Vercel)
//
// This React component renders a chat interface where users can type messages
// and receive responses from an agent via a serverless API endpoint on Vercel.
// Messages are displayed in styled chat bubbles to clearly differentiate between
// user messages (right-aligned) and agent messages (left-aligned).
//
// Key Features:
// - Maintains a conversation history.
// - Displays each message in a styled bubble.
// - Sends user messages to the API and appends the agent's response (rendered as Markdown) to the chat.
// - Automatically scrolls to the latest message in a scrollable parent container.
// - Animates the submit button while the agent is "thinking".
// - Provides detailed comments for ease of understanding.
//
// Author: [Your Name]
// Date: [Today's Date]
// =============================================================================

import { useState, useEffect, useRef } from "react";
// Import react-markdown to render markdown content.
import ReactMarkdown from "react-markdown";

export default function AgentComponent() {
  // State to store the user's current input from the text field.
  const [message, setMessage] = useState("");

  // State to store the conversation as an array of message objects.
  // Each message object has a role ("user" or "agent") and the message content.
  const [conversation, setConversation] = useState([]);

  // State to capture any errors during the API request.
  const [error, setError] = useState(null);

  // State to track if the agent is processing (loading state).
  const [isLoading, setIsLoading] = useState(false);

  // Create a ref to track the end of the messages container.
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat container.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use an effect to scroll to the latest message whenever the conversation updates.
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Function to handle the form submission when the user sends a message.
  const handleSubmit = async (e) => {
    // Prevent the default form behavior of reloading the page.
    e.preventDefault();

    // Clear any previous errors.
    setError(null);

    // If the message is empty, do nothing.
    if (!message.trim()) return;

    // Create a new conversation entry for the user's message.
    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    // Update the conversation state by adding the user's message.
    setConversation((prev) => [...prev, userMessage]);

    // Prepare the payload for the API call.
    // Note: In production, user_id and session_id should be uniquely generated.
    const payload = {
      data: {
        message: userMessage,
      },
      stateful: true,
      stream: false,
      user_id: "userID_RandomID",
      session_id: "sessionID_RandomID",
      verbose: false,
    };

    try {
      // Set loading state to true to trigger the animation.
      setIsLoading(true);

      // Send a POST request to the serverless API endpoint on Vercel.
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // If the server response is not OK, throw an error.
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Parse the JSON response from the API.
      const data = await res.json();

      // Extract the agent's reply from output_data.content.
      // If output_data or content is missing, fall back to a default message.
      const agentReply =
        data.output_data && data.output_data.content
          ? data.output_data.content
          : "No valid response received from agent.";

      // Create a new conversation entry for the agent's response.
      const agentMessage = {
        role: "agent",
        content: agentReply,
      };

      // Update the conversation state by adding the agent's message.
      setConversation((prev) => [...prev, agentMessage]);

      // Clear the user input field.
      setMessage("");
    } catch (err) {
      // Log the error to the console for debugging.
      console.error("Error fetching agent response:", err);
      // Update the error state so that the user is informed.
      setError(err.message);
    } finally {
      // Reset the loading state regardless of success or error.
      setIsLoading(false);
    }
  };

  // Inline style objects for chat bubbles based on the message role.
  // User messages: right-aligned with a light green background.
  // Agent messages: left-aligned with a light gray background.
  const bubbleStyles = {
    user: {
      alignSelf: "flex-end",
      backgroundColor: "#DCF8C6",
      color: "#000",
      padding: "10px",
      borderRadius: "10px 0 0 10px",
      borderRight: "5px solid #8EDB5A",
      margin: "0",
      maxWidth: "80%",
    },
    agent: {
      alignSelf: "flex-start",
      backgroundColor: "#fff",
      color: "#000",
      padding: "10px",
      borderRadius: "0 10px 10px 0",
      borderLeft: "5px solid #aaf",
      margin: "0",
      maxWidth: "80%",
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Descriptive header for the chat application */}
      <header style={{ marginBottom: "20px", userSelect: "none" }}>
        <h1>Chat with Our Agent</h1>
        <p>
          Welcome to our chat interface! Type your message below to start a
          conversation. Your messages and our agent’s responses will appear as
          chat bubbles.
        </p>
      </header>

      {/* Chat conversation container displaying messages in bubbles */}
      <div
        className="chat-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginBottom: "0px",
          maxHeight: "600px", // Set a fixed height for the chat container
          overflowY: "auto", // Enable vertical scrolling
          border: "1px solid #ccc", // Optional: border around the chat area
          padding: "0px",
          borderRadius: "5px 5px 0 0",
          backgroundColor: "#eee",
        }}
      >
        {conversation.map((msg, index) => (
          <div
            key={index}
            style={msg.role === "user" ? bubbleStyles.user : bubbleStyles.agent}
          >
            {msg.role === "agent" ? (
              // Render the agent's response as Markdown.
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              // Display user messages as plain text.
              msg.content
            )}
          </div>
        ))}
        {/* Dummy element to ensure the latest message is scrolled into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input form for the user to send messages */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            width: "100%",
            borderBottom: "1px solid #ccc",
            borderLeft: "1px solid #ccc",
            borderRight: "1px solid #ccc",
            borderRadius: "0 0 5px 5px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            id="message"
            placeholder="Chat with this agent..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "10px",
              border: "none",
              outline: "none",
              backgroundColor: "#fff",
            }}
          />
          <button
            type="submit"
            aria-label="Send prompt"
            data-testid="send-button"
            disabled={isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              transition: "opacity 0.2s ease",
              backgroundColor: isLoading ? "#000" : "#000",
              color: isLoading ? "#f4f4f4" : "#fff",
              height: "36px",
              width: "36px",
              border: "5px solid #fff",
              cursor: isLoading ? "default" : "pointer",
            }}
          >
            {!isLoading ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 50 50"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#888"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeDasharray="31.4 31.4"
                  fill="none"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Display error message if one occurs */}
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Define keyframes for the spin animation */}
      <style jsx>{`
        .chat-container::-webkit-scrollbar {
          width: 8px; /* Make scrollbar thinner */
        }
        .chat-container::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 5px; /* Ensures the track has rounded corners */
        }
        .chat-container::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 5px;
        }
        /* Firefox scrollbar styling */
        .chat-container {
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
