// Global Travel Checklist functionality for web1

// Sample travel data organized by Country -> City -> Attractions
const travelData = [
    {
        country: "France",
        flag: "🇫🇷",
        cities: [
            {
                name: "Paris",
                attractions: [
                    "Eiffel Tower",
                    "Louvre Museum",
                    "Notre-Dame Cathedral",
                    "Arc de Triomphe",
                    "Champs-Élysées"
                ]
            },
            {
                name: "Nice",
                attractions: [
                    "Promenade des Anglais",
                    "Castle Hill",
                    "Old Town (Vieux Nice)",
                    "Marc Chagall Museum"
                ]
            }
        ]
    },
    {
        country: "Japan",
        flag: "🇯🇵",
        cities: [
            {
                name: "Tokyo",
                attractions: [
                    "Tokyo Tower",
                    "Senso-ji Temple",
                    "Shibuya Crossing",
                    "Meiji Shrine",
                    "Tokyo Skytree"
                ]
            },
            {
                name: "Kyoto",
                attractions: [
                    "Fushimi Inari Shrine",
                    "Kinkaku-ji (Golden Pavilion)",
                    "Arashiyama Bamboo Grove",
                    "Kiyomizu-dera Temple"
                ]
            }
        ]
    },
    {
        country: "Italy",
        flag: "🇮🇹",
        cities: [
            {
                name: "Rome",
                attractions: [
                    "Colosseum",
                    "Vatican Museums",
                    "Trevi Fountain",
                    "Pantheon",
                    "Roman Forum"
                ]
            },
            {
                name: "Venice",
                attractions: [
                    "St. Mark's Basilica",
                    "Grand Canal",
                    "Rialto Bridge",
                    "Doge's Palace"
                ]
            }
        ]
    },
    {
        country: "USA",
        flag: "🇺🇸",
        cities: [
            {
                name: "New York",
                attractions: [
                    "Statue of Liberty",
                    "Central Park",
                    "Empire State Building",
                    "Times Square",
                    "Brooklyn Bridge"
                ]
            },
            {
                name: "San Francisco",
                attractions: [
                    "Golden Gate Bridge",
                    "Alcatraz Island",
                    "Fisherman's Wharf",
                    "Chinatown"
                ]
            }
        ]
    },
    {
        country: "China",
        flag: "🇨🇳",
        cities: [
            {
                name: "Beijing",
                attractions: [
                    "Great Wall of China",
                    "Forbidden City",
                    "Temple of Heaven",
                    "Summer Palace"
                ]
            },
            {
                name: "Shanghai",
                attractions: [
                    "The Bund",
                    "Oriental Pearl Tower",
                    "Yu Garden",
                    "Shanghai Tower"
                ]
            }
        ]
    }
];

let visitedAttractions = {};

// Load visited attractions from localStorage
function loadVisitedAttractions() {
    const saved = localStorage.getItem('visitedAttractions');
    if (saved) {
        visitedAttractions = JSON.parse(saved);
    }
}

// Save visited attractions to localStorage
function saveVisitedAttractions() {
    localStorage.setItem('visitedAttractions', JSON.stringify(visitedAttractions));
}

// Toggle country expansion
function toggleCountry(countryIndex) {
    const countryElement = document.querySelector(`[data-country="${countryIndex}"]`);
    countryElement.classList.toggle('expanded');
}

// Toggle city expansion
function toggleCity(countryIndex, cityIndex) {
    const cityElement = document.querySelector(`[data-city="${countryIndex}-${cityIndex}"]`);
    cityElement.classList.toggle('expanded');
}

// Toggle attraction visited status
function toggleAttraction(countryName, cityName, attractionName) {
    const key = `${countryName}|${cityName}|${attractionName}`;
    visitedAttractions[key] = !visitedAttractions[key];
    saveVisitedAttractions();
    updateStats();
    
    // Update the visual state
    const attractionElement = document.querySelector(`[data-attraction="${key}"]`);
    if (attractionElement) {
        if (visitedAttractions[key]) {
            attractionElement.classList.add('visited');
        } else {
            attractionElement.classList.remove('visited');
        }
    }
}

// Reset all visited attractions
function resetAll() {
    if (confirm('Are you sure you want to reset all visited attractions?')) {
        visitedAttractions = {};
        saveVisitedAttractions();
        renderTravelList();
    }
}

