export const fetchUsers = async () => {
  const request = await fetch("https://jsonplaceholder.typicode.com/users");
  return await request.json();
};
