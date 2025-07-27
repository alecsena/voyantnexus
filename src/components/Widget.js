import React from 'react';
import { icons } from './icons';

const Widget = ({ id, title, children, gridClass, onDragStart, onDrop, onDragEnter, onDragOver }) => (
  <div
    id={id}
    draggable="true"
    onDragStart={onDragStart}
    onDrop={onDrop}
    onDragEnter={onDragEnter}
    onDragOver={onDragOver}
    className={`bg-gray-800 rounded-xl shadow-lg flex flex-col cursor-grab active:cursor-grabbing transition-all duration-300 ${gridClass}`}
  >
    <header className="p-3 border-b border-gray-700 flex justify-between items-center">
      <h3 className="font-bold text-white">{title}</h3>
      <div className="flex items-center space-x-2 text-gray-500">
        <button className="hover:text-white"><icons.settings className="w-4 h-4" /></button>
        <button className="hover:text-white"><icons.maximize className="w-4 h-4" /></button>
        <button className="hover:text-white"><icons.moreHorizontal className="w-4 h-4" /></button>
      </div>
    </header>
    <div className="p-4 flex-grow relative overflow-hidden">
      {children}
    </div>
  </div>
);

export default Widget;
