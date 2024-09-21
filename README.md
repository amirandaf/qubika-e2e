# Qubika E2E Testing with Playwright

This project contains end-to-end (E2E) tests for the Qubika Club Management System using [Playwright](https://playwright.dev/). It automates key workflows such as user registration, login, and category creation via both UI and API interactions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [Contributing](#contributing)

## Prerequisites
Before running the tests, make sure you have the following tools installed:
- **Node.js** (version 14 or higher) [Download here](https://nodejs.org/)
- **Playwright** (installed via npm)
- **Git** (for version control) [Download here](https://git-scm.com/)

## Installation

1. **Clone the repository**:
   git clone https://github.com/amirandaf/qubika-e2e.git

2. Navigate into the project directory:
cd qubika-e2e

3. Install project dependencies:
npm install

4. Install Playwright browsers:
npx playwright install

## Project Structure
Here is an overview of the folder structure in the project:

qubika-e2e/  
│  
├── .github/                # GitHub CI/CD configurations (optional)  
├── node_modules/           # Project dependencies (auto-generated)  
├── playwright-report/      # Playwright test reports  
├── test-results/           # Results and logs of the test runs  
├── tests/  
│   ├── utils/  
│        ├── helpers.ts     # Helper functions and utilities          
│   ├── qubika.test.ts      # Main test file for E2E testing  
│   └── test-results/       # Additional test result files (optional)  
├── .gitignore              # Files and folders to be ignored by Git  
├── package.json            # Project dependencies and scripts  
├── package-lock.json       # Dependency tree (auto-generated)  
└── playwright.config.ts    # Playwright configuration file  

## Running Tests
To run the tests in headless mode (no browser UI):  
npx playwright test  

To run the tests with the browser visible:  
npx playwright test --headed  

To run a specific test (e.g., Qubika.test.ts):  
npx playwright test tests/Qubika.test.ts  

To view test reports after running the tests:  
npx playwright show-report  

## Configuration
You can adjust various settings in the playwright.config.ts file. Some common configurations include:  

timeout: Sets the maximum time Playwright will wait for any operation to complete.  
use settings: Specifies options like headless, baseURL, etc.  
Example configuration:  

const config = {  
  timeout: 30000, // 30 seconds timeout for each test  
  use: {  
    baseURL: 'https://club-administration.qa.qubika.com',  
    headless: true, // Set to false to view the browser UI during tests  
  },  
};  
export default config;  

## Reporting
After running tests, Playwright generates detailed reports with screenshots and logs. The reports are saved in the playwright-report directory.  

To view the HTML report:
npx playwright show-report  

## Contributing
If you would like to contribute to this project:  

Fork the repository.  
Create a new branch (git checkout -b feature/new-feature).  
Make your changes and commit them (git commit -m 'Add new feature').  
Push your branch (git push origin feature/new-feature).  
Open a Pull Request.  
