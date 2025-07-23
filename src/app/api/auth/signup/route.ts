import { NextResponse } from "next/server";
import { users, User } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const { taiKhoan, matKhau, xacNhanMatKhau, hoTen, email, soDt } = body;

  if (!taiKhoan || !matKhau || !xacNhanMatKhau || !hoTen || !email || !soDt) {
    return NextResponse.json(
      { message: "Thiếu thông tin đăng ký." },
      { status: 400 }
    );
  }

  if (matKhau !== xacNhanMatKhau) {
    return NextResponse.json(
      { message: "Mật khẩu và xác nhận không khớp." },
      { status: 400 }
    );
  }

  const existed = users.find((u) => u.taiKhoan === taiKhoan);
  if (existed) {
    return NextResponse.json(
      { message: "Tài khoản đã tồn tại." },
      { status: 409 }
    );
  }

  const newUser: User = {
    id: Date.now(),
    taiKhoan,
    matKhau, // cần để đối chiếu khi đăng nhập
    hoTen,
    email,
    soDt,
  };

  users.push(newUser); // lưu vào danh sách users tạm thời

  console.log("✅ Người dùng mới:", newUser);

  return NextResponse.json({ message: "Đăng ký thành công!", user: newUser });
}
