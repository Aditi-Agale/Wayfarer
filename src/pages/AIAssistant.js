import './AIAssistant.css';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'GEMINI_API_KEY'; // Replace this with your real key

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAI, setGenAI] = useState(null);

  useEffect(() => {
    const ai = new GoogleGenerativeAI(API_KEY);
    setGenAI(ai);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !genAI) return;
  
    const userMessage = { role: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
  
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{
              text: `You are a helpful and concise AI Travel Assistant. You can help users with:
  • Planning trip itineraries
  • Destination recommendations
  • Budget planning and tips
  • Local attractions and activities
  • Travel safety advice
  
  Please respond with clear and friendly travel advice.`
            }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      });
  
      const result = await chat.sendMessage(message);
      const text = await result.response.text();
  
      const aiMessage = { role: 'assistant', content: text };
      setConversation(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Gemini AI Error:', err);
      const aiMessage = {
        role: 'assistant',
        content: "Sorry, I couldn't process your request. Please try again."
      };
      setConversation(prev => [...prev, aiMessage]);
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
