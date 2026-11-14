const produccion = "https://mificho.onrender.com"
const local = "http://127.0.0.1:8000"

export const API_URL = produccion;


// fetch a la API con el token de la sesión. Si el token ya no sirve, cierra la sesión.
export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (res.status === 401 && token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    return res;
}
