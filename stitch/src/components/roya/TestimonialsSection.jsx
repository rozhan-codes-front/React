export default function TestimonialsSection({ testimonials }) {
    return (
        <section className="mt-12 bg-gray-50 p-10 rounded-custom" id="testimonial">
            <h2 className="text-2xl font-bold text-center mb-8">نظر مشتریان ما</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="bg-white p-6 rounded-custom shadow-md text-center">
                        <img
                            className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white object-cover"
                            src={testimonial.image}
                            alt={testimonial.name}
                        />
                        <p className="text-gray-600 italic mt-4">{testimonial.quote}</p>
                        <p className="font-bold mt-4">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}