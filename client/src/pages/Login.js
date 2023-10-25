const Login = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:3000/api/auth";
  };

  return (
    <>
      <h1>Welcome</h1>
      <p>Press button to sign in to spotify</p>
      <button onClick={handleSpotifyLogin}>Login with Spotify</button>
    </>
  );
};

export default Login;
