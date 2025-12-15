export default function LearningSection({ items }) {
    return (
        <section className="py-16 px-6 md:px-10 bg-[#fffaf7]" id="details">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-[#1b120e] text-3xl font-bold leading-tight tracking-tight mb-12 text-center">
                    What You'll Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 rounded-xl border border-[#e7d7d0] bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-[#ce5316] flex items-center justify-center bg-[#fdf7f4] rounded-full size-16 mb-2">
                                <span className="material-icons text-4xl">{item.icon}</span>
                            </div>
                            <h3 className="text-[#1b120e] text-xl font-bold leading-tight">{item.title}</h3>
                            <p className="text-[#6b5b52] text-base font-normal leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}