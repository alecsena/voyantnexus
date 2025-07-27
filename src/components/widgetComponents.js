import React, { useState, useEffect } from 'react';
import { mockData } from './mockData';

// --- Widgets de Visualização (Reativos) ---

const WordCloudWidget = ({ corpus, filters }) => {
    const [displayWords, setDisplayWords] = useState([]);

    useEffect(() => {
        const baseWords = mockData[corpus]?.words || [];
        if (filters.date.end && parseInt(filters.date.end, 10) < 2000) {
            setDisplayWords(mockData.corpus2.words);
        } else {
            setDisplayWords(baseWords);
        }
    }, [corpus, filters]);

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 h-full transition-all duration-500">
            {displayWords.map(word => (
                <span key={word.text} style={{ fontSize: word.size, color: word.color, transition: 'all 0.5s' }}>
                    {word.text}
                </span>
            ))}
        </div>
    );
};

const TrendsWidget = () => (
    <div className="w-full h-full flex flex-col justify-end">
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d="M 0 40 C 10 10, 20 10, 30 25 S 50 5, 60 20 S 80 45, 90 30 L 100 35" fill="none" stroke="#22d3ee" strokeWidth="2"/>
            <path d="M 0 45 C 10 30, 20 30, 30 40 S 50 25, 60 35 S 80 25, 90 20 L 100 22" fill="none" stroke="#a5f3fc" strokeWidth="1.5" strokeDasharray="4"/>
            <line x1="0" y1="48" x2="100" y2="48" stroke="#4a5568" strokeWidth="1" />
        </svg>
    </div>
);

const SemanticMapWidget = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-16 h-16 bg-cyan-500 rounded-full opacity-30 animate-ping"></div>
        <p className="text-gray-500 z-10">Mapa Semântico (NER)</p>
    </div>
);

const CorrelationWidget = ({ corpus }) => (
     <div className="w-full h-full flex flex-col text-sm text-gray-300">
        <p><span className="font-bold text-cyan-400">"{corpus === 'corpus1' ? 'Liberdade' : 'Capitu'}"</span> co-ocorre com:</p>
        <ul className="mt-2 space-y-1">
            {corpus === 'corpus1' ? (
                <>
                    <li><span className="font-semibold">Povo</span> (87)</li>
                    <li><span className="font-semibold">Direitos</span> (65)</li>
                </>
            ) : (
                <>
                    <li><span className="font-semibold">Olhos</span> (112)</li>
                    <li><span className="font-semibold">Ressaca</span> (98)</li>
                </>
            )}
        </ul>
        <div className="mt-auto">
            <label className="text-xs text-gray-500">Distância:</label>
            <input type="range" min="1" max="10" defaultValue="5" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    </div>
);

export const widgetComponents = {
  wordCloud: WordCloudWidget,
  trends: TrendsWidget,
  semanticMap: SemanticMapWidget,
  correlation: CorrelationWidget,
};
