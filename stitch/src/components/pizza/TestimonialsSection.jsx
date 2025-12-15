import StarRating from './StarRating.jsx';

export default function TestimonialsSection({ testimonials }) {
    return (
        <section className="py-16 px-6 md:px-10 bg-[#fffaf7]" id="testimonials">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-[#1b120e] text-3xl font-bold leading-tight tracking-tight mb-12 text-center">
                    Voices of Our Pizzeria Pros
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg border border-[#f3ebe7]">
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-[#ce5316]"
                                />
                                <div className="flex-1">
                                    <p className="text-[#1b120e] text-lg font-semibold leading-normal">{testimonial.name}</p>
                                    <p className="text-[#97674e] text-sm font-normal leading-normal">{testimonial.subtitle}</p>
                                </div>
                            </div>
                            <StarRating value={testimonial.rating} />
                            <p className="text-[#4e3f37] text-base font-normal leading-relaxed">“{testimonial.quote}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}