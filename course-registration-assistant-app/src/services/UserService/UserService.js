export const isUserLogin = async () => {

    return localStorage.getItem("user") !== null && localStorage.getItem("user") !== "";
}

export const signupUser = async (signupData) => {
    //when a user logs in for the first time 
    return fetch(process.env.REACT_APP_WEB_SERVICE_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(signupData)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const jsonData = response.json();
        return jsonData;
    }).then(json => {
        return json;
    }).catch(error => {
        throw error;
    })
}


export const logUserIn = async (loginData) => {
    // working with the request, process the result 
    // then resolve or reject based on the result. 
    return fetch(process.env.REACT_APP_WEB_SERVICE_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(loginData)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then(json => {
        localStorage.setItem("user", JSON.stringify(json.user));
        return json;
    }).catch(error => {
        throw error;
    })
}

export const logUserOut = () => {
    localStorage.removeItem("user");
}

export const getUser = () => {
    return localStorage.getItem("user");
}
