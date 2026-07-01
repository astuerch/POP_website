import createMiddleware from "next-intl/middleware";

import {routing} from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  //   - /api/* route handlers
  //   - /_next/* Next.js internals
  //   - /_vercel/* Vercel internals
  //   - paths containing a dot (.*\\..*) which are static files (images, fonts, etc.)
  //   Legal routes like /legal/privacy-cookie-policy have no dots so ARE matched correctly.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
