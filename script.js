//your JS code here. If required.
// Array of image URLs
// Array of image URLs
const imageUrls = [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image3.jpg' }
];

// Function to load an image
function loadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    });
}

// Event listener for button click
document.getElementById('download-images-button').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear any previous content

    const imagePromises = imageUrls.map(loadImage);

    Promise.all(imagePromises)
        .then(images => {
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = error.message;
            outputDiv.appendChild(errorMessage);
        });
});
