import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck,
  Calendar,
  Layers,
  Filter
} from 'lucide-react';
import { TaxRegulation } from '../types.ts';
import { api } from '../api.ts';

export const RegulationsView: React.FC = () => {
  const [regulations, setRegulations] = useState<TaxRegulation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaxType, setSelectedTaxType] = useState('All');
  const [selectedReg, setSelectedReg] = useState<TaxRegulation | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegulations();
    loadBookmarks();
  }, [searchQuery, selectedTaxType]);

  const loadRegulations = async () => {
    try {
      setLoading(true);
      const res = await api.getRegulations({
        q: searchQuery || undefined,
        taxType: selectedTaxType !== 'All' ? selectedTaxType : undefined,
      });
      setRegulations(res.regulations || []);
      if (res.regulations && res.regulations.length > 0 && !selectedReg) {
        setSelectedReg(res.regulations[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = async () => {
    try {
      const res = await api.getBookmarks();
      const ids = (res.bookmarks || [])
        .filter((b: any) => b.type === 'regulation')
        .map((b: any) => b.referenceId);
      setBookmarkedIds(ids);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBookmark = async (regId: string) => {
    try {
      if (bookmarkedIds.includes(regId)) {
        // remove
        setBookmarkedIds(prev => prev.filter(id => id !== regId));
      } else {
        await api.addBookmark('regulation', regId);
        setBookmarkedIds(prev => [...prev, regId]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
            OFFICIAL INDONESIAN TAX REPOSITORY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Regulation Library (Anti-Halusinasi)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Database undang-undang dan peraturan menteri keuangan resmi bersumber dari JDIH Kemenkeu dan DJP.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Terverifikasi JDIH Pemerintah RI</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari nomor aturan, pasal, kata kunci..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'PPh', 'PPN', 'KUP', 'Pajak Daerah'].map(tax => (
            <button
              key={tax}
              onClick={() => setSelectedTaxType(tax)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                selectedTaxType === tax ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tax}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Regulations List (4 cols) & Detail Dossier (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Regulations list */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
          {regulations.map(r => {
            const isSelected = selectedReg?.id === r.id;
            const isBookmarked = bookmarkedIds.includes(r.id);

            return (
              <div
                key={r.id}
                onClick={() => setSelectedReg(r)}
                className={`
                  p-4 rounded-2xl border transition-all cursor-pointer space-y-2
                  ${isSelected 
                    ? 'bg-blue-50/70 border-blue-600 shadow-xs ring-1 ring-blue-600' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {r.taxType}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {r.activeStatus}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(r.id);
                      }}
                      className="text-slate-400 hover:text-amber-500"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {r.number}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {r.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Regulation Detail Dossier */}
        {selectedReg && (
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {selectedReg.topic}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedReg.number}</h3>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Status Keberlakuan</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedReg.activeStatus}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-800 block">Nama Lengkap Regulasi:</span>
              <p className="text-slate-700 leading-relaxed font-sans">{selectedReg.name}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">Ringkasan Materi Muatan:</span>
              <p className="text-slate-700 leading-relaxed">{selectedReg.summary}</p>
            </div>

            {/* Key Articles List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Pasal-Pasal Kunci:</span>
              <div className="space-y-2">
                {selectedReg.keyArticles.map((art, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <span className="font-mono font-bold text-blue-700 block text-[11px]">
                      {art.article}
                    </span>
                    <p className="text-slate-700 leading-relaxed font-sans">{art.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Source and Verification Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Terakhir diperiksa: <strong>{selectedReg.lastCheckedDate}</strong></span>
              </div>

              <a
                href={selectedReg.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors flex items-center gap-1.5 text-xs"
              >
                <span>Lihat Dokumen Asli ({selectedReg.source})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
