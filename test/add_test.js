Feature('Add');

Scenario('Can add tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.see('첫 번째 할 일');

  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');


  I.see('첫 번째 할 일');
  I.see('두 번째 할 일');

  I.click('첫 번째 할 일');
  I.fillField('할 일', '세 번째 할 일');
  I.click('추가');


  I.see('첫 번째 할 일');
  I.see('두 번째 할 일');
  I.see('세 번째 할 일');

  I.click('세 번째 할 일');
  I.fillField('할 일', '네 번째 할 일');
  I.click('추가');


  I.see('첫 번째 할 일');
  I.see('두 번째 할 일');
  I.see('세 번째 할 일');
  I.see('네 번째 할 일');
});