export default function ToursSection({ tours }) {
    return (
        <section className="mt-12" id="tours">
            <h2 className="text-2xl font-bold text-center mb-8">تورهای ویژه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <div key={tour.title} className="bg-white rounded-custom shadow-md overflow-hidden flex flex-col">
                        <img className="w-full h-48 object-cover" src={tour.image} alt={tour.title} />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold">{tour.title}</h3>
                            <div className="flex items-center text-gray-500 my-2">
                                <span className="material-icons text-sm">event</span>
                                <span className="mr-1">{tour.duration}</span>
                            </div>
                            <p className="text-gray-600 flex-grow">{tour.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-xl font-bold primary-color">{tour.price}</p>
                                <a className="bg-primary text-white py-2 px-4 rounded-custom" href="#">
                                    مشاهده تور
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}