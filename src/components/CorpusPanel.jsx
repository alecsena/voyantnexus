import React from 'react';
import { icons } from './icons.js';
import { mockData } from './mockData.js';
import AiAssistant from './AiAssistant.jsx';

const CorpusPanel = ({ selectedCorpus, onCorpusSelect, filters, onFilterChange }) => (
  <aside className="bg-gray-800 text-gray-300 p-4 flex flex-col space-y-6 w-full md:w-80 lg:w-96">
    <button className="w-full flex items-center justify-center space-x-3 p-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-colors">
      <icons.uploadCloud className="w-6 h-6" />
      <span>Importar Corpus</span>
    </button>

    <div className="flex-grow">
      <h2 className="text-lg font-semibold text-gray-100 mb-3 flex items-center space-x-2">
        <icons.fileText className="w-5 h-5 text-cyan-400" />
        <span>Navegador de Corpora</span>
      </h2>
      <ul className="space-y-2">
        {Object.values(mockData).map(corpus => (
          <li
            key={corpus.id}
            onClick={() => onCorpusSelect(corpus.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedCorpus === corpus.id ? 'bg-gray-700 border-l-4 border-cyan-400' : 'bg-gray-900 hover:bg-gray-700'}`}
          >
            <p className="font-bold text-white">{corpus.name}</p>
            <p className="text-xs text-gray-400">{corpus.docs}</p>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-gray-100 mb-3 flex items-center space-x-2">
        <icons.filter className="w-5 h-5 text-cyan-400" />
        <span>Filtros de Metadados</span>
      </h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-400">Data</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="start"
              value={filters.date.start}
              onChange={onFilterChange}
              placeholder="1800"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500" />
            <input
              type="text"
              name="end"
              value={filters.date.end}
              onChange={onFilterChange}
              placeholder="1850"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
        </div>
      </div>
    </div>

    <div className="flex-grow min-h-[200px]">
        <AiAssistant selectedCorpus={selectedCorpus} />
    </div>

  </aside>
);

export default CorpusPanel;
