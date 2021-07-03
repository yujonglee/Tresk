Feature('Restore');

Scenario('Can restore deleted tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.click('//*[@id="app"]/div/div[2]/ul/li/button[2]');

  I.click('로그 열기');
  I.see('첫 번째 할 일');

  I.click('복구');
  I.click('로그 닫기');
  I.see('첫 번째 할 일');
});
