const useApi = () => {
    const login = async (_payload) => {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_payload),
        });
        const data = await response.json();
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
    };
    const apiCall = async (url, options = {}) => {
        const token = localStorage.getItem('token')
        if (!token) return;
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json()
        if (response.status === 401) {
            const refreshResponse = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: token }),
            });
            const refreshData = await refreshResponse.json();
            setToken(refreshData.access);
            return apiCall(url, options);
        }
        return data;
    };
    return { login, apiCall };
};
export default useApi;
