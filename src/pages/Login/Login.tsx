import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from 'src/components/Input';
import { getRules } from 'src/utils/rules';

interface FormData {
    email: string;
    password: string;
}

function Login() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>();
    const rules = getRules(getValues);
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    return (
        <div className="bg-orange ">
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit}>
                            <div className="text-2xl">Đăng nhập</div>
                            <Input
                                type="email"
                                className="mt-8"
                                placeholder="Email"
                                register={register}
                                errorMessage={errors.email?.message}
                                rules={rules.email}
                                name="email"
                            />
                            <Input
                                type="password"
                                className="mt-3"
                                placeholder="Password"
                                register={register}
                                errorMessage={errors.password?.message}
                                rules={rules.password}
                                name="password"
                                autoComplete="true"
                            />
                            <div className="mt-3">
                                <button className="w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600">
                                    Đăng nhập
                                </button>
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
