export default class Some<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value; 
    }

    unwrap(): T {
        return this._value;
    }
}
