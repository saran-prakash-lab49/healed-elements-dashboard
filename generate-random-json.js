const fs = require('fs');

// Function to read locators from JSON file
function getLocatorsFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data).locators; // Extract locators object
    } catch (error) {
        console.error('❌ Error reading locators file:', error);
        return {}; // Return empty object in case of failure
    }
}

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

// Extended list of prefixes and suffixes for generating more unique healed locators
const prefixes = [
    '[data-healed]', '[aria-label]', '[role="button"]', '[data-testid]', '[ng-reflect-name]',
    '[automation-id]', '[formcontrolname]', '[data-cy]', '[custom-attr]', '[app-element]'
];

const suffixes = [
    '-v1', '-fixed', '-alt', '-new', '-backup', '-patched', '-latest', '-dynamic', '-updated', '-2025'
];

// Function to generate a random healed locator
function getRandomHealedLocator(originalLocator) {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    // Randomly replace '#' with a prefix or append a suffix
    if (originalLocator.includes('#')) {
        return originalLocator.replace('#', randomPrefix);
    } else {
        return `${originalLocator}${randomSuffix}`;
    }
}

// File path for locators.json
const LOCATORS_FILE_PATH = 'data/locators.json';

// Read locators dynamically
const locators = getLocatorsFromFile(LOCATORS_FILE_PATH);

// Function to generate random healed elements
function generateHealedElements() {
    const elements = [];

    for (const [locatorName, original] of Object.entries(locators)) {
        elements.push({
            name: locatorName,
            original: original,
            healed: getRandomHealedLocator(original), // Generate random healed locator
            confidence: parseFloat(getRandomConfidence()),
            timestamp: getRandomTimestamp()
        });
    }

    return { healed_elements: elements };
}

// Generate and save JSON data
const data = generateHealedElements();
fs.writeFileSync('healed_elements.json', JSON.stringify(data, null, 2));

console.log('✅ Generated healed_elements.json with dynamically fetched and random healed locators');
