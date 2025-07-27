import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CorpusPanel from './components/CorpusPanel';
import Dashboard from './components/Dashboard';
import TimelinePanel from './components/TimelinePanel';

const initialWidgets = [
    { id: 'wordCloud', title: 'Nuvem de Termos', gridClass: 'lg:col-span-2 xl:col-span-2' },
    { id: 'trends', title: 'Tendências Temporais', gridClass: 'lg:col-span-1 xl:col-span-2' },
    { id: 'semanticMap', title: 'Mapa de Calor Semântico', gridClass: 'lg:col-span-1 xl:col-span-2' },
    { id: 'correlation', title: 'Correlação de Contexto', gridClass: 'lg:col-span-2 xl:col-span-2' },
];

export default function App() {
  const [selectedCorpus, setSelectedCorpus] = useState('corpus1');
  const [filters, setFilters] = useState({ date: { start: '2024', end: '2024' } });
  const [widgets, setWidgets] = useState(initialWidgets);

  const handleFilterChange = useCallback((e) => {
      const { name, value } = e.target;
      setFilters(prev => ({
          ...prev,
          date: { ...prev.date, [name]: value }
      }));
  }, []);

  return (
    <div className="bg-gray-900 font-sans flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className="flex flex-col md:flex-row flex-grow">
          <CorpusPanel
            selectedCorpus={selectedCorpus}
            onCorpusSelect={setSelectedCorpus}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <div className="flex flex-col flex-grow overflow-hidden">
            <Dashboard
              widgets={widgets}
              setWidgets={setWidgets}
              selectedCorpus={selectedCorpus}
              filters={filters}
            />
            <TimelinePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
