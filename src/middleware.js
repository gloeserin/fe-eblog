import { NextResponse } from "next/server";

export function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/dashboard-admin") ||
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    let token = request.cookies.get("token");
    let user = request.cookies.get("user");
    if (token == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    let role = JSON.parse(user.value).role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard-user", request.url));
    }
  }
  if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/register") {
    let token = request.cookies.get("token");
    if (token != null) {
      return NextResponse.redirect(new URL("/dashboard-user", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard-user") ||
    request.nextUrl.pathname.startsWith("/articles")
  ) {
    let token = request.cookies.get("token");
    let user = request.cookies.get("user");
    if (token == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    let role = JSON.parse(user.value).role;

    if (role !== "user") {
      return NextResponse.redirect(new URL("/dashboard-admin", request.url));
    }
  }
}
