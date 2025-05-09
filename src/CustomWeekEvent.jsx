import React, { useState, useEffect } from 'react';

const CustomWeekEvent = ({ event, allEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overlappingEvents, setOverlappingEvents] = useState([]);

  useEffect(() => {
    const overlaps = allEvents.filter((e) =>
      e.start.getHours() === event.start.getHours() &&
      e.start.getMinutes() === event.start.getMinutes()
    );
    setOverlappingEvents(overlaps);

    // find index of current event
    const index = overlaps.findIndex(e => e.title === event.title);
    setCurrentIndex(index);
  }, [event, allEvents]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => Math.min(overlappingEvents.length - 1, prev + 1));
  };

  const currentEvent = overlappingEvents[currentIndex];

  // Only render if current event matches this one
  if (!currentEvent || currentEvent.title !== event.title) return null;

  return (
    <div className={`week-${event.status}`}>
      {currentIndex > 0 && (
        <button className="nav-arrow left" onClick={handlePrev}>←</button>
      )}

      <div className="event-content">
        <strong>{currentEvent.title}</strong><br />
        {currentEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
        {currentEvent.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>

      {currentIndex < overlappingEvents.length - 1 && (
        <button className="nav-arrow right" onClick={handleNext}>→</button>
      )}
    </div>
  );
};

export default CustomWeekEvent;
