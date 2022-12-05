
/**
 * Function to obtain a number from a string that may represent a number.
 * @param input_string string that may contain a number.
 * @returns A number if the string represented a number.
 * @returns null if the string didn't represent a number.
 */
export async function parse_int_from_string(input_string: string|undefined): Promise<number | null> {
    let numeric_value: number = Number(input_string);
    if (isNaN(numeric_value)){
        return null;
    } else {
        return numeric_value;
    }
}