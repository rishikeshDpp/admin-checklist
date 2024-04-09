import React from "react";

function TrashIcon({styles}) {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
    >
      <path d="M18.87 6h1.007l-.988 16.015A1.051 1.051 0 0117.84 23H6.158a1.052 1.052 0 01-1.048-.984v-.001L4.123 6h1.003l.982 15.953a.05.05 0 00.05.047h11.683zM9.5 19a.5.5 0 00.5-.5v-10a.5.5 0 00-1 0v10a.5.5 0 00.5.5zm5 0a.5.5 0 00.5-.5v-10a.5.5 0 00-1 0v10a.5.5 0 00.5.5zM5.064 5H3V4h5v-.75A1.251 1.251 0 019.25 2h5.5A1.251 1.251 0 0116 3.25V4h5v1H5.064zM9 4h6v-.75a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25z"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
}

export default TrashIcon;
