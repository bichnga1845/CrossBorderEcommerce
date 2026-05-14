import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Vui lòng nhập tên đăng nhập/email và mật khẩu");
        }

        await dbConnect();

        const identifier = credentials.identifier;

        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

        if (!user || !user.password) {
          throw new Error("Tài khoản không tồn tại hoặc đăng nhập qua Google");
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Mật khẩu không chính xác");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          phone: user.phone,
          address: user.address,
          city: user.city,
          district: user.district,
          ward: user.ward,
          membershipTier: user.membershipTier || 'silver',
          rewardPoints: user.rewardPoints || 0,
          purchaseStreaks: user.purchaseStreaks || 0
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              authProvider: "google",
              membershipTier: 'silver',
              rewardPoints: 0
            });
            await newUser.save();
            user.id = newUser._id.toString();
          } else {
            user.id = existingUser._id.toString();
            (user as any).role = existingUser.role;
            (user as any).phone = existingUser.phone;
            (user as any).address = existingUser.address;
            (user as any).city = existingUser.city;
            (user as any).district = existingUser.district;
            (user as any).ward = existingUser.ward;
            (user as any).membershipTier = existingUser.membershipTier || 'silver';
            (user as any).rewardPoints = existingUser.rewardPoints || 0;
            (user as any).purchaseStreaks = existingUser.purchaseStreaks || 0;
            // If the existing user was created by credentials, record that they also used Google
            if (existingUser.authProvider !== 'google') {
              existingUser.authProvider = 'google';
              await existingUser.save();
            }
          }
          return true;
        } catch (error) {
          console.error("Error saving Google user", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'customer';
        token.phone = (user as any).phone;
        token.address = (user as any).address;
        token.city = (user as any).city;
        token.district = (user as any).district;
        token.ward = (user as any).ward;
        token.cart = (user as any).cart;
        token.membershipTier = (user as any).membershipTier || 'silver';
        token.rewardPoints = (user as any).rewardPoints || 0;
        token.purchaseStreaks = (user as any).purchaseStreaks || 0;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).phone = token.phone as string;
        (session.user as any).address = token.address as string;
        (session.user as any).city = token.city as string;
        (session.user as any).district = token.district as string;
        (session.user as any).ward = token.ward as string;
        (session.user as any).cart = token.cart as any[];
        (session.user as any).membershipTier = token.membershipTier as string;
        (session.user as any).rewardPoints = token.rewardPoints as number;
        (session.user as any).purchaseStreaks = token.purchaseStreaks as number;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "hian-luxury-secret-key-12345"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
