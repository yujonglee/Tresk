Feature('Fold/Unfold');

Scenario('can fold tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.click('첫 번째 할 일');
  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');

  I.click('접기');
  I.dontSee('두 번째 할 일');
});

Scenario('can unfold tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.click('첫 번째 할 일');
  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');

  I.click('접기');

  I.click('펼치기');
  I.see('두 번째 할 일');
});
