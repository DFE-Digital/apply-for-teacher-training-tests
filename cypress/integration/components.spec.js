const ENVIRONMENT = Cypress.env("ENVIRONMENT") || "Unknown";

const newarray = document.querySelectorAll("li a")

const hrefs = Array.from(newarray).map(x => x.href)

function terminalLog(violations) {
  const vl = violations.length;
  const xA11yViolations = `${vl} accessibility violation${vl === 1 ? "" : "s"}`;
  const wereDetected = ` ${vl === 1 ? "was" : "were"} detected`;
  cy.task("log", xA11yViolations + wereDetected);

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

describe(`[${ENVIRONMENT}] Components`, () => {
  it("are accessible", () => {
    givenIAmOnTheComponentReviewPage();
    andIClickOnEachComponent();
    thenItShouldBeAccessible();
  });
});

const givenIAmOnTheComponentReviewPage = () => {
  cy.visit("/rails/view_components");
  cy.contains("Candidate Interface/Application Status Tag Component");
};

const andIClickOnEachComponent = () => {
  HREFS.forEach(element => cy.contains(element).click() + thenItShouldBeAccessible() + givenIAmOnTheComponentReviewPage());
};

const thenItShouldBeAccessible = () => {
  cy.injectAxe();
  cy.checkA11y(
    null,
    {
      includedImpacts: ["critical"],
    },
    terminalLog
  );
};
