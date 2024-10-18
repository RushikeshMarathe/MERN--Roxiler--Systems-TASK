
// array of month names
const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
];

//  get the month number from the month name
const getMonthNumber = (month) => {
    const monthIndex = months.indexOf(month);
    return monthIndex !== -1 ? monthIndex : null;
};


module.exports = {
    months,
    getMonthNumber,
};
