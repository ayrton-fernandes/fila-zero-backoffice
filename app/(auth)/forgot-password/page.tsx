"use client";

import { Button, Card } from "@uigovpe/components";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <div className="p-8 max-w-md w-full">
      <Card title="Esqueci a Senha">
        <p className="mb-4">Funcionalidade em desenvolvimento</p>
        <Button
          label="Voltar para Login"
          onClick={() => router.push("/login")}
        />
      </Card>
    </div>
  );
}
