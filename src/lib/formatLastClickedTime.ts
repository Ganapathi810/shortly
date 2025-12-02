export const formatLastClickedTime = (date: Date): string =>  {
    const now = new Date();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate();
    
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();
  
    const timeFormatter = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    if(isYesterday) {
        return `Yesterday, ${timeFormatter.format(date)}`;
    }
  
    if (isToday) {
      return `Today, ${timeFormatter.format(date)}`;
    }


  
    const fullFormatter = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return fullFormatter.format(date);
  }