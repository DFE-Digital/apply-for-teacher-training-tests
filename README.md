# Apply for teacher training tests

Install the required version of `node` using `nvm`:

```bash
nvm
```

Install dependencies:

```bash
yarn
```

Create a `cypress.env.json` from the example:

```bash
cp cypress.env.json.example cypress.env.json
vim cypress.env.json
```

You'll need to replace the following variables:

| Name                 | Explanation                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| GOVUK_NOTIFY_API_KEY | A Notify API key. Needs to be a Live one because we need to check the email logs for live environments, such as QA or Staging or Production. |

Run cypress end to end tests:

```bash
yarn cypress open # Interactive test runner
# or
yarn cypress run # Headless
```

## Licence

[MIT](LICENCE).
