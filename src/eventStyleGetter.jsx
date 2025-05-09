const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = 'red';
  
    
  
    const style = {
      backgroundColor,
      borderRadius: '6px',
      opacity: 0.9,
      color: 'white',
      border: 'none',
      padding: '4px 8px',
      fontSize: '14px',
    };
  
    return { style };
  };
export default eventStyleGetter  