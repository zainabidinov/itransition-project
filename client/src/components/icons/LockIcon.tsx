import React from "react";
import { JSX } from "react/jsx-runtime";

export const LockIcon = (
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
    color="#e5e7eb"
    {...props}
  >
    <g
      fill='none'
      fill-rule='evenodd'
      stroke= "#7828C8"
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      transform='translate(1 1)'
    >
      <rect width='18' height='11' y='9' rx='2'></rect>
      <path d='M4 9V5a5 5 0 1 1 10 0v4'></path>
    </g>
  </svg>
);
