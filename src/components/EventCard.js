import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark} from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { BsFillBookmarkFill,  } from '@fortawesome/free-solid-svg-icons';
import '../styles/EventCard.scss';


const EventCard = ({ event }) => {
  const [isSaved, setIsSaved] = useState(false); // Initialize as not saved

  useEffect(() => {
    // Load saved state from session storage when the component mounts
    const savedState = sessionStorage.getItem(`savedEvent_${event.id}`);
    if (savedState !== null) {
      setIsSaved(JSON.parse(savedState));
    }
  }, [event.id]);

  const toggleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    // Save the updated state to session storage
    sessionStorage.setItem(`savedEvent_${event.id}`, JSON.stringify(newSavedState));
  };

  const eventDay = event.date.split('.')[0];

  return (
    <div className="event-card">
      <button className="save-button" onClick={toggleSave}>
        {isSaved ? <FaBookmark size={24} color="white"/> : <FaRegBookmark size={24} color="white"/>}
      </button>
      <img src={event.image} alt={event.name} />
      <div className="overlay">
        <div className="event-info">
          <h2 className="event-day">{eventDay}</h2>
        </div>
        <p className="event-title">{event.name}</p>
      </div>
    </div>
  );
};

export default EventCard;
