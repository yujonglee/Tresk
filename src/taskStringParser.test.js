import taskStringParser from './taskStringParser';

describe('taskStringParser', () => {
  context("when there aren't any url", () => {
    const result = taskStringParser('taskTitle');

    expect(result).toEqual(['taskTitle']);
  });

  context('when there are only one url', () => {
    const middle = ['ab 가나 [https://material-ui.com/](메테리얼)cd 다라',
      'ab 가나 ',
      ['https://material-ui.com/', '메테리얼'],
      'cd 다라'];

    const first = ['[https://material-ui.com/](메테리얼)cd 다라',
      '',
      ['https://material-ui.com/', '메테리얼'],
      'cd 다라'];

    const last = ['ab 가나 [https://material-ui.com/](메테리얼)',
      'ab 가나 ',
      ['https://material-ui.com/', '메테리얼'],
      ''];

    it.each([middle, first, last])('parses %s', (original, left, urlData, right) => {
      const result = taskStringParser(original);

      expect(result[0]).toBe(left);

      expect(result[1]).toEqual(urlData);

      expect(result[2]).toBe(right);
    });
  });
});

context("when there aren't any url", () => {
  const result = taskStringParser('taskTitle');

  expect(result).toEqual(['taskTitle']);
});

context('when there are only one url', () => {
  const middle = ['ab 가나 [https://material-ui.com/](메테리얼)cd 다라 ab 가나 [https://material-ui.com/](메테리얼)cd 다라',
    'ab 가나 ',
    ['https://material-ui.com/', '메테리얼'],
    'cd 다라 ab 가나 ',
    ['https://material-ui.com/', '메테리얼'],
    'cd 다라'];

  it.each([middle])('parses %s', (original, text1, urlData1, text2, urlData2, text3) => {
    const result = taskStringParser(original);

    expect(result[0]).toBe(text1);

    expect(result[1]).toEqual(urlData1);

    expect(result[2]).toBe(text2);

    expect(result[3]).toEqual(urlData2);

    expect(result[4]).toBe(text3);
  });
});
