Feature('Header');

Scenario('Can see header', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.see('Tresk');
});