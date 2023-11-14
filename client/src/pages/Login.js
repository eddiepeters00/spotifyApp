const Login = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:3000/api/auth";
  };

  return (
    <main>
      <section className="hero">
        <h1>PlaylistRefine</h1>
        <h2>Filtering your spotify playlists has never been easier.</h2>
        <button className="sign-in-button" onClick={handleSpotifyLogin}>
          Sign in
        </button>
      </section>
    </main>
  );
};

export default Login;
