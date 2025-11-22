export default function LoginOrRegister({ setIsLoggedIn }) {
    function handleLogin() {
        setIsLoggedIn(true);
    }

    return (
        <div>
            <h1>Login or Register</h1>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}