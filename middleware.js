// import { NextResponse } from "next/server";
// import { useEffect, useState } from "react";

// const [data, setData] = useState();
// useEffect(() => {
//   // Perform localStorage action
//   setData(localStorage.getItem("key"));
// }, []);
// export async function middleware(req, res) {

//   if (req.nextUrl.pathname === "/") {
//     try {
//       if (!data) {
//         throw "Unauthorized";
//       }

//       return res.json();
//     } catch (err) {
//       console.log(err);
//       return NextResponse.rewrite(new URL("/login", req.url));
//     }
//   }

//   if (req.nextUrl.pathname === "/login") {
//     if (data) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return data.json();
//   }
// }

// export const config = {
//   matcher: ["/", "/login"],
// };
