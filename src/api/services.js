var baseUrl = "http://10.11.0.85/backend/api/";
export async function saveRecord(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "user/saverecord", requestOptions).then((data) =>
    data.json()
  );
}

export async function getRecord() {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: "",
  };
  return await fetch(baseUrl + "user/get_record", requestOptions).then((data) =>
    data.json()
  );
}
export async function admins() {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: "",
  };
  return await fetch(baseUrl + "user/admins", requestOptions).then((data) =>
    data.json()
  );
}
export async function registerAdmin(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "admin/register", requestOptions).then((data) =>
    data.json()
  );
}

export async function saveUser(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "user/register", requestOptions).then((data) =>
    data.json()
  );
}
export async function login(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "admin/login", requestOptions).then((data) =>
    data.json()
  );
}
export async function detail(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "user/get_detail", requestOptions).then((data) =>
    data.json()
  );
}
export async function changeStatus(data) {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: data,
  };
  return await fetch(baseUrl + "user/change_status", requestOptions).then(
    (data) => data.json()
  );
}
