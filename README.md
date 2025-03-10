# TicTuk_QA_Assessment

## Task Completion Timestamps

- **Start Time:** YYY-MM-DD AM/PM (UTC)
- **End Time:** YYY-MM-DD AM/PM (UTC)

## Final Order Number

- **Order Number:** [Order Number]

## Setting up

- Install node and playwright dependencies: `npm i && npx playwright install --with-deps`
  - You only need to run `npm i` when updating dependencies

### Core Environment Variables

You will need to set up a series of environment variables to get this project to work.

Create the `playwright\environment\.env` file. The file minimally must have the following attributes. use the .env.example as guide

```bash
BASE_URL = https://staging.njs-qa1.lji.li/
STORE_ADDRESS = 700 Wilshire Blvd, Santa Monica, CA 90401, USA.
CARDHOLDER_NAME = APRO
CREDIT_CARD_NUMBER = 5031 7557 3453 0604
EXPIRATION_DATE = 11/25
CVV = 123
RUT = 11.111.111-1
API_ENDPOINT = https://mng-qa1.lji.li/api/getReportNew/
```

## running tests

- Run `npm test` to run the tests headless
- Run `npx playwright test --grep '<test_name>'` to run only 1 test scenario.
  - if you are familiar with playwright UI, Run `npm start` to start the playwright UI

## typescript and playwright best practices

### git push commits

Before any commit, husky will run `npm run format && npm run lint` to apply [ESLint](https://eslint.org/) rules and pretty format to the code before any commit is created. then, commit message validation is done to apply conventional commits. based on pre-commit and commit-msg defined with [Husky](https://typicode.github.io/husky/).

- CODEOWNER
  - In addition codeowner file was set in github folder to request my review before merge of any pull-request

### Visual Studio Code Recommended Extensions (optional)

- [Node Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)
- [prettier ESlint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Playwright Test for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)
- [code spell checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - In case english is not your native language (like my case), this last extension is really helpful. Otherwise, ignore this last recommended extension.

## Playwright Configuration

- [Playwright Configuration](https://playwright.dev/docs/test-configuration.)
- [Playwright Report Configuration](https://playwright.dev/docs/test-reporters)
- [Playwright Test Configuration](https://playwright.dev/docs/api/class-testoptions)
- [Playwright Test Trace Viewer](https://playwright.dev/docs/trace-viewer)

## Updating playwright

Time to time playwright must be updated since it is a good practice and also to be supported.

- Check if your have the latest version `npm outdated @playwright/test`.
- Now install the latest version if applicable `npm install -D @playwright/test@latest` (or replace "latest" with the specific version you want to install).
- Each time you update playwright, browser's drivers that playwright use should be updated also to be compatible with the latest version. This is done via commands `npx playwright install`.

It is recommended to execute test after any playwright version upgrade.

### Rules

As part of the best practices I have included the usage of rules in playwright to facilitate alignment with others QA if applicable, they were defined by myself according my experience but it is very negotiable with the team to decide whether some rules could be modified, removed or even more could be added.

- to check the rules applied go to [eslint.config.mjs](eslint.config.mjs).
- consider that jsdoc is also included as part of best practices.
- more doc about playwright rules and recommended rules from [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright#readme)

### additional notes

- I am using playwright report due to simplicity, it is being generated in  `playwright\reports\` in 2 formats, HTML and JSON.
- in .env file constant are defined with default values according Test Scenario as mentioned previously in `Core Environment Variables`, this step is mandatory before executing the code avoid failures.
- setup and teardown are not used in this example since they are no need of login or multiple Test scenarios.
- CI flow was added just to show its usage since this requirement seems to be interesting for the role, but it is not used due to missing github actions definition and also for simplicity.
- by default, headless mode is false and slow motion is set to cero but they could be manually updated in playwright config file to enable headless or debug with slow Motion, as tester preference (by the ay, headless is usually enabled in CI).
- by experience, there is no better strategy for waiting patterns in playwright than just for a locator to not be visible.
