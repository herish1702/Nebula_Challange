# Nebula QA Challenge – Cypress Automation

# What This Project Does

This project automates the extraction of **patent-related dates** such as:

- Filing Date
- Publication Date
- Grant Date

...from the [Pat-INFORMED](https://patinformed.wipo.int/) website using Cypress as the automation tool.  

It dynamically navigates the page, extracts these dates (even from multiple sections), and calculates the number of days between them.

---

# Example Flow

Let’s say the automation searches for **"Paracetamol"** and finds the first matching patent.

In the patent details, the dates are found:

Filing date: 2024-02-01
Publication date: 2024-06-01
Grant date: 2024-11-15

The script will calculate and print:

Difference between Filing and Publication date: 120 days
Difference between Filing and Grant date: 288 days
Difference between Publication and Grant date: 167 days

It handles situations like:
- Dates scattered across **multiple tables**
- Some dates missing from one section but found in another
- Text with junk like `(expected)` or empty cells

---

# Tech Stack

Cypress (v14+)
JavaScript
Mocha Test Runner
Page Object Model + Custom Commands

# Commends to installation

npm install cypress --save-dev  # Install Cypress's packages

npx cypress oprn  # Open th e cypress's UI, and Cypress will auto-generate the required folders (cypress/, cypress.config.js, etc.)

npx cypress run  # Run the spec file in headless mode (Note: By default, will run in Electron browser)

npx cypress run --headed --browser=edge  #  Run the spec file in headed mode in spectific browser (Note: Browser should be install in respective system)

# Commends to add external libraries

npm install --save-dev cypress-xpath  # Install Xpath dependency, for accessing xpath locators
npm install --save-dev @shelex/cypress-allure-plugin  # Install Allure dependency, for creating reports
npm install --save-dev @4tw/cypress-drag-drop. # Install Drag n Drop dependeny, for performing drag n drop action

# Folder Structure

```bash
Nebula_Challange/
├── cypress/
│ ├── e2e/ # Test specs (.cy.js files)
│ │ └── nebulaAssignment.cy.js
│ ├── fixtures/ # Test data (e.g., search terms)
│ │ ├── DynamicData.json
│ │ └── UrlData.json
│ ├── screenshots/ # Auto-saved screenshots on failure
│ ├── support/ # Custom commands and test setup
│ │ └── commands.js
│
├── locators/ # Page locators (selectors)
│ └── searchPage.js
│
├── page/ # Page Object Model: Page actions
│ └── searchPage.js
│
├── utils/ # Reusable utility functions
│ ├── ObjectInitializer.js # Intilizing objects for spec file
│ └── Utils.js # Contain all utils function such as click, get etc.
│
├── .gitignore # Git ignored files
├── cypress.config.js # Cypress project config
├── package.json # NPM dependencies and scripts
├── README.md # Project documentation
```