'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Card, FlexContainer, InputPassword, InputText, TextLink, Typography } from "@uigovpe/components";
import { useForm, Controller } from 'react-hook-form';
import { authService } from "@/services/authService";
import { apiRequestAdapter } from "@/services/api/adapters/apiAdapter";
import styles from "./index.module.scss";
import { footerLogo, logoPrograma } from "@/config/constants/layout/layout.config";
import { getImagePath } from "@/utils/getImagePath";

type LoginFormData = {
  email: string;
  senha: string;
};

const validateEmail = (email: string): string | undefined => {
  if (!email) return "E-mail é obrigatório";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "E-mail inválido";
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password) return "Senha é obrigatória";
  if (password.length < 6) return "Senha deve ter pelo menos 6 caracteres";
  return undefined;
};

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      senha: ''
    }
  });

  const validateForm = (data: LoginFormData): boolean => {
    let isValid = true;
    
    clearErrors();
    
    const emailError = validateEmail(data.email);
    if (emailError) {
      setError('email', { type: 'manual', message: emailError });
      isValid = false;
    }
    
    const passwordError = validatePassword(data.senha);
    if (passwordError) {
      setError('senha', { type: 'manual', message: passwordError });
      isValid = false;
    }
    
    return isValid;
  };

  const onSubmit = async (data: LoginFormData) => {
    if (!validateForm(data)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      await apiRequestAdapter(
        () => authService.login({
          email: data.email,
          password: data.senha
        }),
        "Erro ao fazer login",
        { setAuthCookie: true } 
      );

      setIsLoading(false);
      router.push('/home');

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert('Não foi possível fazer o login. Verifique as credenciais e tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.loginContainer}>
        <div className="p-8 md:p-12">
          <FlexContainer
            direction="row"
            gap="12"
            justify="center"
            align="center"
            className="mb-12 max-w-96"
          >
            <div>
              <Image
                src={getImagePath(logoPrograma.src)}
                width={200}
                height={100}
                alt={logoPrograma.alt}
                className="responsive-img rounded"
              />
            </div>
            <div>
              <Image
                src={getImagePath(footerLogo.src)}
                width={200}
                height={100}
                alt={footerLogo.alt}
                className="responsive-img rounded"
              />
            </div>
          </FlexContainer>

          <Card title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FlexContainer
                direction="col"
                gap="4"
                justify="center"
                align="start"
              >
                <div className="w-full">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputText
                        {...field}
                        label="E-mail"
                        placeholder="Ex: exemplo@gmail.com"
                        invalid={!!errors.email}
                        supportText={errors.email?.message}
                      />
                    )}
                  />
                </div>

                <div className="w-full">
                  <Controller
                    name="senha"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputPassword
                        {...field}
                        label="Senha"
                        placeholder="Digite sua senha"
                        invalid={!!errors.senha}
                        supportText={errors.senha?.message}
                        keyfilter={/^\S+$/}
                      />
                    )}
                  />
                </div>

                <Typography
                  variant="div"
                  size="small"
                  className="w-full flex-1"
                >
                  <TextLink onClick={() => router.push('/forgot-password')}>
                    Esqueci a minha senha
                  </TextLink>
                </Typography>

                <Button
                  type="submit"
                  label="Entrar"
                  className="w-full"
                  loading={isLoading}
                />

                <Typography
                  variant="div"
                  textAlign="center"
                  className="w-full flex-1"
                >
                  {'Não tem uma conta? '}
                  <TextLink onClick={() => router.push('/register')}>
                    Cadastre-se
                  </TextLink>
                </Typography>

              </FlexContainer>

            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

