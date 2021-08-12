/* eslint-disable react/no-array-index-key */
import { Typography, Link } from '@material-ui/core';

import taskStringParser from '../taskStringParser';

export default function TaskTitle({ title, isSelected }) {
  const result = taskStringParser(title);

  const color = isSelected ? 'primary' : 'secondary';

  return (
    <>
      {result.map((data, i) => {
        if (Array.isArray(data)) {
          const [url, name] = data;
          return (
            <Link
              key={i}
              href={url}
              variant="h6"
              color={color}
              style={{ fontWeight: 800 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </Link>

          );
        }

        return (
          <Typography
            key={i}
            display="inline"
            variant="h6"
            color={color}
          >
            {data}
          </Typography>
        );
      })}
    </>
  );
}
