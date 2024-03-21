import { useSearchParams } from "next/navigation";

async function getData(code: any) {
  // const params = useSearchParams();
  // const code = params.get("code");

  if (code) {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.text();
    console.log(data);
    const accessToken = new URLSearchParams(data).get("access_token");
    console.log("access_token:" + accessToken);
    return accessToken;
  }
}

export default async function Page(req: any) {
  const { searchParams } = req;
  const { code } = searchParams;
  const accessToken = await getData(code);
  console.log(accessToken);

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  //console.log(data);
  const { login, avatar_url } = data;
  const keys = Object.keys(data);
  console.log(keys);

  return (
    <div className="container">
      Ciaoooo <img alt="" src={avatar_url}></img> {login}
    </div>
  );
}
