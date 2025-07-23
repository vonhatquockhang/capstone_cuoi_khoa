import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const { taiKhoan, matKhau } = body;

  if (!taiKhoan || !matKhau) {
    return NextResponse.json({ message: "Thiếu thông tin." }, { status: 400 });
  }

  const user = users.find(
    (u) => u.taiKhoan === taiKhoan && u.matKhau === matKhau
  );

  if (!user) {
    return NextResponse.json({ message: "Sai tài khoản hoặc mật khẩu." }, { status: 401 });
  }

  return NextResponse.json({ message: "Đăng nhập thành công!", user });
}
