// 12345: $2b$12$DGnH5XZHa45Kl..JdMyL2.hPigT0XHUyZds.NaABsDHesdPUhwmXm
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$DGnH5XZHa45Kl..JdMyL2.hPigT0XHUyZds.NaABsDHesdPUhwmXm',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'ellie',
    password: '$2b$12$DGnH5XZHa45Kl..JdMyL2.hPigT0XHUyZds.NaABsDHesdPUhwmXm',
    name: 'Ellie',
    email: 'ellie@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
