// Генерирует числовые последовательности с заданным шагом в прямом и в обратном порядке
// Функция принимает три аргумента:
// - start — число, с которого начнётся последовательность. Это необязательный аргумент: по умолчанию функция начинает с 0.
// - end — число, конец последовательности. Функция остановиться, не доходя до этого значения.
// - step — число, шаг между элементами в последовательности. Это необязательный аргумент: значение по умолчанию — 1.
// - isRight — булево значение. Если false, функция генерирует прямой порядок последовательности. Иначе — обратный.
// В результате функция возвращает массив чисел заданной последовательности.

/*
 * range(4); // => [0, 1, 2, 3]
 * range(-4); // => [0, -1, -2, -3]
 * range(1, 5); // => [1, 2, 3, 4]
 * range(0, 20, 5); // => [0, 5, 10, 15]
 * range(0, -4, -1); // => [0, -1, -2, -3]
 * range(1, 4, 0); // => [1, 1, 1]
 * range(0); // => []
 * rangeRight(4); // => [3, 2, 1, 0]
 * rangeRight(-4); // => [-3, -2, -1, 0]
 * rangeRight(1, 5); // => [4, 3, 2, 1]
 * rangeRight(0, 20, 5); // => [15, 10, 5, 0]
 * rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
 * rangeRight(1, 4, 0); // => [1, 1, 1]
 * rangeRight(0); // => []
 */

const baseRange = (start: number, end: number, step: number, isRight: boolean) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    start += step;
  }

  return result;
};

export function range(start = 0, end?: number, step?: number, isRight = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, isRight);
}

export function rangeRight(start: number, end?: number, step?: number) {
  return range(start, end, step, true);
}
