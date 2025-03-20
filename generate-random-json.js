const fs = require('fs');

// Function to generate a random confidence value between 0.8 and 0.99
function getRandomConfidence() {
    return (Math.random() * (0.99 - 0.8) + 0.8).toFixed(2);
}

// Function to generate a random timestamp within the last 24 hours
function getRandomTimestamp() {
    const now = new Date();
    const randomOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // Up to 24 hours back
    return new Date(now - randomOffset).toISOString();
}

// Sample original locators and healed locators
const originalLocators = ["#login-button", "#password", "#search-box", "#submit-btn", "#username"];
const healedLocators = ["[data-testid='login-btn']", "[name='password-field']", "[aria-label='search']", "[role='button']", "[placeholder='Enter username']"];

// Function to generate random healed elements
function generateHealedElements(count = 5) {
    const elements = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * originalLocators.length);
        elements.push({
            original: originalLocators[randomIndex],
            healed: healedLocators[randomIndex],
            confidence: parseFloat(getRandomConfidence()),
            timestamp: getRandomTimestamp()
        });
    }
    return { healed_elements: elements };
}

// Generate and save JSON data
const data = generateHealedElements(5);
fs.writeFileSync('healed_elements.json', JSON.stringify(data, null, 2));

console.log('✅ Generated healed_elements.json');
