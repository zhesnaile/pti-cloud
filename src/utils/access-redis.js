export async function redis_auth_check(user, password) {
    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} ERROR: Failed login`);
        return false;
    }
    console.log(`${Date.now()}: Log in attempt with user '${user}' and password '${password}'`);
    return true;
}
