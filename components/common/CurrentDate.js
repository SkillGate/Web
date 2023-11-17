// JavaScript code to generate the current date in the specified format

// Get the current date
const currentDate = new Date();

// Format the date as "Tuesday, 24 Jan 2023"
const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}).format(currentDate);

export default formattedDate;