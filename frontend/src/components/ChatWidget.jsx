import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChatAlt2, HiX, HiPaperAirplane, HiInformationCircle } from 'react-icons/hi';

const API_URL = 'http://localhost:8000/chat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: chatHistory
        }),
      });

      if (!response.ok) throw new Error('Failed to connect to AI server');

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat Error:', err);
      setError('I am currently offline. Please ensure the AI backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];
    let inTable = false;
    let tableRows = [];
    let inList = false;
    let listItems = [];

    const renderTextWithBolding = (text) => {
      if (!text) return null;
      return text.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-black text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    const flushTable = (key) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(2);
        elements.push(
          <div key={`table-${key}`} className="overflow-x-auto my-2 border border-white/10 rounded-lg">
            <table className="min-w-full text-xs text-left">
              <thead className="bg-white/10 text-white uppercase font-black tracking-wider">
                <tr>
                  {header.split('|').filter(c => c.trim()).map((cell, i) => (
                    <th key={i} className="px-3 py-2 border-b border-white/10">{renderTextWithBolding(cell.trim())}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {body.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    {row.split('|').filter(c => c.trim()).map((cell, j) => (
                      <td key={j} className="px-3 py-2 text-white/70">{renderTextWithBolding(cell.trim().replace(/<br\s*\/?>/gi, '\n'))}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc list-inside space-y-1 my-2 text-white/80">
            {listItems.map((item, i) => <li key={i}>{renderTextWithBolding(item)}</li>)}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('|')) {
        if (inList) flushList(i);
        inTable = true;
        tableRows.push(line);
        return;
      } else if (inTable) {
        flushTable(i);
      }

      if (trimmed.startsWith('- ')) {
        if (inTable) flushTable(i);
        inList = true;
        listItems.push(trimmed.slice(2));
        return;
      } else if (inList) {
        flushList(i);
      }

      if (trimmed.startsWith('### ')) {
        elements.push(<h4 key={i} className="font-display font-black text-xs uppercase tracking-widest text-hero-red mt-4 mb-2">{trimmed.slice(4)}</h4>);
        return;
      }

      if (trimmed) {
        elements.push(
          <div key={i} className="mb-1 leading-relaxed">
            {renderTextWithBolding(line)}
          </div>
        );
      } else if (!inTable && !inList) {
        elements.push(<div key={i} className="h-2" />);
      }
    });

    if (inTable) flushTable('final');
    if (inList) flushList('final');

    return elements;
  };
   

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-sans">
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-hero-red rounded-full flex items-center justify-center text-white shadow-2xl shadow-hero-red/40 relative z-10"
      >
        {isOpen ? <HiX className="text-3xl" /> : <HiChatAlt2 className="text-3xl" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-hero-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-hero-red to-red-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <HiChatAlt2 className="text-xl" />
                </div>
                <div>
                  <h3 className="font-display font-black uppercase text-sm tracking-widest italic">Kagal Bykes AI</h3>
                  <p className="text-[10px] text-white/70 uppercase font-bold tracking-tighter">Powered by LangGraph</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {chatHistory.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                    <HiInformationCircle className="text-4xl" />
                  </div>
                  <p className="text-white/40 text-sm">Hello! I'm your Kagal Bykes assistant. How can I help you today?</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-hero-red text-white rounded-tr-none shadow-lg' 
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'
                  }`}>
                    {formatMessage(msg.content)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-hero-red rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-hero-red rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-hero-red rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about bikes, service, offers..."
                  className="w-full bg-hero-dark/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-hero-red transition-all"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-hero-red flex items-center justify-center text-white disabled:opacity-50 disabled:bg-white/10 transition-all"
                >
                  <HiPaperAirplane className="rotate-90" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
