import { NextResponse } from "next/server";

// Định nghĩa kiểu User
interface User {
  id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
}

// Khai báo biến toàn cục đúng cách, để tránh lỗi "users sai"
declare global {
  var users: User[] | undefined;
}

const users: User[] = globalThis.users || [];
globalThis.users = users;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, confirmPassword, fullname, email, phone } = body;

    if (!username || !password || !fullname || !email || !phone) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Mật khẩu xác nhận không khớp" }, { status: 400 });
    }

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return NextResponse.json({ error: "Tài khoản đã tồn tại" }, { status: 409 });
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      fullname,
      email,
      phone,
    };

    users.push(newUser);

    return NextResponse.json({
      message: "Đăng ký thành công",
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
