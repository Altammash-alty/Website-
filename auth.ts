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

export const authOptions =
  {
    adapter: DrizzleAdapter(db, {
      usersTable,
      accountsTable,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens
    }),
    providers: [
      Google({
        clientId: AUTH_GOOGLE_ID,
        clientSecret: AUTH_GOOGLE_SECRET,
      })
    ],
    secret: AUTH_SECRET,

    // Store session in database
    session: {
      strategy: "database"
    },

  } satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
