export default function PizzaFooter() {
    return (
        <footer className="bg-[#1b120e] text-[#fdf7f4] py-12 px-6 md:px-10" id="contact">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-bold mb-3">Napoli Pizza Elite</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Experience the authentic taste of Naples. <br />Learn from the best, once a year.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a className="hover:text-[#ce5316] transition-colors text-gray-300" href="#about">
                                    About the Class
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-[#ce5316] transition-colors text-gray-300" href="#details">
                                    What You'll Learn
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-[#ce5316] transition-colors text-gray-300" href="#testimonials">
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-[#ce5316] transition-colors text-gray-300" href="#faq">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a className="hover:text-[#ce5316] transition-colors text-gray-300" href="#">
                                    Book Your Spot
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Connect With Us</h3>
                        <div className="flex justify-center md:justify-start gap-4 mb-3">
                            <a className="text-gray-300 hover:text-[#ce5316] transition-colors" href="#" aria-label="Instagram">
                                <svg className="inline-block" fill="currentColor" height="28" width="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                                </svg>
                            </a>
                            <a className="text-gray-300 hover:text-[#ce5316] transition-colors" href="#" aria-label="Facebook">
                                <svg className="inline-block" fill="currentColor" height="28" width="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                                </svg>
                            </a>
                            <a className="text-gray-300 hover:text-[#ce5316] transition-colors" href="#" aria-label="Email">
                                <span className="material-icons text-3xl">email</span>
                            </a>
                        </div>
                        <p className="text-sm text-gray-400">info@napolipizzaelite.it</p>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 Napoli Pizza Elite. All rights reserved.{' '}
                        <a className="hover:text-[#ce5316] transition-colors" href="#">
                            Privacy Policy
                        </a>{' '}
                        |
                        <a className="hover:text-[#ce5316] transition-colors" href="#">
                            {' '}
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}