export function getWeekRange(): string {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get Sunday of current week
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);
    
    // Get Saturday (6 days after Sunday)
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    
    // Format dates
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };
    
    return `${formatDate(sunday)} - ${formatDate(saturday)}`;
  };