import React, { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEventToItinerary = (dayId, event) => {
    setEvents((prevEvents) => [...prevEvents, { ...event, dayId }]);
  };

  const removeEventFromItinerary = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <EventContext.Provider
      value={{ events, addEventToItinerary, removeEventFromItinerary }}
    >
      {children}
    </EventContext.Provider>
  );
};
