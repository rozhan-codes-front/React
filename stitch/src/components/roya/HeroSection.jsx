export default function HeroSection({ backgroundImage }) {
    return (
        <section className="relative h-[60vh] rounded-custom overflow-hidden flex items-center justify-center text-white">
            <img className="absolute inset-0 w-full h-full object-cover -z-11" src={backgroundImage} alt="Beautiful landscape" />
            <div className="absolute inset-0 bg-black bg-opacity-40 -z-1" />
            <div className="text-center space-y-4 z-10">
                <h1 className="text-4xl md:text-6xl font-bold">سفر رویایی خود را پیدا کنید</h1>
                <p className="text-lg md:text-xl">بهترین مقاصد را با قیمت های بی نظیر کاوش کنید</p>
            </div>
        </section>
    );
}