import React from "react";
import Image from "next/image";

function VerifyUser(props) {
  if (!props.status) {
    return (
      <div className="row justify-content-center">
        <Image
          src={"/invalid_code.png"}
          height={600}
          width={850}
          alt="articly logo"
        />
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <Image
        src={"/verified.png"}
        height={500}
        width={500}
        alt="articly logo"
      />
      <h2 className="text-center">
        {" "}
        <span className="text-success">User Verified!</span> You can now Login.
      </h2>
    </div>
  );
}

export async function getServerSideProps(context) {
  const code = context.query.id;

  const response = await fetch(
    `${process.env.base_url}/api/auth/confirmemail`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ code: code }),
    }
  );
  const result = await response.json();

  let status = false;

  if (result.status === 1) {
    status = true;
  }

  return {
    props: {
      status: status,
    },
  };
}

export default VerifyUser;
