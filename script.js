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
        dynamicInput.innerHTML = '<label for="textInput">Enter Text:</label><input type="text" id="textInput" placeholder="Enter text" required />';
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

// Function to download the QR code as a PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;  // Access jsPDF from the global scope
    const doc = new jsPDF();

    const qrImage = document.getElementById('qrcodeImg');
    const qrText = document.getElementById('qrcodeLabel').innerText;

    if (!qrImage.src) {
        alert('Please generate the QR code before downloading.');
        return;
    }

    // Add the QR code to the PDF
    doc.text("QR Code Registration", 10, 10);
    doc.text("First Name: " + document.getElementById('nameInput').value, 10, 20);
    doc.text("Last Name: " + document.getElementById('lastInput').value, 10, 30);
    doc.text("Category: " + document.getElementById('categorySelect').options[document.getElementById('categorySelect').selectedIndex].text, 10, 40);
    doc.text("Entered Data: " + qrText, 10, 50);

    // Add QR code image to the PDF (scaled and positioned appropriately)
    doc.addImage(qrImage.src, 'PNG', 10, 60, 50, 50);  // X, Y, Width, Height

    // Save the PDF
    doc.save('QRCode_Registration.pdf');
}

// Add the download PDF functionality to a button
document.getElementById('downloadPdfButton').addEventListener('click', downloadPDF);
