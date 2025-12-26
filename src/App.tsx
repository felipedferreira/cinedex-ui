import { useEffect } from 'react';
import { API_BASE_URL } from './services/AppSettings.ts'
import LandingPage from "./Pages/LandingPage.tsx";

const App = () => {

    const fetchMoviesDataAsync = () =>
    {
        fetch(`${API_BASE_URL}/movies`,
            {
                method: "GET",
                credentials: "include"
            })
            .then((response) => response.json())
            .then(data  => console.log(data))
            .catch(error => console.log(error));
    }

    const fetchRefreshTokenAsync = (xsrf: string) =>
    {
        fetch(`${API_BASE_URL}/refresh`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrf
                },
                credentials: "include",
            })
            .then((response) => response.text())
            .then(data  => {
                console.log("Refresh token data:", data);
                fetchMoviesDataAsync();
            })
            .catch(error => {
                console.error("Error fetching refresh token data:", error);
            });
    }

    useEffect(() => {
        fetch(`${API_BASE_URL}/csrf`, {
            method: "GET",
            credentials: "include"
        })
            .then(response => response.text())
            .then((xsrf) => {
                console.log("CSRF token fetched");
                console.log(xsrf);
                fetchRefreshTokenAsync(xsrf);
        });
    }, []);

  return <LandingPage/>
}

export default App
