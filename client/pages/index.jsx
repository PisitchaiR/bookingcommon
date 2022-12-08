import { useEffect, useState } from "react";
import { Layout, Nav } from "../component";


export default function Home() {
  
  return (
    <Layout title="หน้าแรก">
      <div className="h-screen flex flex-col items-center w-full">
        <Nav />
      </div>
    </Layout>
  );
}
