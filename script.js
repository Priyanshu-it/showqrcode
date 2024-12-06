// Handle category selection and dynamic input change
document.getElementById('categorySelect').addEventListener('change', function () {
    const category = this.value;
    const dynamicInput = document.getElementById('dynamicInput');
    dynamicInput.innerHTML = '';  // Clear previous inputs

    if (category === 'p1') {
        dynamicInput.innerHTML = '<label for="linkInput">Enter Link:</label><input type="url" id="linkInput" placeholder="Enter URL" required />';
    } else if (category === 'p2') {
        dynamicInput.innerHTML = '<label for="textInput">Enter a Text:</label><textarea id="textInput" placeholder="Enter text" rows="4" required></textarea>';
    }
});

// QR Code Generation and Registration Confirmation
document.getElementById('verifyOtpButton').addEventListener('click', function () {
    const firstName = document.getElementById('nameInput').value.trim();
    const lastName = document.getElementById('lastInput').value.trim();
    const category = document.getElementById('categorySelect').value;
    let inputData = '';

    // Based on category, retrieve the corresponding input value
    if (category === 'p1') {
        inputData = document.getElementById('linkInput').value.trim();
    } else if (category === 'p2') {
        inputData = document.getElementById('textInput').value.trim();
    }

    // Validate required fields
    if (!firstName || !lastName || !inputData) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate URLs (for photo or link)
    if ((category === 'p1') && !isValidURL(inputData)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Disable button and show spinner when the user clicks "Create to Generate QR Code"
    const spinner = document.getElementById('spinner');
    const button = document.getElementById('verifyOtpButton');
    button.disabled = true;  // Disable the button
    spinner.style.display = 'inline';  // Show the spinner

    let count = 0;  // Start count as a number
    let interval = setInterval(function () {
        spinner.innerText = count;  // Update spinner text to show count
        count++;
        if (count > 4) {
            clearInterval(interval);  // Stop after "Loading 4"
        }
    }, 1000); // Update every 1 second

    setTimeout(function () {
        button.disabled = false;  // Enable the button after 5 seconds
        spinner.style.display = 'none';  // Hide the spinner

        // Generate QR code
        QRCode.toDataURL(inputData, function (err, url) {
            if (err) {
                alert('Error generating QR code.');
                return;
            }
            document.getElementById('qrcodeImg').src = url;
            document.getElementById('qrcodeImg').style.display = 'block';
            document.getElementById('qrcodeLabel').innerText = inputData;
            document.getElementById('confirmation').style.display = 'block';  // Show confirmation
            spinner.innerText = ''; // stop
        });
    }, 5000);
});

// Function to validate URL format
function isValidURL(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}([\/\w \.-]*)*\/?$/i;
    return pattern.test(str);
}