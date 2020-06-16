/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const NotifyClient = require("notifications-node-client").NotifyClient;

const signInEmailFor = emailAddress => notifyEmail =>
  notifyEmail["email_address"] === emailAddress &&
  notifyEmail["subject"].includes("Sign in to Apply for teacher training");

const extractSignInLink = notifyEmail => notifyEmail.body.match(/https.*/)[0];

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const notifyClient = new NotifyClient(config.env["GOVUK_NOTIFY_API_KEY"]);

  on("task", {
    getSignInLinkFor({ emailAddress }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await notifyClient.getNotifications("email");
          const json = response.toJSON();
          const notifyEmail = json.body.notifications.find(
            signInEmailFor(emailAddress)
          );

          resolve(extractSignInLink(notifyEmail));
        } catch (err) {
          console.error("Error in getSignInLinkFor:", err);

          reject(err);
        }
      });
    }
  });
};
