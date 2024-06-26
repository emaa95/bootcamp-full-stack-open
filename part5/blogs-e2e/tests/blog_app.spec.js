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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('test')
        await page.getByTestId('password').fill('test')
        await page.getByRole('button', { name: 'log in' }).click()
        await expect(page.getByText('test logged in')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByTestId('title').fill('test')
        await page.getByTestId('author').fill('test')
        await page.getByTestId('url').fill('www.test.com')

        await page.getByRole('button', { name: '+' }).click()

        await expect(page.getByText('test was created successfully')).toBeVisible()
        
        const blogList = page.locator('.div-galery'); 
        await expect(blogList).toContainText('test');
    })
    
    test('like can be changed', async ({ page }) => {
    
      const blogElement = await page.locator(`text="test"`).locator('..'); // Ir al elemento padre
      const viewButton = blogElement.getByRole('button', { name: 'view' });
      await viewButton.click();
    
      // Verificar que se muestre el contenido después de hacer clic en "view"
      await expect(blogElement.getByRole('button', { name: 'hide' })).toBeVisible(); 

      const addLike = blogElement.locator('[data-testid="like-button"]');

      const likesCountBefore = parseInt(await blogElement.locator('p').nth(0).innerText());
      await addLike.click();
      const likesCountAfter = parseInt(await blogElement.locator('p').nth(1).innerText());

      expect(likesCountAfter).toBe(likesCountBefore + 1);

    })

    test('blog can be eliminated', async ({ page }) => {
      const blogElement = await page.locator(`text="test"`).locator('..'); // Ir al elemento padre
      const viewButton = blogElement.getByRole('button', { name: 'view' });
      await viewButton.click();
    
      // Verificar que se muestre el contenido después de hacer clic en "view"
      await expect(blogElement.getByRole('button', { name: 'hide' })).toBeVisible(); 

      page.on('dialog', dialog => dialog.accept());
      
      const deleteBlog = blogElement.locator('[data-testid="delete-button"]')
      await deleteBlog.click()

      await expect(blogElement).not.toBeVisible();
      
      await expect(page.getByText('Blog was successfully deleted')).toBeVisible()

    })

    test('only creator can see delete button', async ({ page }) => {
      // Create a new blog as 'test' user
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByTestId('title').fill('test')
      await page.getByTestId('author').fill('test')
      await page.getByTestId('url').fill('www.test.com')
      await page.getByRole('button', { name: '+' }).click()
      await expect(page.getByText('test was created successfully')).toBeVisible()
      
      // Log out
      await page.getByRole('button', { name: 'log out' }).click()
      
      await page.context().clearCookies();
      await page.evaluate(() => localStorage.clear());
      await page.evaluate(() => sessionStorage.clear());
      // Log in as a different user
      await page.getByTestId('username').fill('root2')
      await page.getByTestId('password').fill('root2')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('root2 logged in')).toBeVisible()

      // Verify that the delete button is not visible for the new user
      const blogElement = await page.locator(`text="test"`).locator('..'); // Ir al elemento padre
      const viewButton = blogElement.getByRole('button', { name: 'view' });
      await viewButton.click();

      // Verificar que no se muestre el botón de eliminar
      const deleteButton = blogElement.locator('[data-testid="delete-button"]')
      await expect(deleteButton).toBeHidden();
    })

    test('blogs are ordered by likes in descending order', async ({ page }) => {
      // Assuming each blog is in a container with class 'blog' and likes are in an element with class 'likes'
      const blogElements = await page.locator('.blog').elementHandles();
      
      // Extract likes for each blog
      let likes = [];
      for (const blogElement of blogElements) {
        const likesText = await blogElement.$eval('.likes', node => node.innerText);
        likes.push(parseInt(likesText));
      }

      // Check if likes are sorted in descending order
      for (let i = 0; i < likes.length - 1; i++) {
        expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1]);
      }
    })

    })

})