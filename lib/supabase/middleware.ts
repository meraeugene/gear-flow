import { getAuthUser } from "@/actions/authActions";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { user: userWithCompleteInfo } = await getAuthUser();

  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl.clone();

  // Define path groups
  const protectedPages = [
    "/complete-profile",
    "/account/dashboard",
    "/account/rental-requests",
    "/account/rentals",
    "/account/settings",
    "/account/settings/edit-profile",
    "/account/settings/reset-email",
    "/account/settings/reset-password",
    "/account/transactions",
    "/account/units",
    "/account/units/add-unit",
    "/account/reset-password",
  ];
  const authPages = ["/auth/login", "/auth/register"];
  const adminPages = ["/admin/manage-users"];

  // Redirect users who are logged in but haven't completed their profile (no address)
  // This applies both when they visit "/" or any protected page (except /account/complete-profile)
  if (
    user &&
    !userWithCompleteInfo.address &&
    !error &&
    (pathname === "/" ||
      (protectedPages.includes(pathname) && pathname !== "/complete-profile"))
  ) {
    url.pathname = "/complete-profile";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!user && error && protectedPages.includes(pathname)) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (user && !error && authPages.includes(pathname)) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check if user is admin and restrict access to admin pages
  if (user && !error) {
    // If the user is not an admin and tries to access admin-only pages
    if (
      userWithCompleteInfo.role !== "admin" &&
      adminPages.includes(pathname)
    ) {
      url.pathname = "/account/dashboard";
      return NextResponse.redirect(url);
    }

    // If the user is an admin and tries to access /account/my-units
    if (
      userWithCompleteInfo.role === "admin" &&
      pathname === "/account/my-units"
    ) {
      url.pathname = "/account/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
