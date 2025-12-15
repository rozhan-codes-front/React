export default function PizzaHeader({ navLinks }) {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3ebe7] px-10 py-4 shadow-sm">
            <div className="flex items-center gap-3 text-[#1b120e]">
                <span className="material-icons text-3xl text-[#ce5316]">local_pizza</span>
                <h2 className="text-[#1b120e] text-2xl font-bold leading-tight tracking-tight">Napoli Pizza Elite</h2>
            </div>
            <div className="hidden lg:flex flex-1 justify-end gap-6">
                <nav className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            className="text-[#4e3f37] hover:text-[#ce5316] text-base font-medium leading-normal transition-colors"
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <button className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-6 bg-[#ce5316] text-[#fcf9f8] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#b84914] transition-colors shadow-md hover:shadow-lg">
                    <span className="truncate">Book Now</span>
                </button>
            </div>
        </header>
    );
}