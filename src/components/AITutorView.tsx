import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  BookOpen, 
  Scale, 
  User, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { UserProfile } from '../types.ts';
import { api } from '../api.ts';

interface AITutorViewProps {
  user: UserProfile | null;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ user }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Halo ${user?.name || 'Rekan Mahasiswa'}! Saya adalah AI Socratic Tax Tutor Anda. Saya di sini bukan untuk memberikan jawaban instan, melainkan membimbing Anda menganalisis fakta, mencari dasar regulasi resmi (UU KUP, PPh, PPN, PMK-168/2023, PP 55/2022), dan menerapkan metode IRAC. Apa isu atau topik pajak yang ingin Anda diskusikan hari ini?`
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "Jelaskan PPh 21 TER PMK-168/2023 dengan sederhana.",
    "Saya tidak memahami perbedaan objek dan subjek pajak.",
    "Uji pemahaman saya tentang pengkreditan Faktur Pajak Masukan.",
    "Berikan saya kasus PPh 21 tingkat intermediate.",
    "Jangan berikan jawabannya, berikan saya petunjuk bertahap!"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await api.sendTutorChat(newMessages);
      if (res.success && res.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.text }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Maaf, terjadi kendala saat menghubungkan ke layanan penalaran AI. Silakan coba kembali dalam beberapa saat.' 
        }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Koneksi ke AI Tutor terputus. Pastikan koneksi internet stabil.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Sesi baru dimulai. Apa topik perpajakan yang ingin kita bedah, ${user?.name || 'Mahasiswa'}?`
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[750px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Socratic AI Tax Tutor</h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Anti-Halusinasi • Berbasis Hukum Pajak Positif Indonesia
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors text-xs flex items-center gap-1 font-semibold"
          title="Reset Sesi Chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div 
              key={idx}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`
                max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-wrap
                ${isUser 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-50 text-slate-900 border border-slate-200 shadow-2xs'}
              `}>
                {m.content}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  {user?.name?.[0] || 'U'}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl border border-slate-200 text-xs flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>AI Tutor sedang merumuskan pertanyaan Socratic & memverifikasi pasal...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-bold text-slate-400">Pintasan:</span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(qp)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form 
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={e => setInputPrompt(e.target.value)}
          placeholder="Tanyakan konsep, minta kasus, atau uji argumen hukum pajak..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading || !inputPrompt.trim()}
          className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
