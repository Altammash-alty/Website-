import NextAuth, { NextAuthConfig } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import {
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  AUTH_SECRET
} from "./config/env"
import {
  accountsTable,
  sessions,
  usersTable,
  verificationTokens
} from "./lib/db/schema"
import { db } from "./lib/db/db"

const isDatabaseAvailable = !!process.env.DATABASE_URL;

export const authOptions =
  {
    adapter: isDatabaseAvailable ? DrizzleAdapter(db, {
      usersTable,
      accountsTable,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens
    }) : undefined,
    providers: [
      Google({
        clientId: AUTH_GOOGLE_ID,
        clientSecret: AUTH_GOOGLE_SECRET,
      })
    ],
    secret: AUTH_SECRET,

    session: {
      strategy: isDatabaseAvailable ? "database" : "jwt"
    },

  } satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
