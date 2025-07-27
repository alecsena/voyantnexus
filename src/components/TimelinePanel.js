import React, { useState } from 'react';

const TimelinePanel = () => {
    const [sliderValue, setSliderValue] = useState(50);
    return (
        <footer className="bg-gray-800 text-gray-300 p-4 shadow-inner-top z-10">
            <h2 className="text-base font-semibold text-gray-100 mb-2">Modo "Narrativa": Linha do Tempo Interativa</h2>
            <div className="relative h-20 w-full flex items-center">
                <div className="w-full h-1 bg-gray-600 rounded-full"></div>
                <div className="absolute top-1/2 -mt-1 w-2 h-2 bg-cyan-400 rounded-full" style={{ left: '10%' }}><span className="absolute -top-6 text-xs whitespace-nowrap">Discurso A</span></div>
                <div className="absolute top-1/2 -mt-1 w-2 h-2 bg-cyan-400 rounded-full" style={{ left: '45%' }}><span className="absolute -top-6 text-xs whitespace-nowrap">Publicação B</span></div>
                <div className="absolute top-1/2 -mt-1 w-2 h-2 bg-cyan-400 rounded-full" style={{ left: '80%' }}><span className="absolute -top-6 text-xs whitespace-nowrap">Evento C</span></div>
                <div className="absolute top-1/2 -mt-5" style={{ left: `${sliderValue}%` }}>
                    <div className="p-2 bg-yellow-400 text-black rounded-md text-xs shadow-lg">Pico de "liberdade"</div>
                    <div className="w-px h-5 bg-yellow-400 mx-auto"></div>
                </div>
                <input type="range" min="0" max="100" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer top-1/2 -mt-0.5 accent-cyan-500" />
            </div>
        </footer>
    );
};

export default TimelinePanel;
