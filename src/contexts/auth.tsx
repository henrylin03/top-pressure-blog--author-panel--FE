import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/user";

export type AuthState = {
	user: User | null;
	login: (usernameOrEmail: string, password: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const JWT_LOCALSTORAGE_KEY = "jwt";

const validateJwt = async (token: string): Promise<User | undefined> => {
	const removeJwt = () => localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
	try {
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/api/v1/validate-jwt`,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		if (!res.ok) {
			removeJwt();
			return;
		}

		const { user } = await res.json();
		if (!user) {
			removeJwt();
			return;
		}
		return user;
	} catch (error) {
		console.error("Unable to verify JWT token:", error);
		return;
	}
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const checkJwt = async () => {
			const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
			if (!token) return setUser(null);

			const user = await validateJwt(token);
			if (user) setUser(user);
			else setUser(null);
		};

		checkJwt();
	}, []);

	const login = async (usernameOrEmail: string, password: string) => {
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ usernameOrEmail, password }),
		});

		if (res.status === 401) throw new Error("Invalid username or password");
		if (!res.ok) throw new Error("Authentication failed");
		const { token } = await res.json();
		localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);

		const user = await validateJwt(token);
		if (user) setUser(user);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (typeof context === "undefined")
		throw new Error("useAuth must be used with an AuthProvider");
	return context;
};

export { AuthProvider, useAuth };
