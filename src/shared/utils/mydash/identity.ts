/*
 * Функция принимает и возвращает одно и то же значение без каких-либо изменений.
 * const object = {'a' : 1};
 * identity(object) === object; // => true
 */

export function identity(value: unknown) {
  return value;
}
