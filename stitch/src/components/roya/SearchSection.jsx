export default function SearchSection() {
    return (
        <section className="bg-white p-6 rounded-custom shadow-lg -mt-16 relative z-10 mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="destination">
                        مقصد
                    </label>
                    <input
                        id="destination"
                        type="text"
                        placeholder="مثلا ایتالیا"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-custom shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="check-in">
                        تاریخ رفت
                    </label>
                    <input
                        id="check-in"
                        type="date"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-custom shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="check-out">
                        تاریخ برگشت
                    </label>
                    <input
                        id="check-out"
                        type="date"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-custom shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="travelers">
                        تعداد مسافران
                    </label>
                    <input
                        id="travelers"
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-custom shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-custom flex items-center justify-center gap-2 md:col-span-4 lg:col-span-1">
                    <span className="material-icons">search</span>
                    <span>جستجو</span>
                </button>
            </div>
        </section>
    );
}