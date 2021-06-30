Feature('Delete');

Scenario('Can delete tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');

  I.click('첫 번째 할 일');
  I.fillField('할 일', '세 번째 할 일');
  I.click('추가');

  I.click('//*[@id="app"]/div/div[1]/ul/li[2]/button[2]');
  I.dontSee('두 번째 할 일');
  I.see('첫 번째 할 일');

  I.click('//*[@id="app"]/div/div[1]/ul/li[1]/ul/li/button[2]');
  I.dontSee('세 번째 할 일');
  I.see('첫 번째 할 일');
});