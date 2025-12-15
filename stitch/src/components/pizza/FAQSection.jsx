export default function FAQSection({ faqs }) {
    return (
        <section className="py-16 px-6 md:px-10 bg-[#fdf7f4]" id="faq">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-[#1b120e] text-3xl font-bold leading-tight tracking-tight mb-12 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="bg-white p-6 rounded-xl shadow-lg border border-[#f3ebe7] group">
                            <details className="cursor-pointer">
                                <summary className="flex items-center justify-between text-[#1b120e] text-xl font-semibold group-hover:text-[#ce5316] transition-colors">
                                    <span>{faq.question}</span>
                                    <span className="material-icons transform transition-transform duration-300 group-open:rotate-180 text-[#ce5316]">
                    expand_more
                  </span>
                                </summary>
                                <p className="text-[#6b5b52] text-base font-normal leading-relaxed mt-4">{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}