const endpoint = 'http://localhost:3000'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const postsUrl = `${endpoint}/posts`
const validateUrl = `${endpoint}/validate`
const cloudinary = "https://api.cloudinary.com/v1_1/dfqall5sk/upload"
const cloudinary_upload_preset = 'ki2mefhc'



const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const jsonify = res => {
    if (res.ok)
        return res.json()
    else
        throw res.json()
}

const saveToken = data => {
    localStorage.setItem('token', data.token)
    return data.user
}

const handleServerError = response => {
    // console.error(response)
    throw response
}

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(saveToken)
        .catch(handleServerError)
}

const logIn = (user) => {
    return fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(res => res.json())
    .then(saveToken)
}

export default {
    validateUser,
    logIn
}