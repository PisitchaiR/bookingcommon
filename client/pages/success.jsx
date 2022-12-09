import { Layout, Nav } from "../components";
import Link from "next/link";

const Success = () => {
  return (
    <Layout title="จองสำเร็จ">
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="./success.svg" alt="" />
          <p className="text-2xl font-semibold mt-5">ทำรายการสำเร็จ</p>
          <p>ดำเนินการจองโต๊ะเรียบร้อยแล้ว</p>
        </div>
        <Link href="/" className=" bg-green-500 text-white w-2/4 py-2 rounded-md duration-300 hover:bg-green-300 text-center mt-20">
          เสร็จสิ้น
        </Link>
      </div>
    </Layout>
  );
};
export default Success;
