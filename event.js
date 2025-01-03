// Get the current month (0-11, where 0 is January)
const currentMonth = new Date().getMonth();

// Check if it's nov & dec & jan.
if (currentMonth === 10 || currentMonth === 11 || currentMonth === 0) {

    // Function to create snowflakes
    function createSnowflakes() {
        const numFlakes = 24; // Number of snowflakes
        const container = document.getElementById('snowfall');

        for (let i = 0; i < numFlakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.textContent = '❄'; // Unicode snowflake symbol

            // Random size and position
            const size = Math.random() * 7 + 7; // Snowflake size between 10px and 20px
            snowflake.style.fontSize = `${size}px`;
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random fall duration

            // Add snowflake to the container
            container.appendChild(snowflake);
        }
    }

    // Call the function when the page loads
    window.onload = function () {
        createSnowflakes();
    };
}