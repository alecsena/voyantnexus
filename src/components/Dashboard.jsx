import React from 'react';
import Widget from './Widget.jsx';
import { widgetComponents } from './widgetComponents.jsx';

const Dashboard = ({ widgets, setWidgets, selectedCorpus, filters }) => {
    const dragItem = React.useRef(null);
    const dragOverItem = React.useRef(null);

    const handleDragStart = (e, index) => {
        dragItem.current = index;
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        dragOverItem.current = index;
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = () => {
        const newWidgets = [...widgets];
        const dragItemContent = newWidgets[dragItem.current];
        newWidgets.splice(dragItem.current, 1);
        newWidgets.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setWidgets(newWidgets);
    };

    return (
        <main className="flex-grow p-4 md:p-6 bg-gray-900 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {widgets.map((widget, index) => {
                const WidgetComponent = widgetComponents[widget.id];
                return (
                    <Widget
                        key={widget.id}
                        id={widget.id}
                        title={widget.title}
                        gridClass={widget.gridClass}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrop={handleDrop}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragOver={handleDragOver}
                    >
                        <WidgetComponent corpus={selectedCorpus} filters={filters} />
                    </Widget>
                );
            })}
        </main>
    );
};

export default Dashboard;
