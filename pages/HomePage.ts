export class HomePage {
  constructor(private page) { }

  DISABILITY_QUESTION = 'Do you have a disability that prevents you from working a full-time job?';
  VETERAN_QUESTION = 'Are you a Veteran?'

  locators = {
    getStartedBtn: () => this.page.getByRole('link', { name: 'Get Started Today!' }).first(),
    disabilityFieldset: () => this.page.locator('fieldset').filter({ hasText: this.DISABILITY_QUESTION }),
    yesRadio1: () => this.locators.disabilityFieldset().locator('input[type="radio"][value="Yes"]'),
    noRadio1: () => this.locators.disabilityFieldset().locator('input[type="radio"][value="No"]'),
    veteranFieldset: () => this.page.locator('fieldset').filter({ hasText: this.VETERAN_QUESTION }),
    yesRadio2: () => this.locators.veteranFieldset().locator('input[type="radio"][value="Yes"]'),
    noRadio2: () => this.locators.veteranFieldset().locator('input[type="radio"][value="No"]'),
    firstName: () => this.page.getByRole('textbox', { name: 'First Name *' }),
    lastName: () => this.page.getByRole('textbox', { name: 'Last Name *' }),
    ageSelect: () => this.page.getByLabel('Age*', { exact: true }),
    email: () => this.page.getByRole('textbox', { name: 'Email *' }),
    phone: () => this.page.locator('input[placeholder="111-111-1111"]'),
    stateSelect: () => this.page.getByLabel('State', { exact: true }),
    zipCode: () => this.page.getByRole('textbox', { name: 'ZIP Code' })
  }

  async clickGetStarted() {
    await this.locators.getStartedBtn().click()
  }

  async fillByLabel(labelText: string, value: any) {
    const input = this.page.locator(`label:has-text("${labelText}")`).locator('..').locator('input');
    await input.waitFor({ state: 'visible' });
    await input.fill(value);
  }

  async scrollAndCheck(locator: any) {
    await locator.scrollIntoViewIfNeeded();
    await locator.check();
  }

  async fillForm(data: {
    firstAnswer: string;
    secondAnswer: string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    phone: string;
    state: string;
    zipCode: string;
  }) {
    await this.page.locator('form').waitFor({ state: 'visible' });
    let answer1: string;
    if (data.firstAnswer === 'Yes') {
      answer1 = await this.locators.yesRadio1()
    } else {
      answer1 = await this.locators.noRadio1()
    }

    let answer2: string;
    if (data.secondAnswer === 'Yes') {
      answer2 = await this.locators.yesRadio2()
    } else {
      answer2 = await this.locators.noRadio2()
    }

    await this.scrollAndCheck(answer1);
    await this.scrollAndCheck(answer2);
    await this.locators.firstName().fill(data.firstName)
    await this.locators.lastName().fill(data.lastName)
    await this.locators.ageSelect().selectOption(data.age)
    await this.locators.email().fill(data.email)
    await this.locators.phone().fill(String(data.phone))
    await this.locators.stateSelect().selectOption(data.state)
    await this.locators.zipCode().fill(data.zipCode)
  }
}