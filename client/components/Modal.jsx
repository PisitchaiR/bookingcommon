import { Modal, Box, Alert, Stepper, Step, StepLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState, Fragment } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

const ModalInput = ({ open, handleClose, data, table }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const steps = ["จำนวนคน", "จำนวนชั่วโมง", "สรุป"];
  const [activeStep, setActiveStep] = useState(1);

  const onSubmit = async (data) => {
    try {
      const uid = JSON.parse(getCookie("user")).id;
      data.table = table;
      const res = await axios.post(`http://127.0.0.1:8000/reservation/${uid}`, data);
      router.push("/success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "90%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={"w-full mt-5 " + (activeStep != 1 && "hidden")}>
              <TextField
                color={errors.num ? "error" : "neutral"}
                className="w-full"
                {...register("num", { required: true })}
                size="smalls"
                label="จำนวนคน"
                type="number"
                variant="outlined"
              />
              <div className="w-full flex justify-end">
                <div className="cursor-pointer bg-green-500 px-5 py-2 text-white border-none rounded-md mt-10" onClick={handleNext}>
                  ถัดไป
                </div>
              </div>
            </div>

            <div className={"w-full mt-5 " + (activeStep != 2 && "hidden")}>
              <TextField
                color={errors.time ? "error" : "neutral"}
                className="w-full"
                {...register("time", { required: true })}
                size="smalls"
                label="จำนวนชั่วโมง"
                type="number"
                variant="outlined"
              />
              <div className="w-full flex justify-between">
                <div className="cursor-pointer bg-gray-500 px-5 py-2 text-white border-none rounded-md mt-10" onClick={handleBack}>
                  ย้อนกลับ
                </div>
                <div className="cursor-pointer bg-green-500 px-5 py-2 text-white border-none rounded-md mt-10" onClick={handleNext}>
                  ถัดไป
                </div>
              </div>
            </div>

            <div className={"w-full mt-5 " + (activeStep != 3 && "hidden")}>
              <div className="rounded-md shadow-lg px-5 py-2 mt-5">
                <p>ชื่อผู้จอง : {data?.name}</p>
                <p>รหัสนักศึกษา : {data?.studentId}</p>
              </div>
              <div className="rounded-md shadow-lg px-5 py-2 mt-5">
                <p>รายละเอียด</p>

                <p>โต๊ะ : {table}</p>
                <p>ระยะเวลาที่จอง : {watch("time")} ชั่วโมง</p>
                <p>จำนวนคน : {watch("num")} คน</p>
              </div>
              {errors.num && errors.time && (
                <Alert severity="error" className="mt-5" id="error">
                  กรอกข้อมูลไม่ครบถ้วน
                </Alert>
              )}
              <div className="w-full flex justify-between">
                <div className="bg-gray-500 px-5 py-2 text-white border-none rounded-md mt-10" onClick={handleBack}>
                  ย้อนกลับ
                </div>
                <input value="จอง" className="cursor-pointer bg-green-500 px-5 py-2 text-white border-none rounded-md mt-10" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalInput;
