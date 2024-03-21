export default function Home() {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  console.log("clientId:" + clientId);
  console.log("redirectUri:" + redirectUri);
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`}
      className="button"
    >
      Go to Google
    </a>
  );
}
