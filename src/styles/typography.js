import { css } from '@emotion/react';

/** Body. Size follows html font-size (12px = 120% of the 10px design). */
export const bodyText = css`
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
`;

/** Caption. 0.8 × body (9.6px at 12px root). */
export const captionText = css`
  font-size: 0.8rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;
