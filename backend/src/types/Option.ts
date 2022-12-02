import Some from "./Some"

/**
 * @category model
 */
export type None = {
}

/**
 * @category model
 */
export type Option<T> = None | Some<T>

/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 */
export const none: Option<never> = _.none

/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 */
//export const some: <T>(a: T) => Option<T> = _.some

export function some<T>(value: T): Option<T> {
  return new Some<T>(value);
}

let balls: Option<string> = some("asd");

//if (balls)

console.log()