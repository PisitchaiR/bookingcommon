import axios from "axios";
import { Layout, Nav, ModalInput } from "../components";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
const Table = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState("");
  const [status, setStatus] = useState({
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    C1: false,
    C2: false,
    C3: false,
  });

  const handleClose = () => setOpen(false);

  const chooseTable = (name) => {
    setTable(name);
    setOpen(true);
  };

  const getTable = async () => {
    try {
      const data = await axios.get(`http://127.0.0.1:8000/reservation`);
      const date = new Date().toJSON().slice(0, 10);
      data.data.map((item) => {
        if (item.createdAt.includes(date)) {
          setStatus({ ...status, [item.table]: true });
          status[item.table] = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTable();
    setData(JSON.parse(getCookie("user")));
  }, []);

  const Table = ({ style, name, status }) => {
    return (
      <button
        onClick={() => {
          chooseTable(name);
        }}
        disabled={status[name]}
        className={" text-white text-center border-2 border-white shadow-xl rounded-md " + style + (status[name] ? " bg-red-400" : " bg-gray-400")}
      >
        {name}
      </button>
    );
  };
  return (
    <Layout title="จองสำเร็จ">
      <div className="h-screen flex flex-col items-center w-full">
        <Nav />
        <ModalInput open={open} handleClose={handleClose} data={data} table={table} />
        <div className="px-5 w-full flex flex-col items-center pb-10">
          <p className="text-black font-semibold text-xl my-8">เลือกโต๊ะที่ต้องการจอง</p>
          <div className="bg-[#d2d2d23c] w-full p-2 rounded-xl">
            <div className="bg-white w-full p-5 rounded-xl ">
              <div className="flex w-full justify-between">
                <div className="grid gap-y-3">
                  <Table name="B1" style="w-14 py-8" status={status} />
                  <Table name="B2" style="w-14 py-8" status={status} />
                  <Table name="B3" style="w-14 py-8" status={status} />
                  <Table name="B4" style="w-14 py-8" status={status} />
                </div>
                <div className="grid grid-cols-2 gap-y-14 gap-x-6">
                  <Table name="A1" style="w-20" status={status} />
                  <Table name="A2" style="w-20" status={status} />
                  <Table name="A3" style="w-20" status={status} />
                  <Table name="A4" style="w-20" status={status} />
                  <Table name="A5" style="w-20" status={status} />
                  <Table name="A6" style="w-20" status={status} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-2 mt-5">
                <Table name="C1" style="py-10" status={status} />
                <Table name="C2" style="py-10" status={status} />
                <Table name="C3" style="py-10" status={status} />
              </div>
            </div>
          </div>
          <Link href="/" className="mt-10 flex items-center text-white bg-black rounded-full px-5 py-2">
            <span className="material-icons">arrow_back_ios</span>
            ย้อนกลับ
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Table;
