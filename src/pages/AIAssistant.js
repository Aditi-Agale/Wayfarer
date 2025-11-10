import './AIAssistant.css';
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';



function AIAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setConversation((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://krdgqd1cl0.execute-api.ap-south-1.amazonaws.com/default/wayfarer-ai-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a helpful and concise AI Travel Assistant. You can help users with:
• Planning trip itineraries
• Destination recommendations
• Budget planning and tips
• Local attractions and activities
• Travel safety advice

Please respond with clear and friendly travel advice.`,
            },
            ...conversation,
            { role: 'user', content: message },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      const aiMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || "I'm not sure, please try again.",
      };

      setConversation((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Mistral API Error:', err);
      const aiMessage = {
        role: 'assistant',
        content: "Sorry, I couldn't process your request. Please try again.",
      };
      setConversation((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <div className="ai-box">
        <div className="ai-header">
          <MessageSquare className="icon-blue" />
          <h1>AI Travel Assistant</h1>
        </div>

        <div className="chat-window">
          {conversation.length === 0 && (
            <div className="chat-intro">
              <p>Hello! I'm your AI travel assistant. I can help you with:</p>
              <ul>
                <li>• Planning trip itineraries</li>
                <li>• Destination recommendations</li>
                <li>• Budget planning and tips</li>
                <li>• Local attractions and activities</li>
                <li>• Travel safety advice</li>
              </ul>
            </div>
          )}

          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble-row ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`}
            >
              <div className={`chat-bubble ${msg.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-ai">
              <div className="chat-bubble ai-msg">
                <div className="thinking">Thinking...</div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about trip planning, budgeting, or recommendations..."
            className="chat-input"
          />
          <button type="submit" disabled={isLoading} className="chat-send-btn">
            <Send className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;

