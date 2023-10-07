import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";

const indexContext = [
  "",
  "Echolounge",
  "House of Blues",
  "Pavilion",
  "American Airlines",
];
const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3001/events");
      const data = await response.json();
      console.log(data);
      const specificEvent = data.filter(
        (event) => event.name === indexContext[index],
      );
      setEvents(specificEvent);
      setLocation({
        image:
          "https://tse1.mm.bing.net/th?id=OIP.kilVibyOxN_Bux7yB9wqZAHaE7&pid=Api&P=0&h=220",
        name: indexContext[index],
        address: specificEvent[0].location,
      });
    };
    fetchEvents();
  }, []);

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.address}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.groupname}
              date={event.date}
              time={event.time}
              image={event.imagelink}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake text-blue-400"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
