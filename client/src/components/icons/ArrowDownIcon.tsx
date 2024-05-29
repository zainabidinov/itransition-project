import { JSX } from "react/jsx-runtime";

export const ArrowDownIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1.2em'
    role='presentation'
    viewBox='0 0 28 28'
    width='1.2em'
    {...props}
  >
    <g transform='translate(-42 -84)'>
      <path
        stroke='#17C964'
        fill='#17C964'
        d='M55,101.37L52.747,98.836C52.381,98.423 51.748,98.386 51.336,98.753C50.923,99.119 50.886,99.752 51.253,100.164L55.253,104.664C55.442,104.878 55.714,105 56,105C56.286,105 56.558,104.878 56.747,104.664L60.747,100.164C61.114,99.752 61.077,99.119 60.664,98.753C60.252,98.386 59.619,98.423 59.253,98.836L57,101.37L57,92C57,91.448 56.552,91 56,91C55.448,91 55,91.448 55,92L55,101.37Z'
      ></path>
      <path
        stroke='#17C964'
        fill='#17C964'
        d='M14,85C6.825,85 1,90.825 1,98C1,105.175 6.825,111 14,111C21.175,111 27,105.175 27,98C27,90.825 21.175,85 14,85ZM14,87C20.071,87 25,91.929 25,98C25,104.071 20.071,109 14,109C7.929,109 3,104.071 3,98C3,91.929 7.929,87 14,87Z'
        transform='rotate(-180 35 98)'
      ></path>
    </g>
  </svg>
);
