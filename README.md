# Apply for teacher training tests

Install the required version of `node` using `nvm`:

```bash
nvm
```

Install dependencies:

```bash
yarn
```

Create a `cypress.env.json` and replace the necessary variables:

```bash
cp cypress.env.json.example cypress.env.json
vim cypress.env.json
```

Run cypress end to end tests:

```bash
yarn cypress open # Interactive test runner
# or
yarn cypress run # Headless
```

## Licence

[MIT](LICENCE).
