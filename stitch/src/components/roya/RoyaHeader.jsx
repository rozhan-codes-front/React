export default function RoyaHeader({ logoSrc, navItems }) {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-reverse space-x-4">
                    <img className="h-10" src={logoSrc} alt="Royas Logo" />
                    <nav className="hidden md:flex items-center space-x-reverse space-x-6 text-gray-600" data-royas-nav>
                        {navItems.map((item) => (
                            <a key={item.label} className="hover:text-primary-color py-2" href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-reverse space-x-4">
                    <button className="flex items-center space-x-reverse space-x-2 text-gray-600">
                        <span>ورود / ثبت نام</span>
                        <span className="material-icons">person_outline</span>
                    </button>
                    <button className="md:hidden">
                        <span className="material-icons">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}