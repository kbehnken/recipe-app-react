export function authHeader() {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    // console.log(accessToken);
    if (accessToken) {
        return {
            Authorization: 'Bearer ' + accessToken
        }
    } else {
        return {};
    }
}