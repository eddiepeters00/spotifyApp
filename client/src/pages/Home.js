import PlayListBox from "../components/PlayListBox";
import { useState, useEffect } from "react";

function Home() {
  const [user, setUser] = useState(null);
  const [playLists, setPlayLists] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          credentials: "include",
        });
        const userData = await response.json();
        setUser(userData.data);

        // Now that user data is available, fetch playlists
        fetchPlayLists();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPlayLists = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/playlists",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setPlayLists(data.playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log(user);
  console.log(playLists);

  return (
    <>
      {user === null ? (
        <p>Loading user...</p>
      ) : (
        <section className="user-container">
          <p>Welcome {user.display_name}</p>
        </section>
      )}
      {playLists !== null ? (
        <section className="playlist-container">
          <h3>Playlists</h3>
          <div>
            {playLists.map((playlist, i) => (
              <PlayListBox
                key={i}
                name={playlist.name}
                images={playlist.images}
                id={playlist.id}
              />
            ))}
          </div>
        </section>
      ) : (
        <p>Loading playlists...</p>
      )}
    </>
  );
}

export default Home;
