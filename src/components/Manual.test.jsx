/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import Manual from './Manual';

describe('Manual', () => {
  context('when manual is closed', () => {
    it('renders manual opener button', () => {
      const { getByRole, queryByRole } = render(<Manual />);

      expect(getByRole('button', { name: 'manualOpener' })).toBeInTheDocument();
      expect(queryByRole('button', { name: 'manualCloser' })).not.toBeInTheDocument();
    });
  });

  context('when manual is opened', () => {
    it('renders title and description', () => {
      const { getByRole, getByText } = render(<Manual />);

      fireEvent.click(getByRole('button', { name: 'manualOpener' }));

      expect(getByText('처음 사용하시나요?')).toBeInTheDocument();
      expect(getByText('각 버튼들이 무슨 일을 하는지 알아봐요.')).toBeInTheDocument();
    });
  });
});
