import React from "react";

const RotateLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="ms-1 me-1"
    viewBox="0 0 16 16"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M8 3a5 5 0 11-4.546 2.914.5.5 0 00-.908-.417A6 6 0 108 2v1z"
    ></path>
    <path d="M8 4.466V.534a.25.25 0 00-.41-.192L5.23 2.308a.25.25 0 000 .384l2.36 1.966A.25.25 0 008 4.466z"></path>
  </svg>
);

const RotateRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="ms-1 me-1"
    viewBox="0 0 16 16"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M8 3a5 5 0 104.546 2.914.5.5 0 01.908-.417A6 6 0 118 2v1z"
    ></path>
    <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z"></path>
  </svg>
);

const PDFIcon = ({ width = "40" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    viewBox="0 0 256 256"
  >
    <g fill="none" strokeMiterlimit="10" strokeWidth="0">
      <path
        fill="#E2E2E2"
        d="M86.554 26.164v58.519A5.317 5.317 0 0181.237 90H22.076a5.317 5.317 0 01-5.317-5.317V5.317A5.317 5.317 0 0122.076 0h38.315c8.269.135 26.163 16.011 26.163 26.164z"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
      <path
        fill="#F15642"
        d="M16.833 21.859H57.1a5.827 5.827 0 015.827 5.827v18.341a5.827 5.827 0 01-5.827 5.827H9.273a5.827 5.827 0 01-5.827-5.827V16.032"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
      <path
        fill="#BE4030"
        d="M3.446 16.032a5.827 5.827 0 005.827 5.827h7.56V10.552h-7.56a5.827 5.827 0 00-5.827 5.827"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
      <path
        fill="#B7B7B7"
        d="M60.391 0h6.662c2.826 0 5.536 1.123 7.534 3.121l8.847 8.847a10.655 10.655 0 013.121 7.534v6.662a6.19 6.19 0 00-6.19-6.19h-7.866a5.917 5.917 0 01-5.917-5.917V6.191A6.192 6.192 0 0060.391 0z"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
      <path
        fill="#FFF"
        d="M20.708 27.68h-5.489a1.5 1.5 0 00-1.5 1.5v15.331a1.5 1.5 0 103 0V39.78h3.989a4.127 4.127 0 004.122-4.121v-3.858a4.128 4.128 0 00-4.122-4.121zm1.121 7.979c0 .618-.503 1.121-1.122 1.121h-3.989v-6.1h3.989c.619 0 1.122.503 1.122 1.121v3.858zM34.554 27.68h-5.22a1.5 1.5 0 00-1.5 1.5v15.332a1.5 1.5 0 001.5 1.5h5.22a4.396 4.396 0 004.391-4.391v-9.55a4.396 4.396 0 00-4.391-4.391zm1.391 13.941c0 .767-.624 1.391-1.391 1.391h-3.72V30.68h3.72c.767 0 1.391.624 1.391 1.391v9.55zM51.841 27.68h-8.11a1.5 1.5 0 00-1.5 1.5v15.332a1.5 1.5 0 103 0v-6.166h3.812a1.5 1.5 0 100-3H45.23V30.68h6.61a1.5 1.5 0 00.001-3z"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
      <path
        fill="#B7B7B7"
        d="M45.142 69.824a1.5 1.5 0 01-2.122 0l-5.248-5.248v15.642a1.5 1.5 0 11-3 0V64.576l-5.248 5.248a1.5 1.5 0 11-2.121-2.121l6.323-6.323a3.565 3.565 0 012.243-1.024 1.522 1.522 0 01.608 0 3.568 3.568 0 012.243 1.024l6.323 6.323a1.502 1.502 0 01-.001 2.121z"
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      ></path>
    </g>
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="trash_svg__bi trash_svg__bi-trash"
    viewBox="0 0 16 16"
    focusable="false"
  >
    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    ></path>
  </svg>
);

const SuccessIcon = () => (
  // { green SuccessIcon large}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="check_svg__bi check_svg__bi-check-circle-fill"
    viewBox="0 0 16 16"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.354 5.646a.5.5 0 01.146.353v.5a.5.5 0 01-.5.5H7.5a.5.5 0 010-1h1.147L5.854 4.146a.5.5 0 11.707-.708L9 5.293l2.646-2.647a.5.5 0 01.708.708L9.707 5.646z"
    ></path>
  </svg>
  

);
export { RotateLeft, RotateRight, PDFIcon, DeleteIcon, SuccessIcon };
