import { useRouter } from "next/navigation";

export function useAuth() {
    const router = useRouter();

    // Usuário mockado por enquanto
    const user = {
        name: "Administrador",
        profile: "Admin",
    };

    const login = async (email: string, _password: string) => {
        console.log("Login mocked", email);
        router.push("/dashboard");
    };

    const logout = async () => {
        console.log("Logout mocked");
        router.push("/login");
    };

    return {
        user,
        login,
        logout,
    };
}
