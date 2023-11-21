export default function createNewPlayList(data, filterOptions) {
  console.log("Creating new playlist");
  console.log(data);
  console.log(filterOptions);

  try {
    fetch("http://localhost:3000/api/create", {
      method: "POST",
      body: JSON.stringify(data, filterOptions),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
