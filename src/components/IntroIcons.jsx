import { Icon, Link } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss';
import { useEffect } from 'react';

export default function IntroIcons() {
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <>
      <Link
        aria-label="github"
        href="https://github.com/yujong-lee/project-react-4-yujong-lee"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          className="fab fa-github"
          fontSize="small"
        />
      </Link>
      <Link
        aria-label="blog"
        href="https://www.yujonglee.com/about"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          className="fas fa-user-circle"
          fontSize="small"
        />
      </Link>
    </>
  );
}
