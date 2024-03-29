import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import authApi from 'src/apis/auth.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { AppContext } from 'src/contexts/app.context';
import { ErrorResponse } from 'src/types/utils.type';
import { schema, Schema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';

type FormData = Pick<Schema, 'email' | 'password'>;

const loginSchema = schema.pick(['email', 'password']);

function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    });

    const loginAccountMutation = useMutation({
        mutationFn: (body: FormData) => authApi.login(body),
    });
    const onSubmit = handleSubmit((data) => {
        loginAccountMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true);
                setProfile(data.data.data.user);
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
                                type: 'Server',
                            });
                        });
                    }
                }
            },
        });
    });
    return (
        <div className="bg-orange ">
            <Helmet>
                <title>Đăng nhập</title>
                <meta name="description" content="Trang đăng nhập" />
            </Helmet>
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
                            <div className="text-2xl">Đăng nhập</div>
                            <Input
                                type="email"
                                className="mt-8"
                                placeholder="Email"
                                register={register}
                                errorMessage={errors.email?.message}
                                name="email"
                            />
                            <Input
                                type="password"
                                className="mt-3"
                                placeholder="Password"
                                register={register}
                                name="password"
                                errorMessage={errors.password?.message}
                                autoComplete="true"
                            />
                            <div className="mt-3">
                                <Button
                                    type="submit"
                                    className="flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                                    isLoading={loginAccountMutation.isLoading}
                                    disabled={loginAccountMutation.isLoading}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                                <Link className="ml-1 text-red-400" to="/register">
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
