export default function HeroSection({ backgroundImage }) {
    return (
        <section className="relative" id="hero">
            <div className="absolute inset-0 bg-black/50 z-0" />
            <div
                className="min-h-[560px] bg-cover bg-center bg-no-repeat flex items-center justify-center p-8"
                style={{ backgroundImage: `url("${backgroundImage}")` }}
            >
                <div className="relative z-10 flex flex-col gap-6 text-center max-w-3xl">
                    <h1 className="text-white text-5xl font-black leading-tight tracking-tighter md:text-6xl">
                        Master the Art of Neapolitan Pizza
                    </h1>
                    <p className="text-gray-200 text-lg font-normal leading-relaxed md:text-xl">
                        Join our exclusive, once-a-year cooking class in Naples and learn the secrets of authentic homemade pizza from a renowned chef.
                    </p>
                    <button className="self-center flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-[#ce5316] text-[#fcf9f8] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#b84914] transition-colors shadow-lg hover:shadow-xl">
                        <span className="truncate">Book Your Spot</span>
                    </button>
                </div>
            </div>
        </section>
    );
}