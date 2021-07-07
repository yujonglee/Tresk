/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import IntroIcons from './IntroIcons';

describe('IntroIcons', () => {
  it('renders icon links to github', () => {
    const { getByRole } = render(<IntroIcons />);

    expect(getByRole('link', { name: 'github' }))
      .toHaveAttribute(
        'href',
        'https://github.com/yujong-lee/project-react-4-yujong-lee',
      );
  });

  it('renders icon links to blog', () => {
    const { getByRole } = render(<IntroIcons />);

    expect(getByRole('link', { name: 'blog' }))
      .toHaveAttribute(
        'href',
        'https://www.yujonglee.com/about',
      );
  });
});
