import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseclient';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

const CBTChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initializeChat = async () => {
      await fetchChats();
      const { data } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (data && data.length > 0) {
        setCurrentChatId(data[0].id);
      }
    };
    
    initializeChat();

    const chatsSubscription = supabase
      .channel('chats-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'chats' }, 
        () => {
          fetchChats();
        }
      )
      .subscribe();

    return () => {
      chatsSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentChatId) {
      fetchMessages(currentChatId);
    }
  }, [currentChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createNewChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('chats')
        .insert([{ 
          user_id: user.id, 
          title: 'New Chat' 
        }])
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        setCurrentChatId(data[0].id);
        setMessages([]);
        await fetchChats();
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .eq('chat_id', chatId);
      
      if (messagesError) throw messagesError;

      const { error: chatError } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);
      
      if (chatError) throw chatError;

      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setChats(remainingChats);

      if (currentChatId === chatId) {
        setMessages([]);
        if (remainingChats.length > 0) {
          setCurrentChatId(remainingChats[0].id);
        } else {
          setCurrentChatId(null);
        }
      }

      await fetchChats();
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let chatId = currentChatId;

      if (!chatId) {
        const { data: newChat, error } = await supabase
          .from('chats')
          .insert([{
            user_id: user.id,
            title: input.substring(0, 50)
          }])
          .select();

        if (error) throw error;
        chatId = newChat[0].id;
        setCurrentChatId(chatId);
        await fetchChats();
      }

      const userMessage = {
        role: 'user',
        content: input,
        chat_id: chatId,
        timestamp: new Date().toISOString()
      };

      const { error: messageError } = await supabase
        .from('messages')
        .insert([userMessage]);

      if (messageError) throw messageError;

      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      const response = await fetch('https://cerospace-backend-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          userId: user.id,
          chatId: chatId
        })
      });

      if (!response.ok) throw new Error('API call failed');
      
      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        chat_id: chatId,
        timestamp: data.timestamp
      };

      const { error: assistantError } = await supabase
        .from('messages')
        .insert([assistantMessage]);

      if (assistantError) throw assistantError;

      await fetchMessages(chatId);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-24">
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 hover:bg-gray-100 ${
                currentChatId === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <button
                onClick={() => setCurrentChatId(chat.id)}
                className="flex items-center gap-2 flex-grow text-left"
              >
                <MessageSquare size={20} />
                <span className="truncate">{chat.title}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Trash2 size={16} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CBTChatbot;