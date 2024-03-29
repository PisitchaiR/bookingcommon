import { Layout } from "../components";
import { TextField, Box, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const Register = () => {
  const router = useRouter();
  const [alert, setAlert] = useState("");

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
      if (data.password != data.confirmPassword) throw { message: "password is not match" };
      delete data.confirmPassword;
      const res = await axios.post(`http://127.0.0.1:8000/register`, data);
      setCookie("user", JSON.stringify(res.data));
      router.push("/");
    } catch (error) {
      setAlert(error.response?.data?.message || error.message);
    }
  };
  return (
    <Layout title="ลงทะเบียน">
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
                color={errors.name ? "error" : "neutral"}
                label="Full Name"
                variant="outlined"
                {...register("name", { required: "จำเป็นต้องระบุอีเมล" })}
              />
              <Error name="name" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <TextField
                color={errors.studentId ? "error" : "neutral"}
                label="Student ID"
                variant="outlined"
                {...register("studentId", { required: "จำเป็นต้องระบุรหัสผ่าน" })}
              />
              <Error name="studentId" />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <TextField
                color={errors.email ? "error" : "neutral"}
                type="email"
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
            <div className="w-full flex flex-col gap-y-2">
              <TextField
                color={errors.confirmPassword ? "error" : "neutral"}
                label="Confirm Password"
                type="password"
                variant="outlined"
                {...register("confirmPassword", { required: "จำเป็นต้องระบุรหัสผ่าน" })}
              />
              <Error name="confirmPassword" />
            </div>
            {alert && (
              <Alert severity="error" className="mb-4" id="error">
                {alert}
              </Alert>
            )}
          </section>
          <button className=" bg-green-500 px-10 mx-auto py-3 border-none rounded-full text-white mt-10">สมัครสมาชิก</button>
        </form>
        <footer>
          <p className="text-gray-500">
            Have an account yet.
            <Link href="/login" className="ml-1 text-black">
              Go back
            </Link>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Register;
