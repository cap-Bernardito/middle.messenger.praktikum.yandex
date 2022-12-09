// Принимает массив и возвращает его первый элемент.
// - если аргументом окажется не массив, функция должна вернуть undefined
// - если функция вышла за границы массива, должна вернуть undefined

export function first(list: unknown[]) {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length === 0 ? undefined : list[0];
}
