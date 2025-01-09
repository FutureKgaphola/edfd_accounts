import Register from "../components/Register";

const RegisterPage = () => {
    return (
        <div
            style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2016/11/19/15/43/tree-1839959_1280.jpg')",
            }}
            className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Register />
            </main>
        </div>

    );
}

export default RegisterPage;