// Update statistics
function updateStats() {
    let totalAttractions = 0;
    let visitedCount = 0;
    
    travelData.forEach(country => {
        country.cities.forEach(city => {
            city.attractions.forEach(attraction => {
                totalAttractions++;
                const key = `${country.country}|${city.name}|${attraction}`;
                if (visitedAttractions[key]) {
                    visitedCount++;
                }
            });
        });
    });
    
    document.getElementById('stats').textContent = 
        `${visitedCount} / ${totalAttractions} attractions visited`;
}

// Filter locations based on search input
function filterLocations() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const countrySections = document.querySelectorAll('.country-section');
    let hasResults = false;
    
    countrySections.forEach(countrySection => {
        const countryName = countrySection.querySelector('.country-name').textContent.toLowerCase();
        let countryMatches = countryName.includes(searchTerm);
        
        const citySections = countrySection.querySelectorAll('.city-section');
        citySections.forEach(citySection => {
            const cityName = citySection.querySelector('.city-name').textContent.toLowerCase();
            let cityMatches = cityName.includes(searchTerm);
            
            const attractions = citySection.querySelectorAll('.attraction-item');
            let cityHasVisibleAttraction = false;
            
            attractions.forEach(attraction => {
                const attractionName = attraction.querySelector('.attraction-name').textContent.toLowerCase();
                const matches = attractionName.includes(searchTerm) || cityMatches || countryMatches;
                
                if (matches || searchTerm === '') {
                    attraction.style.display = 'flex';
                    cityHasVisibleAttraction = true;
                } else {
                    attraction.style.display = 'none';
                }
            });
            
            if (cityHasVisibleAttraction || searchTerm === '') {
                citySection.style.display = 'block';
                hasResults = true;
            } else {
                citySection.style.display = 'none';
            }
        });
        
        const hasVisibleCity = Array.from(citySections).some(city => city.style.display !== 'none');
        if (hasVisibleCity || searchTerm === '') {
            countrySection.style.display = 'block';
            hasResults = true;
        } else {
            countrySection.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// Render the travel list
function renderTravelList() {
    const travelList = document.getElementById('travelList');
    travelList.innerHTML = '';
    
    travelData.forEach((country, countryIndex) => {
        const countrySection = document.createElement('div');
        countrySection.className = 'country-section';
        countrySection.setAttribute('data-country', countryIndex);
        
        const countryHeader = document.createElement('div');
        countryHeader.className = 'country-header';
        countryHeader.onclick = () => toggleCountry(countryIndex);
        
        countryHeader.innerHTML = `
            <div class="country-name">
                <span class="country-flag">${country.flag}</span>
                ${country.country}
            </div>
            <span class="expand-icon">▼</span>
        `;
        
        const citiesContainer = document.createElement('div');
        citiesContainer.className = 'cities-container';
        
        country.cities.forEach((city, cityIndex) => {
            const citySection = document.createElement('div');
            citySection.className = 'city-section';
            citySection.setAttribute('data-city', `${countryIndex}-${cityIndex}`);
            
            const cityHeader = document.createElement('div');
            cityHeader.className = 'city-header';
            cityHeader.onclick = () => toggleCity(countryIndex, cityIndex);
            
            cityHeader.innerHTML = `
                <span class="city-icon">🏙️</span>
                <div class="city-name">${city.name}</div>
            `;
            
            const attractionsList = document.createElement('div');
            attractionsList.className = 'attractions-list';
            
            city.attractions.forEach(attraction => {
                const key = `${country.country}|${city.name}|${attraction}`;
                const isVisited = visitedAttractions[key] || false;
                
                const attractionItem = document.createElement('div');
                attractionItem.className = `attraction-item ${isVisited ? 'visited' : ''}`;
                attractionItem.setAttribute('data-attraction', key);
                
                attractionItem.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="attraction-checkbox" 
                        ${isVisited ? 'checked' : ''}
                        onchange="toggleAttraction('${country.country}', '${city.name}', '${attraction}')"
                    >
                    <span class="attraction-name">${attraction}</span>
                `;
                
                attractionsList.appendChild(attractionItem);
            });
            
            citySection.appendChild(cityHeader);
            citySection.appendChild(attractionsList);
            citiesContainer.appendChild(citySection);
        });
        
        countrySection.appendChild(countryHeader);
        countrySection.appendChild(citiesContainer);
        travelList.appendChild(countrySection);
    });
    
    // Add no results message
    const noResults = document.createElement('div');
    noResults.id = 'noResults';
    noResults.className = 'no-results';
    noResults.style.display = 'none';
    noResults.textContent = 'No attractions found matching your search.';
    travelList.appendChild(noResults);
    
    updateStats();
}

// Initialize the app
loadVisitedAttractions();
renderTravelList();
