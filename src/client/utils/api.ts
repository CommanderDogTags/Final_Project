// checks to see if a token exists
export let Token: string = localStorage.getItem('token') || null

// checks if a user exists and checks what their id and role are
export let User: any = {
    user_id: localStorage.getItem('user_id') || null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null
};

export const json = async (uri: string, method: string = 'GET', body?: {}) => {
    const headers: any = {
        'Content-type': 'application/json'
    };
    if (Token) {
        headers['Authorization'] = `Bearer ${Token}`
    }
    try {
        let r = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (r.ok) {
            return await r.json();
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const setStorage = (token: string, user: {} = {user_id: undefined, role: undefined}) => {
    Token = token;
    User = user;
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", User.user_id);
    localStorage.setItem("role", User.role);
};