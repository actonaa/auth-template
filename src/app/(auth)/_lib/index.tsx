/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";

export const authServices = {
  registerAccount: (data: any) => instance.post("/api/auth/register", data),
};

export default authServices;
