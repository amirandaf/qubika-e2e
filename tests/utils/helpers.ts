
import { expect } from '@playwright/test';
export async function registerUser(apiContext, email, password, roles) {
    const registerRequest = { email, password, roles };
    const response = await apiContext.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
      data: registerRequest,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
    return responseBody;
  }
  
  export async function login(page, email, password) {
    await page.goto('https://club-administration.qa.qubika.com/#/auth/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('https://club-administration.qa.qubika.com/#/dashboard');
  }
  
  export async function createCategory(page, categoryName) {
    await page.click('a.nav-link[href="#/category-type"]');
    await page.waitForURL('https://club-administration.qa.qubika.com/#/category-type');
    await page.click('div[style="position: absolute; right: 15px;"] button.btn.btn-primary');
    await page.fill('input[formcontrolname="name"]', categoryName);
    await page.click('button[type="submit"].btn.btn-primary');
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible();
  }

  export async function createSubCategory(page, subCategoryName, categoryName) {
    await page.click('a.nav-link[href="#/category-type"]');
    await page.waitForURL('https://club-administration.qa.qubika.com/#/category-type');
    await page.click('button.btn.btn-primary');
    await page.fill('input[formcontrolname="name"]', subCategoryName);
    await page.click('#mat-dialog-1 > app-tables > form > div:nth-child(2) > div > div:nth-child(2) > div > div > label');
    await page.click('ng-select[formcontrolname="categoryId"]');
    await page.waitForSelector('.ng-dropdown-panel');
    await page.click(`div.ng-option span:has-text("${categoryName}")`);
    await page.click('button[type="submit"].btn.btn-primary');
    await expect(page.locator('div[role="alertdialog"]')).toBeVisible();
  }
  
  export async function validateCategoryCreation(page, itemName) {
    await page.waitForSelector('ul.pagination.justify-content-end.mb-0');
    const paginationList = await page.locator('ul.pagination.justify-content-end.mb-0');
    const penultimateChild = paginationList.locator('li').nth(-2);
    await penultimateChild.click();
    await page.waitForTimeout(3000);
    await page.locator(`td:has-text("${itemName}")`);
  }
  
