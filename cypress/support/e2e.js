import "./commands";
import Routes from "../support/routes";

beforeEach(() => {
  const routes = new Routes();
  routes.init();
  Cypress.session.clearAllSavedSessions();
});
