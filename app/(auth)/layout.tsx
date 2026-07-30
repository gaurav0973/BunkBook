

export async function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex w-full max-w-md flex-col items-center justify-between">
                {children}
            </div>
        </div>
    )
        
}
