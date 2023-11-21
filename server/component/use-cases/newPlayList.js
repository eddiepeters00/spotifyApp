export default function createNewPlayList({}) {
  return Object.freeze({ newPlayList });

  async function newPlayList({ accessToken }) {
    try {
      console.log("Start");
      if (!accessToken) {
        throw new Error("Unvalid access-token!");
      } else {
        console.log("SUCCESSFULLY CREATED PLAYLIST");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
