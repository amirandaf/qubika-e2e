import { test, request, chromium , expect} from '@playwright/test';
import { registerUser, login, createCategory, validateCreation } from './utils/helpers'; 

test('register a new user via API and log in via UI with visible browser', async () => {
  const apiContext = await request.newContext();

  // Generate a random email
  const generateRandomEmail = () => `user${Math.floor(Math.random() * 100000)}@test.com`;
  const generatedEmail = generateRandomEmail();
  const password = "Password*";

  // 1. Register a new user via API
  const responseBody = await registerUser(apiContext, generatedEmail, password, ["ROLE_ADMIN"]);

  // 2. Launch the browser and go to the login page
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });
  const page = await browser.newPage();
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login');

  // **Login Page Validations (before login)**
  await expect(page.locator('h3')).toHaveText('Qubika Club'); 
  await expect(page.locator('input[type="email"]')).toBeVisible(); 
  await expect(page.locator('input[type="password"]')).toBeVisible(); 
  await expect(page.locator('button[type="submit"]')).toBeVisible(); 
  await expect(page.locator('input[type="email"]')).toHaveAttribute('placeholder', 'Usuario o correo electrónico');
  await expect(page.locator('input[type="password"]')).toHaveAttribute('placeholder', 'Contraseña'); 

  // 3. Log in via UI
  await login(page, generatedEmail, password);

  // **Post-Login Validations (after login)**
  await page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard'); 
  await expect(page.locator('a.nav-link.active[href="#/dashboard"]')).toBeVisible(); 
  await expect(page.locator('a.nav-link[href="#/contributions"]')).toBeVisible();

  // 4. Create and validate a category
  const randomCategoryName = `Category_${Math.random().toString(36).substring(2, 8)}`;
  await createCategory(page, randomCategoryName);
  await validateCreation(page, randomCategoryName);

  // 5. Create and validate a subcategory
  const randomSubCategoryName = `SubCategory_${Math.random().toString(36).substring(2, 8)}`;
  await createCategory(page, randomSubCategoryName); 
  await validateCreation(page, randomSubCategoryName);

  // Close the browser after finishing
  await browser.close();
});
