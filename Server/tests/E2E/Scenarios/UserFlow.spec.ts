import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

describe('User Flow E2E', () => {
  let browser: Browser;
  let page: Page;

  before(async () => {
    browser = await chromium.launch();
  });

  before(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    await page.close();
  });

  it('deve completar fluxo de cadastro e login', async () => {
    // Navega para página de registro
    await page.click('[data-testid="register-link"]');
    
    // Preenche formulário
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@test.com');
    await page.fill('[data-testid="password-input"]', '123456');
    
    // Submete formulário
    await page.click('[data-testid="submit-button"]');
    
    // Verifica redirecionamento
    expect(page.url()).toContain('/login');
    
    // Faz login
    await page.fill('[data-testid="email-input"]', 'test@test.com');
    await page.fill('[data-testid="password-input"]', '123456');
    await page.click('[data-testid="login-button"]');
    
    // Verifica se está na dashboard
    expect(page.url()).toContain('/dashboard');
  });
});