export const formatCreatedAtTime = (date: Date): string => {
  // Format: "November 19, 2025 8:31 PM GMT+5:30"
  
  const monthFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  });
  
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  });
  
  const yearFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  });
  
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const month = monthFormatter.format(date);
  const day = dayFormatter.format(date);
  const year = yearFormatter.format(date);
  const time = timeFormatter.format(date);
  
  return `${month} ${day}, ${year} ${time}`;
};

