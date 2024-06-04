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
})