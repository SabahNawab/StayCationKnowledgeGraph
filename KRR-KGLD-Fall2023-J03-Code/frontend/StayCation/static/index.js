// Get all image elements
const images = document.querySelectorAll(".image");

let delay = 0;
// Apply delay for each image to create overlap effect
images.forEach((image, index) => {
  setTimeout(() => {
    image.style.opacity = "1";
  }, delay);
  delay += 2000; // Adjust the delay timing between images (milliseconds)
});

// Handle form submission
function submitQuery() {
    const inputText = document.getElementById("inputText").value; // Get input text
    console.log("Submitted Text:", inputText); // Log the input text (you can modify this part as needed)

    // Send the query to the server
    fetch("/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `query=${encodeURIComponent(inputText)}`,
    })
        .then(response => response.json())
        .then(data => {
            // Display the result in the pop-up
            openPopup();
            document.getElementById("popupResult").innerHTML = data.result;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Open and close pop-up functions
function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
