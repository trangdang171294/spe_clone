import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'src/components/Input';
import { schema, Schema } from 'src/utils/rules';
import { useMutation } from 'react-query';
import { registerAccount } from 'src/apis/auth.api';
import { omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';
import { ResponseApi } from 'src/types/utils.type';

type FormData = Schema;

function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body),
    });
    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password']);
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirm_password'>, {
                                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                                type: 'Server',
                            });
                        });
                    }
                }
            },
        });
    });
    return (
        <div className="bg-orange">
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit} noValidate>
                            <div className="text-2xl">Đăng ký</div>
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
                                errorMessage={errors.password?.message}
                                name="password"
                                autoComplete="true"
                            />
                            <Input
                                type="password"
                                className="mt-3"
                                placeholder="Confirm Password"
                                register={register}
                                errorMessage={errors.confirm_password?.message}
                                name="confirm_password"
                                autoComplete="true"
                            />
                            <div className="mt-3">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600"
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                                <Link className="ml-1 text-red-400" to="/login">
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
