


const MainLayout = ({children}) => {
    return (
        <section className="flex flex-col justify-between h-screen">
            <header className="bg-green-700 flex p-2 items-center gap-5">
                <section className="p-1 bg-white rounded-xl">
                    <img src="/PMS-V2.png" alt="PMS - logo" width={50}/>
                </section>
                <h1 className="text-3xl font-extrabold text-white">Property Management System</h1>
            </header>
            <main className="flex flex-col justify-center items-center">
                {children}
            </main>
            <footer className="bg-green-700 flex p-2 items-center gap-5 justify-around">
                <p className="text-2xl font-extrabold text-white">&copy; Kamil Kijak 2026</p>
                <p className="text-xl font-extrabold text-white">Contact: kamil.kijak@pixlesofte.com</p>
            </footer>
        </section>  
    )
}

export default MainLayout;