export async function redis_auth_check(user, password) {
    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} ERROR: Failed login`);
        return false;
    }
    console.log(`${Date.now()}: LOL in attempt with user '${user}' and password '${password}'`);
    return true;
}

export async function redis_reg_check(user, password, password2) {
    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} ERROR: Failed login`);
        return false;
    }
    else if(password !== password2){
        console.log(`${Date.now()} ERROR: Passwords differ`);
        return false;
    }
    else if(user === 'jordi'){
        console.log(`${Date.now()} ERROR: User exists in the DB`);
        return false;
    }
    console.log(`${Date.now()}: Register attempt with user '${user}' and password '${password}'`);
    return true;
}

//sudo apt-get install redis (linux)
//brew install redis (mac)

/*
Turn on the server: redis-server
get in the server: redis-cli

*/