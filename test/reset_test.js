Feature('Reset');

Scenario('Can reset logbook', ({ I }) => {
  I.amOnPage('http://localhost:8080');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');

  I.click('//*[@id="app"]/div/div[2]/ul/li[2]/button[2]');
  I.click('//*[@id="app"]/div/div[2]/ul/li/button[2]');

  I.click('로그 열기');
  I.see('# 첫 번째 할 일');
  I.see('# 두 번째 할 일');
  I.click('초기화');

  I.dontSee('# 첫 번째 할 일');
  I.dontSee('# 두 번째 할 일');

  I.click('되돌리기');
  I.click('되돌리기');
  I.dontSee('첫 번째 할 일');
  I.dontSee('두 번째 할 일');
});
