// Handle category selection and dynamic input change
document.getElementById('categorySelect').addEventListener('change', function () {
    const category = this.value;
    const dynamicInput = document.getElementById('dynamicInput');
    dynamicInput.innerHTML = '';  // Clear previous inputs

    if (category === 'p1') {
        dynamicInput.innerHTML = '<label for="photoInput">Upload Photo:</label><input type="url" id="photoInput" placeholder="URL to img on Google Drive" required />';
    } else if (category === 'p2') {
        dynamicInput.innerHTML = '<label for="linkInput">Enter Link:</label><input type="url" id="linkInput" placeholder="Enter URL" required />';
    } else if (category === 'p3') {
        dynamicInput.innerHTML = '<label for="textInput">Enter Text:</label> <textarea id="textInput" rows="4" cols="50" placeholder="Enter text" required></textarea>';
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
        inputData = document.getElementById('photoInput').value.trim();
    } else if (category === 'p2') {
        inputData = document.getElementById('linkInput').value.trim();
    } else if (category === 'p3') {
        inputData = document.getElementById('textInput').value.trim();
    }

    // Validate required fields
    if (!firstName || !lastName || !inputData) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate URLs (for photo or link)
    if ((category === 'p1' || category === 'p2') && !isValidURL(inputData)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Generate QR code
    QRCode.toDataURL(inputData, function (err, url) {
        if (err) {
            alert('Error generating QR code.');
            console.error(err);  // Log the error for debugging
            return;
        }

        // Display the generated QR code and confirmation message
        document.getElementById('qrcodeImg').src = url;
        document.getElementById('qrcodeImg').style.display = 'block';
        document.getElementById('qrcodeLabel').innerText = inputData;
        document.getElementById('confirmation').style.display = 'block';  // Show confirmation
    });
});

// Function to validate URL format
function isValidURL(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}([\/\w \.-]*)*\/?$/i;
    return pattern.test(str);
}
