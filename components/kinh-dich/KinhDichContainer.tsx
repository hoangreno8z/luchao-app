'use client';

import { useState, useEffect } from 'react';
import DisclaimerCard from './DisclaimerCard';
import LiveClock from './LiveClock';
import ContactPanel from './ContactPanel';
import CoinTossStage from './CoinTossStage';
import ManualInputStage from './ManualInputStage';
import HexagramResultCard from './HexagramResultCard';
import { calculateHexagramData, HexagramData } from '@/lib/engines/ichingCore';
import { calculateCanChi } from '@/lib/engines/calendarCore';

const STORAGE_KEY = 'luchao_app_state_v2';

interface SavedState {
  acceptedTerms: boolean;
  method: 'toss' | 'manual';
  hexLines: number[];
  dateTime: string;
  isFinished: boolean;
}

export default function KinhDichContainer() {
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [method, setMethod] = useState<'toss' | 'manual'>('toss');
  const [hexLines, setHexLines] = useState<number[]>([]);
  const [dateTime, setDateTime] = useState<string>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [hexData, setHexData] = useState<HexagramData | null>(null);

  // Restore saved state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        setAcceptedTerms(parsed.acceptedTerms ?? false);
        setMethod(parsed.method ?? 'toss');
        setHexLines(parsed.hexLines ?? []);
        setDateTime(parsed.dateTime ?? '');
        setIsFinished(parsed.isFinished ?? false);

        if (parsed.isFinished && parsed.hexLines && parsed.hexLines.length === 6) {
          const dVal = parsed.dateTime || new Date().toISOString().slice(0, 16);
          const cal = calculateCanChi(dVal);
          const data = calculateHexagramData(parsed.hexLines, cal, 'Lục hào', dVal);
          setHexData(data);
        }
      }
    } catch (e) {
      console.warn('Lỗi khi khôi phục trạng thái từ localStorage:', e);
    }
  }, []);

  // Persist state to localStorage whenever key values change
  useEffect(() => {
    try {
      const stateToSave: SavedState = {
        acceptedTerms,
        method,
        hexLines,
        dateTime,
        isFinished,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Lỗi khi lưu trạng thái vào localStorage:', e);
    }
  }, [acceptedTerms, method, hexLines, dateTime, isFinished]);

  const handleFinishHexagram = (lines: number[], dStr: string) => {
    setHexLines(lines);
    setDateTime(dStr);
    setIsFinished(true);

    const cal = calculateCanChi(dStr);
    const data = calculateHexagramData(lines, cal, 'Lục hào', dStr);
    setHexData(data);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHexLines([]);
    setIsFinished(false);
    setHexData(null);
  };

  if (!acceptedTerms) {
    return <DisclaimerCard onProceed={() => setAcceptedTerms(true)} />;
  }

  return (
    <div className="w-full flex flex-col gap-6" role="region" aria-label="Gieo quẻ Kinh Dịch Lục Hào">
      <LiveClock />

      {!isFinished ? (
        <div className="w-full bg-[#160f08]/90 border border-[#3d2a19] rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex border-b border-[#dfb15b]/20 pb-3 mb-6 gap-3">
            <button
              onClick={() => setMethod('toss')}
              aria-label="Chuyển sang phương pháp Tung xu trực tuyến"
              className={`flex-1 py-3 px-4 font-bold text-xs md:text-sm rounded-lg border transition-all ${
                method === 'toss'
                  ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-md'
                  : 'bg-black/30 border-[#3d2a19] text-[#bda287] hover:text-white'
              }`}
            >
              Tung Xu Trực Tuyến
            </button>
            <button
              onClick={() => setMethod('manual')}
              aria-label="Chuyển sang phương pháp Tự nhập 6 hào"
              className={`flex-1 py-3 px-4 font-bold text-xs md:text-sm rounded-lg border transition-all ${
                method === 'manual'
                  ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-md'
                  : 'bg-black/30 border-[#3d2a19] text-[#bda287] hover:text-white'
              }`}
            >
              Tự Nhập 6 Hào
            </button>
          </div>

          {method === 'toss' ? (
            <CoinTossStage onFinish={handleFinishHexagram} initialLines={hexLines} />
          ) : (
            <ManualInputStage onFinish={handleFinishHexagram} />
          )}
        </div>
      ) : (
        hexData && <HexagramResultCard data={hexData} onReset={handleReset} />
      )}

      <ContactPanel />
    </div>
  );
}
