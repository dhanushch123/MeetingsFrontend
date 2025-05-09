
const CustomEvent = ({ event }) => {
    let className = '';
  
    if (event.status === 'accepted') className = 'custom-accepted';
    else if (event.status === 'rejected') className = 'custom-rejected';
    else if (event.status === 'past') className = 'custom-past';
  
    return <div className={`rbc-event ${className}`}>{event.title}</div>;
  };
  
export default CustomEvent;
  