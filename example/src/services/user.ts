export const getAllUsers = async (x: any, y: any) => {
  console.log(x, y)

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
}
