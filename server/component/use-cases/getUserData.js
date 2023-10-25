export default function createGetUserData({ axios }) {
  return Object.freeze({ getUserData });

  async function getUserData({ accessToken }) {
    try {
      console.log("[USE-CASES][GETUSERDATA] - START");
      if (!accessToken) {
        throw new Error("Unvalid access-token!");
      } else {
        const userInfo = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("[USE-CASES][GETUSERDATA] - END");
        return userInfo.data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
