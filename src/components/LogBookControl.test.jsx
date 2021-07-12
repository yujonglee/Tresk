/**
 * @jest-environment jsdom
 */

import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import given from 'given2';

import { toggleLogBookOpen } from '../redux_module/todoSlice';
import LogBookControl from './LogBookControl';

describe('LogBookControl', () => {
  const dispatch = jest.fn();

  const renderLogBookControl = () => (
    render((
      <LogBookControl
        isEmpty={given.isEmpty}
        isOpen={given.isOpen}
      />
    ))
  );

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    dispatch.mockClear();
  });

  context('when logBook is empty', () => {
    given('isEmpty', () => true);

    it('renders disabled button', () => {
      const { getByRole } = renderLogBookControl();

      expect(getByRole('button', { name: 'isEmpty' })).toBeDisabled();
    });
  });

  context('when logBook is not empty', () => {
    given('isEmpty', () => false);

    context('when LogBook is closed', () => {
      given('isOpen', () => false);

      it('renders button listening click event', () => {
        const { getByRole } = renderLogBookControl();

        fireEvent.click(getByRole('button', { name: 'logBookOpener' }));

        expect(dispatch).toBeCalledWith(toggleLogBookOpen());
      });
    });

    context('when LogBook is opened', () => {
      given('isOpen', () => true);

      it('renders "로그 닫기" button', () => {
        const { getByRole } = renderLogBookControl();

        fireEvent.click(getByRole('button', { name: 'logBookCloser' }));

        expect(dispatch).toBeCalledWith(toggleLogBookOpen());
      });
    });
  });
});
