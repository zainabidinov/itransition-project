import React from "react";
import { JSX } from "react/jsx-runtime";

export const UnlockIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1.2em'
    role='presentation'
    viewBox='0 0 20 20'
    width='1em'
    color='#e5e7eb'
    {...props}
  >
    <g
      fill='none'
      fill-rule='evenodd'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <g
        stroke='#7828C8'
        stroke-width='2'
        transform='translate(-1217 -2130)'
      >
        <g transform='translate(1218 2130)'>
          <rect width='18' height='11' y='10' rx='2'></rect>
          <path d='M4 10V6a5 5 0 0 1 9.9-1'></path>
        </g>
      </g>
    </g>
  </svg>
);
