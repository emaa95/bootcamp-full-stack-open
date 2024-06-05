const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  
  test('Login form is shown', async ({ page }) => {
    // Verifica que el campo de usuario esté presente y visible
    await expect(page.getByTestId('username')).toBeVisible();
    
    // Verifica que el campo de contraseña esté presente y visible
    await expect(page.getByTestId('password')).toBeVisible();
    
    // Verifica que el botón de inicio de sesión esté presente y visible
    await expect(page.getByRole('button', { name: 'log in' })).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('test')
      await page.getByTestId('password').fill('test')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'log in' }).click()
    
    await page.waitForSelector('.error')
    const errorDiv = page.locator('.error')

    await expect(errorDiv).toContainText('Wrong credentials...')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })
})