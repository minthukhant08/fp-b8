import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import authAPI from '@/api/auth'
import jwtDecode from 'jsonwebtoken'

export const authOptions: AuthOptions = {
    providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email' },
				password: { label: 'Password' },
			},
			async authorize(credentials) {
				try {
					const res = await authAPI.login({
						email: credentials?.email,
						password: credentials?.password,
					})

					const userData = res.data.data as UserResponse

					if (res.data.success === 1) {
						const decoded = jwtDecode.decode(
							userData.accessToken
						) as jwtDecode.JwtPayload
						const user = {
							id: decoded.id,
							name: decoded.name,
							email: decoded.email,
							accessToken: userData.accessToken,
							refreshToken: userData.refreshToken,
							expires_in: decoded.exp,
						}

						return user
					}
				} catch (error) {
					console.log('Authorization Error:', error)
				}
				return null
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user && user.expires_in) {
				const expiresIn = user.expires_in
				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
				token.accessTokenExpires = expiresIn
			}
			return { ...user, ...token }
		},
		async session({ session, token }) {
			if (token) {
				session.user = token
			}
			return session
		},
	},
    pages: {
		signIn: '/dashboard',
		signOut: '/',
		error: '/',
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }