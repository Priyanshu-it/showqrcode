// Handle category selection and dynamic input change
document.getElementById('categorySelect').addEventListener('change', function () {
    const category = this.value;
    const dynamicInput = document.getElementById('dynamicInput');
    dynamicInput.innerHTML = '';  // Clear previous inputs

    if (category === 'p1') {
        // Photo input
        dynamicInput.innerHTML = '<label for="photoInput">Upload Photo:</label><input type="url" id="photoInput" placeholder="URL to img on Google Drive" />';
    } else if (category === 'p2') {
        // Link input
        dynamicInput.innerHTML = '<label for="linkInput">Enter Link:</label><input type="url" id="linkInput" placeholder="Enter URL" />';
    } else if (category === 'p3') {
        // Text input
        dynamicInput.innerHTML = '<label for="textInput">Enter Text:</label><input type="text" id="textInput" placeholder="Enter text" />';
    }
});

// QR Code Generation and Registration Confirmation
document.getElementById('verifyOtpButton').addEventListener('click', function () {
    const firstName = document.getElementById('nameInput').value;
    const lastName = document.getElementById('lastInput').value;

    const category = document.getElementById('categorySelect').value;
    let inputData = '';

    if (category === 'p1') {
        inputData = document.getElementById('photoInput').value;
    } else if (category === 'p2') {
        inputData = document.getElementById('linkInput').value;
    } else if (category === 'p3') {
        inputData = document.getElementById('textInput').value;
    }

    // Check if the fields are empty
    if (!inputData && !firstName && !lastName)  {
        alert('Please fill in the required information.');
        return;
    }

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
    });
});