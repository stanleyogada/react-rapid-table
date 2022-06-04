export type TUser = {
  id: string
  name: string
  username: string
}

export const getAllUsers = async (x?: any, y?: any): Promise<TUser[]> => {
  console.log(x, y)

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data as Promise<TUser[]>
}
