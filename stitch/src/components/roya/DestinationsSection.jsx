export default function DestinationsSection({ destinations }) {
    return (
        <section className="mt-12" id="dest">
            <h2 className="text-2xl font-bold text-center mb-8">مقاصد محبوب</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((destination) => (
                    <div key={destination.name} className="relative rounded-custom overflow-hidden group shadow-lg" data-royas-group>
                        <img
                            className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            src={destination.image}
                            alt={destination.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:from-black/80" />
                        <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-1/3 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                            <h3 className="text-2xl font-bold">{destination.name}</h3>
                            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{destination.country}</p>
                            <a
                                className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-custom opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300"
                                href="#"
                            >
                                مشاهده تورها
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}