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

// Locator mappings
const locators = {
    "Login Button": "#login-button",
    "Password Field": "#password",
    "Search Box": "#search-box",
    "Submit Button": "#submit-btn",
    "Username Input": "#username"
};

// Corresponding healed locators
const healedLocators = {
    "Login Button": "[data-testid='login-btn']",
    "Password Field": "[name='password-field']",
    "Search Box": "[aria-label='search']",
    "Submit Button": "[role='button']",
    "Username Input": "[placeholder='Enter username']"
};

// Function to generate random healed elements
function generateHealedElements() {
    const elements = [];

    for (const [locatorName, original] of Object.entries(locators)) {
        elements.push({
            name: locatorName,        // Adding locator name
            original: original,
            healed: healedLocators[locatorName],
            confidence: parseFloat(getRandomConfidence()),
            timestamp: getRandomTimestamp()
        });
    }

    return { healed_elements: elements };
}

// Generate and save JSON data
const data = generateHealedElements();
fs.writeFileSync('healed_elements.json', JSON.stringify(data, null, 2));

console.log('✅ Generated healed_elements.json with Locator Names');
