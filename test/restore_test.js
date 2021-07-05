Feature('Restore');

Scenario('Can restore deleted tasks', ({ I }) => {
  I.amOnPage('http://localhost:8080');
  I.see('로그 없음');

  I.fillField('할 일', '첫 번째 할 일');
  I.click('추가');

  I.fillField('할 일', '두 번째 할 일');
  I.click('추가');

  I.click('//*[@id="app"]/div/div[2]/ul/li[1]/button[2]');
  I.click('완료');

  I.click('로그 열기');
  I.see('첫 번째 할 일');
  I.see('두 번째 할 일');

  I.click('//*[@id="app"]/div/div[3]/ul/div[2]/li/button');
  I.click('로그 닫기');
  I.see('두 번째 할 일');
  I.dontSee('첫 번째 할 일');
});
