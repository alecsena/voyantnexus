import React from 'react';
import { icons } from './icons';

const Header = () => (
  <header className="bg-gray-800 text-white shadow-md p-3 flex justify-between items-center z-20">
    <div className="flex items-center space-x-3">
      <icons.compass className="w-8 h-8 text-cyan-400" />
      <h1 className="text-2xl font-bold tracking-wider">Voyant <span className="font-light text-cyan-300">Nexus</span></h1>
    </div>
    <div className="flex items-center space-x-4">
      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold transition-colors">Exportar Sessão</button>
      <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-700">
        <icons.user className="w-6 h-6 text-gray-400" />
        <span className="text-sm">Pesquisador DH</span>
      </div>
    </div>
  </header>
);

export default Header;
