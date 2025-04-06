import './AIAssistant.css';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAI, setGenAI] = useState(null);

  useEffect(() => {
    const genAI = new GoogleGenerativeAI("AIzaSyAoHuf7gmVhCQS8Cj2YEVYOpBtzEDV-z0Y");
    setGenAI(genAI);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !genAI) return;

    const userMessage = { role: 'user', content: message };
    setConversation([...conversation, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are a travel and finance assistant. Help with this request: ${message}
      Focus on providing practical travel advice, budget recommendations, and specific suggestions.
      If the user asks about a destination, include tips about local attractions, estimated costs, and best times to visit.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      const aiResponse = {
        role: 'assistant',
        content: text
      };

      setConversation(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.'
      };
      setConversation(prev => [...prev, errorResponse]);
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
              className={`chat-bubble-row ${
                msg.role === 'user' ? 'chat-user' : 'chat-ai'
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.role === 'user' ? 'user-msg' : 'ai-msg'
                }`}
              >
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
          <button
            type="submit"
            disabled={isLoading}
            className={`chat-send-btn ${isLoading ? 'disabled' : ''}`}
          >
            <Send className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;
