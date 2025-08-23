import { NextResponse } from "next/server";

// Định nghĩa lại kiểu User cho an toàn
interface User {
  id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
}

// Khai báo biến toàn cục đúng kiểu
declare global {
  var users: User[] | undefined;
}

// Đảm bảo biến users tồn tại và gán lại vào globalThis
const users: User[] = globalThis.users || [];
globalThis.users = users;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Thiếu tài khoản hoặc mật khẩu" }, { status: 400 });
    }

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!foundUser) {
      return NextResponse.json(
        { error: "Sai tài khoản hoặc mật khẩu" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Đăng nhập thành công",
      user: {
        id: foundUser.id,
        username: foundUser.username,
        fullname: foundUser.fullname,
        email: foundUser.email,
        phone: foundUser.phone,
        token: "dummy-token", // Giả lập token
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
