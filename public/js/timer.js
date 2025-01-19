// Wait until the Document Object Model is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Function which calculates and updates the timer displaying the sobriety timer
    function updateTimer() {
        // Get the sobriety start date from the EJS data
        const sobrietyStartDate = new Date(window.sobrietyStartDate);
        const currentDate = new Date(); // Get the current date and time
        const timeDifference = currentDate.getTime() - sobrietyStartDate.getTime(); // Calculate the time difference in milliseconds

        // Calculate the years, months, days, hours, minutes, and seconds of sobriety
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.436875));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.436875)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update the timer with the calculated time
        if (years > 0) {
            document.getElementById('years_sober').innerText = `${years} years`;
        }
        if (months > 0) {
        document.getElementById('months_sober').innerText = `${months} months`;
        }
        document.getElementById('days_sober').innerText = `${days} days`;
        document.getElementById('hours_sober').innerText = `${hours} hours`;
        document.getElementById('minutes_sober').innerText = `${minutes} minutes`;
        document.getElementById('seconds_sober').innerText = `${seconds} seconds`;

    }

    // Initialize the timer
    updateTimer();
    // Update the timer every second = 1000 milliseconds
    setInterval(updateTimer, 1000);

});
