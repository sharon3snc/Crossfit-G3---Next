function App() {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')

    const handleLogin = async () => {
        try{
            const response = await fetch ('./login.json', {
                method: 'GET', //'POST',
                //body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error ('Login failed');
            }

            const data = await response.json();
            console.log(data);

            if(data.access) {
                //redirect to other page
            } else {
                //show error message
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className= 'conatiner'>
            <label>
                Username: 
                <input type="text" value={username} onChange= {(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <br />
            <label>
                Password: 
                <input type="text" value={password} onChange= {(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <br />
            <button type="button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );

}