export function assignDataToInstance<T>(data: T, instance: T) {
  const keys = Object.keys(data || {});
  keys.forEach((key) => {
    (instance as any)[key] = (data as any)[key];
  });
}
