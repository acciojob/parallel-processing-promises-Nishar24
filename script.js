//your JS code here. If required.
const imgUrls = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/200',
  'https://via.placeholder.com/250',
];

const downloadImagesButton = document.getElementById('download-images-button');
const outputDiv = document.getElementById('output');

function downloadImages(urls) {
  const imagePromises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(`Failed to load image's URL: ${url}`);
      };
    });
  });

  return Promise.all(imagePromises);
}

downloadImagesButton.addEventListener('click', async () => {
  try {
    const images = await downloadImages(imgUrls);
    images.forEach(img => {
      outputDiv.appendChild(img);
    });
  } catch (error) {
    console.error(error);
    outputDiv.textContent = error;
  }
});