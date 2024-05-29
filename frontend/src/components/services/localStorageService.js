function setToken(token) {
    localStorage.setItem("ACCESS_TOKEN", token)
}

function getToken() {
    return localStorage.getItem("ACCESS_TOKEN")
}

function removeToken() {
    localStorage.removeItem("ACCESS_TOKEN")
}

function getRole() {
    if(getToken()) {
        return "user"
    } else {
        return "guest"
    }
}

function setUserDetail(data) {
    localStorage.setItem("USER_PROFILE", data)
}

function getUserDetail() {
    return localStorage.getItem("USER_PROFILE")
}

function removeUserDetail() {
    localStorage.removeItem("USER_PROFILE")
}

const userService = {
    setToken,
    getToken,
    removeToken,
    getRole,
    setUserDetail,
    getUserDetail,
    removeUserDetail
};

export default userService;