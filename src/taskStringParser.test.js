import taskStringParser from './taskStringParser';

describe('taskStringParser', () => {
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
