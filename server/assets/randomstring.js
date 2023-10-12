export default function generateRandomString(length) {
  if (typeof length !== "number" || length < 1)
    throw new Error("Invalid input");

  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => possible[Math.floor(Math.random() * possible.length)]
  ).join("");
}