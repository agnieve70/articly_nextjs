/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image';

function Logo(props) {
   const {width, height} = props;
  return (
    <div className="row justify-content-center">
      <Image src={"/logo-01.png"} height={height} width={width} alt="articly logo" />
    </div>
  );
}

export default Logo