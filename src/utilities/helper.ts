export function assignDataToInstance<T>(data: T, instance: T) {
  const keys = Object.keys(data || {});
  keys.forEach((key) => {
    (instance as any)[key] = (data as any)[key];
  });
}

export function generatorID() {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
