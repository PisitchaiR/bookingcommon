import { Layout } from "../component";
import { TextField, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const Error = ({ name }) => {
    return errors[name] && <span className="text-red-600 text-xs">{errors[name]?.message}</span>;
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/login`, data);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/");
    } catch (error) {
      console.log(error.response?.data?.message || error);
    }
  };
  return (
    <Layout title="register">
      <div className="h-screen w-full flex flex-col items-center justify-between border border-black py-10 px-10">
        <header>
          <h1 className="text-5xl">
            Common <span className="block ml-16">Booking</span>
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <section className="flex flex-col gap-3 w-full">
            <div className="w-full flex flex-col gap-y-2">
              <TextField
                color={errors.email ? "error" : "neutral"}
                label="Email"
                variant="outlined"
                {...register("email", { required: "จำเป็นต้องระบุรหัสผ่าน" })}
              />
              <Error name="email" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <TextField
                color={errors.password ? "error" : "neutral"}
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: "จำเป็นต้องระบุรหัสผ่าน" })}
              />
              <Error name="password" />
            </div>
          </section>
          <button className=" bg-green-500 px-10 mx-auto py-3 border-none rounded-full text-white mt-10">เข้าสู่ระบบ</button>
        </form>
        <footer>
          <Link href="/register" className="text-gray-500">
            Not have an account?
          </Link>
        </footer>
      </div>
    </Layout>
  );
};

export default Login;
