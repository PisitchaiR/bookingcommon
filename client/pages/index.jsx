import { useEffect, useState } from "react";
import { Layout, Nav } from "../component";
export default function Home() {
  const [name, setName] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user.name);
  }, []);
  return (
    <Layout title="หน้าแรก">
      <div className="h-screen flex flex-col items-center w-full">
        <Nav />
      </div>
    </Layout>
  );
}
