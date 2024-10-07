const newsContainer = document.getElementById('news-container');

// Default category
let currentCategory = 'home'; // Set default to 'home'

// Function to handle sort option change
function handleSortChange() {
    const sortDropdown = document.getElementById('sortNews');

    // Get the selected value
    currentCategory = sortDropdown.value; // Update current category with selected value

    // Log the selected value
    console.log('Selected sort option:', currentCategory);

    // Fetch news based on the selected category
    fetchNewsData(currentCategory); // Pass the current category to the function
}

// Function to fetch news data from the API
async function fetchNewsData(category) {
  try {
    //const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=qnL3LVWjK0G2rUfbYd8n5lE7iOG1mncE`); // Use the selected category in the API URL
    const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=qnL3LVWjK0G2rUfbYd8n5lE7iOG1mncE`);
    const data = await response.json();

    if (data.status === "OK") {
      displayNewsCards(data.results); // Call the function with the API results
    } else {
      console.error('API response was not OK:', data.status);
    }
  } catch (error) {
    console.error('Error fetching news data:', error); // Log any errors
  }
}

function displayNewsCards(articles) {
    const cards = articles.map(article => {
        const imageUrl = article.multimedia && article.multimedia.length > 0
            ? article.multimedia[0].url
            : 'https://via.placeholder.com/150';

        return `
            <div class="news-card">
                <div class="image-container">
                    <img src="${imageUrl}" alt="News Image">
                    <span class="author-tag">${article.byline}</span>
                    <span class="subsection-tag">${article.subsection || 'General'}</span> <!-- Display subsection -->
                </div>
                <div class="news-content">
                    <h3>
                    <a href="https://www.nytimes.com/subscription/all-access?campaignId=8HHXJ&ds_c=71700000105574161&site=google&network=g&campaign_id=19602743994">
                    New York Times
                    </a>
                    </h3>
                    <h2>${article.title}</h2>
                    <p>${article.abstract}</p>
                    <p><em>Published: ${new Date(article.published_date).toLocaleString()}</em></p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            </div>
        `;
    }).join('');

    newsContainer.innerHTML = cards; // Insert the cards into the DOM
}

// Call fetch function to get news data for the default category when the script loads
fetchNewsData(currentCategory);
