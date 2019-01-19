export const commandCreate = cmd => ({ cmd })

export const Commands = {
  signin: commandCreate('singin'),
  signup: commandCreate('signup'),
  userById: commandCreate('user-by-id')
}
