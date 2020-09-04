const ENVIRONMENT = Cypress.env("ENVIRONMENT") || "Unknown";
const CANDIDATE_EMAIL = Cypress.env("CANDIDATE_TEST_EMAIL");

describe(`[${ENVIRONMENT}] Candidate`, () => {
  it("can sign up successfully", () => {
    givenIAmOnTheHomePage();
    andItIsAccessible();
    whenIClickOnStartNow();
    whenIChooseToCreateAnAccount();
    if (isBetweenCycles() && !isSandbox())
      return thenIShouldBeToldThatApplicationsAreClosed();
    else thenICanCheckMyEligibility();

    whenICheckThatIAmEligible();
    andIClickContinue();
    thenICanCreateAnAccount();

    whenITypeInMyEmail();
    andAgreeToTermsAndConditions();
    andIClickContinue();
    thenIAmToldToCheckMyEmail();

    whenIClickTheLinkInMyEmail();
    andIClickContinue();
    thenIShouldBeSignedInSuccessfully();
  });
});

const givenIAmOnTheHomePage = () => {
  cy.visit("/candidate");
  cy.contains("Start now");
};

const andItIsAccessible = () => {
  cy.runAxe();
};

const whenIClickOnStartNow = () => {
  cy.contains("Start now").click();
};

const whenIChooseToCreateAnAccount = () => {
  cy.contains("No, I need to create an account").click();
  cy.contains("Continue").click();
};

const thenICanCheckMyEligibility = () => {
  cy.contains("Check we’re ready for you to use this service");
};

const whenICheckThatIAmEligible = () => {
  cy.get(
    "#candidate-interface-eligibility-form-eligible-citizen-yes-field"
  ).click();
  cy.get(
    "#candidate-interface-eligibility-form-eligible-qualifications-yes-field"
  ).click();
};

const andIClickContinue = () => {
  cy.contains("Continue").click();
};

const thenICanCreateAnAccount = () => {
  cy.contains("Create an Apply for teacher training account");
};

const whenITypeInMyEmail = () => {
  cy.get("#candidate-interface-sign-up-form-email-address-field").type(
    CANDIDATE_EMAIL
  );
};

const andAgreeToTermsAndConditions = () => {
  cy.get(
    "#candidate-interface-sign-up-form-accept-ts-and-cs-true-field"
  ).click();
};

const thenIAmToldToCheckMyEmail = () => {
  cy.contains("Check your email");
};

const whenIClickTheLinkInMyEmail = () => {
  cy.task("getSignInLinkFor", { emailAddress: CANDIDATE_EMAIL }).then(
    signInLink => {
      cy.visit(signInLink);
    }
  );
};

const thenIShouldBeSignedInSuccessfully = () => {
  cy.contains("Choose a course first");
};

const isBetweenCycles = () => {
  const endOfCycle = +new Date(2020, 7, 24);
  const startOfNewCycle = +new Date(2020, 9, 13);
  const currentTime = +new Date();

  return currentTime > endOfCycle && currentTime < startOfNewCycle;
};

const thenIShouldBeToldThatApplicationsAreClosed = () => {
  cy.contains("Applications for courses starting this year have closed.");
};

const isSandbox = () => ENVIRONMENT === "Sandbox";
