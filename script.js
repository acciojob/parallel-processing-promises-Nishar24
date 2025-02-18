//your JS code here. If required.
// Array of image URLs
const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250",
  "https://invalid-url.com/image.png", // Invalid URL for testing error handling
];

// Function to download an image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };
  });
}

// Function to download all images
async function downloadImages() {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  // Show loading spinner
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  outputDiv.innerHTML = "";

  try {
    // Download all images in parallel
    const images = await Promise.all(imageUrls.map(downloadImage));

    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Display images in the output div
    images.forEach((img) => {
      outputDiv.appendChild(img);
    });
  } catch (error) {
    // Hide loading spinner and show error message
    loadingDiv.style.display = "none";
    errorDiv.textContent = error;
    errorDiv.style.display = "block";
  }
}

// Start downloading images when the page loads
downloadImages();