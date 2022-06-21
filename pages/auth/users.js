import React, { useState, useEffect } from "react";
import UserForm from "../../components/user/form";
import UserTable from "../../components/user/table";
import { getAdmins } from "../../helpers/api-utils";
import { getSession } from "next-auth/client";

function UsersPage(props) {
  const [user, setUser] = useState(null);
  const [action, setAction] = useState(0);
  const [adminData, setAdminData] = useState(props.admins);

    useEffect(()=> {
        async function getAdminData(){
            const admins = await getAdmins();
            setAdminData(admins.data);
        }
        getAdminData();
    }, [action]);
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <UserForm user={user} setUser={setUser} action={action} setAction={setAction} />
        </div>
        <div className="col-md-8">
          <UserTable admins={adminData} user={user} action={action} setAction={setAction} setUser={setUser} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const admins = await getAdmins();
  
  return {
    props: {
      session,
      admins: admins.data,
    },
  };
}

export default UsersPage;
