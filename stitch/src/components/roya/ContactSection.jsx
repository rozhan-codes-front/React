export default function ContactSection({ mapSrc }) {
  return (
    <section className="mt-12 bg-white p-10 rounded-custom shadow-lg" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">با ما در تماس باشید</h2>
          <p className="text-gray-600 mb-6">
            سوال یا پیشنهادی دارید؟ فرم را پر کنید تا در اسرع وقت با شما تماس بگیریم.
          </p>
          <form className="space-y-4" action="#">
            <div>
              <label className="sr-only" htmlFor="name">
                نام
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="نام شما"
                className="w-full p-3 border border-gray-300 rounded-custom focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ایمیل شما"
                className="w-full p-3 border border-gray-300 rounded-custom focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="message">
                پیام شما
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="پیام شما..."
                className="w-full p-3 border border-gray-300 rounded-custom focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-custom flex items-center justify-center gap-2">
              <span>ارسال پیام</span>
              <span className="material-icons">send</span>
            </button>
          </form>
        </div>
        <div className="rounded-custom overflow-hidden h-96 md:h-full">
          <iframe
            className="rounded-custom"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Roya Travel Map"
          />
        </div>
      </div>
    </section>
  );
}