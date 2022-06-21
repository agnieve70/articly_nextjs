export async function getAllConcerns() {
  const response = await fetch(`${process.env.base_url}/api/concern`);

  const data = await response.json();
  return data;
}

export async function getUser(id) {
  const response = await fetch(`${process.env.base_url}/api/auth/user`);

  const data = await response.json();
  return data;
}

export async function getAdmins(id) {
  const response = await fetch(`${process.env.base_url}/api/auth/admin`);

  const data = await response.json();
  return data;
}

export async function deleteUser(id) {
  const response = await fetch(`/api/auth/delete?id=${id}`, {
    method: "DELETE",
  });

  const user = response.json();
  return user;
}

export async function updateUser(id, name, email) {
  const response = await fetch("/api/auth/update", {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      name: name,
      email: email,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  const article = response.json();
  return article;
}