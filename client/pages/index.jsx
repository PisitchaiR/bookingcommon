import { useEffect, useState } from "react";
import { Layout, Nav } from "../components";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Home() {
  const [reserveList, setReserveList] = useState([]);
  const [myReserve, setMyReserve] = useState([]);
  const [num, setNum] = useState(0);

  const getReserve = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/reservation`);
      const date = new Date().toJSON().slice(0, 10);
      let count = 0;
      const filter = res.data.filter((item) => {
        if (item.createdAt.includes(date)) {
          setNum((count += item.num));
          return item;
        }
      });
      if (filter.length == 0) {
        setNum(0);
      }
      setReserveList(filter);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReserve = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/reservation/${id}`);
      setMyReserve(undefined);
      getReserve();
    } catch (error) {
      console.log(error);
    }
  };

  const getMyReserve = async () => {
    try {
      const uid = await JSON.parse(getCookie("user")).id;
      const res = await axios.get(`http://localhost:8000/reservation/${uid}`);
      setMyReserve(res.data.reserve[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyReserve();
    getReserve();
  }, []);

  return (
    <Layout title="หน้าแรก">
      <div className="h-screen flex flex-col items-center w-full">
        <Nav />
        <p className="text-center space-y-2 mt-10 text-shadow-lg w-2/3">
          <span>ขณะนี้มีผู้ใช้งาน</span>
          <span className="text-6xl font-bold text-green-500 mx-2">{num}</span>คน
        </p>

        <div className="mt-10 w-full px-5">
          <p className="font-bold">รายการจองโต๊ะของฉัน</p>
          {myReserve == undefined ? (
            <div className="flex items-center justify-between p-2 py-3 bg-[#F6F6F6] rounded-md mt-3">
              <p>ยังไม่มีการจองโต๊ะในขณะนี้</p>
              <Link href="/table" className="bg-black text-white px-3 py-1 rounded-full text-sm">
                กดจองที่นี่เลย
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#F6F6F6] mt-3">
              <div className="flex flex-col bg-blue-500 text-white px-2 w-1/5 py-3 rounded-l-md items-center">
                <p className="font-bold">โต๊ะ</p>
                <p className="font-bold text-3xl">{myReserve?.table}</p>
              </div>
              <div className="flex flex-col w-2/5 ml-2">
                <p className="text-sm">จำนวนชั่วโมง: {myReserve?.time} ชั่วโมง</p>
              </div>
              <button onClick={() => deleteReserve(myReserve?.id)} className="mx-5 bg-black text-white px-2 py-1 rounded-full text-sm">
                เสร็จสิ้น
              </button>
            </div>
          )}
        </div>
        <div className="mt-5 w-full px-5">
          <p className="font-bold">รายการจองโต๊ะทั้งหมด</p>
          <div className="flex flex-col items-center h-80 overflow-scroll w-full">
            {reserveList.map((reserve) => {
              return (
                <div key={reserve.id} className="flex items-center justify-between bg-[#F6F6F6] mt-3 w-full">
                  <div className="flex flex-col bg-blue-500 text-white px-2 w-1/5 py-3 rounded-l-md items-center">
                    <p className="font-bold">โต๊ะ</p>
                    <p className="font-bold text-3xl">{reserve.table}</p>
                  </div>
                  <div className="flex flex-col w-2/5 ml-2">
                    <p className="text-sm">จองโดย: {reserve.reserver.studentId}</p>
                    <p className="text-sm mt-2">จำนวนชั่วโมง: {reserve.time} ชั่วโมง</p>
                  </div>
                  <Link href="/table" className="mx-5 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
                    กำลังใช้งาน
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
