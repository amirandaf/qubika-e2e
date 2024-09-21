# Qubika E2E Testing with Playwright

This project contains end-to-end (E2E) tests for the Qubika Club Management System using [Playwright](https://playwright.dev/).  
It automates key workflows such as user registration, login, and category creation via both UI and API interactions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Structure and Refactoring Decisions](#structure-and-refactoring-decisions)

## Prerequisites
Before running the tests, make sure you have the following tools installed:  
- **Node.js** (version 14 or higher)
- **Playwright** (installed via npm)  
- **Git** (for version control)

## Installation

1. **Clone the repository**:  
   `git clone https://github.com/amirandaf/qubika-e2e.git`

2. Navigate into the project directory:  
   `cd qubika-e2e`

3. Install project dependencies:  
   `npm install`

4. Install Playwright browsers:  
   `npx playwright install`

## Project Structure
Here is an overview of the folder structure in the project:

```
qubika-e2e/  
│  
├── .github/                # GitHub CI/CD configurations (optional)  
├── node_modules/           # Project dependencies (auto-generated)  
├── playwright-report/      # Playwright test reports  
├── test-results/           # Results and logs of the test runs  
├── tests/  
│      ├── utils/  
│      │      ├── helpers.ts     # Helper functions and utilities  
│      ├── qubika.test.ts      # Main test file for E2E testing  
│      └── test-results/       # Additional test result files (optional)  
├── .gitignore              # Files and folders to be ignored by Git  
├── package.json            # Project dependencies and scripts  
├── package-lock.json       # Dependency tree (auto-generated)  
└── playwright.config.ts    # Playwright configuration file  
```
## Running Tests
To run the tests with the browser visible:  
In the `qubika.test.ts` file on line 17: change the “headless” parameter to false.  
`npx playwright test`

To run the tests in headless mode (no browser UI):  
In the `qubika.test.ts` file on line 17: change the “headless” parameter to true.  
`npx playwright test`

To view test reports after running the tests:  
`npx playwright show-report`

## Configuration
You can adjust various settings in the `playwright.config.ts` file.  
Some common configurations include:  

- `timeout`: Sets the maximum time Playwright will wait for any operation to complete.  
- `use` settings: Specifies options like headless, baseURL, etc.  

Example configuration:

```javascript
...
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 ...
```

### Structure and Refactoring Decisions

1. **Code Modularization**:
   - Functions like `registerUser`, `login`, `createCategory`, and `createSubCategory` have been separated into a utilities file (`helpers`) to keep the code clean and promote reusability. This ensures that each function has a single responsibility, following the *Single Responsibility Principle* (SRP).

4. **Automated Tests with UI Validations**:
   - UI validations were added before and after login to ensure that key UI elements are visible and functional. These validations guarantee that the application correctly loads UI components at different stages of the user flow.
   - The login and category/subcategory creation flows through the UI validate the integration with the API, ensuring that users created via the API can be utilized in the UI.

5. **Naming Conventions**:
   - To avoid data conflicts between tests, unique emails and category names are generated using random names. This ensures that tests are consistent and that the created data is easy to identify in logs or databases when reviewing the results.

