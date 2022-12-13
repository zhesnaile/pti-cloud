import 

/**
 * Expected body of a request for the Login API.
 */
export type loginBody = {
    name: string;
    pword: string;
}

/**
 * Expected body of a request for the RunTask API.
 */
export type runtaskBody = {
    name: string;
    pword: string;
    file: File;
}