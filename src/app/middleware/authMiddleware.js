import { NextResponse } from "next/server";

export function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/dashboard-admin") ||
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    let token = request.cookies.get("token");
    let user = request.cookies.get("user");
    let role = JSON.parse(user.value.role);
    if (token.value == null) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
    if (role !== "admin") {
      return NextResponse.rewrite(new URL("/dashboard-user", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard-user") ||
    request.nextUrl.pathname.startsWith("/articles")
  ) {
    let token = request.cookies.get("token");
    let user = request.cookies.get("user");
    let role = JSON.parse(user.value.role);
    if (token.value == null) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
    if (role !== "user") {
      return NextResponse.rewrite(new URL("/dashboard-admin", request.url));
    }
  }
}
