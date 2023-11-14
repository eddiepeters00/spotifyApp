import useFetch from "../hooks/useFetch";

const DisplayUser = () => {
  const {
    data: user,
    isPending,
    error,
  } = useFetch("http://localhost:3000/api/user");

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className="user-container">
      <p>
        <b>Signed in as: </b>
        {user.data.display_name}
      </p>
      <a href="/">Sign out</a>
    </section>
  );
};

export default DisplayUser;
