export function getToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MzQxNTc0NH0.z9XdTubW2Uo8uGSDwvuy_idvgMKgm0ZePC79P7paRog";
}

export function getAuthHeaders() {
  return {
    "content-Type": "application/json",
    Authorization: `${getToken()}`,
  };
}