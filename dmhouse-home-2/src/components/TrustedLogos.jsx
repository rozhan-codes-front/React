import React from 'react';

export default function TrustedLogos() {
    return (
        <section className="trustedLogos">
            <h2 className="trustedLogos__title">برندهایی که به ما اعتماد کرده‌اند</h2>
            <div className="logoStage">
                <div className="logoStage__center">
                    <img src="https://dmhouse.agency/wp-content/uploads/2024/08/team1-min-min.png" alt="DMHouse" />
                </div>

                {/* Marquee LTR */}
                <div className="logoMarquee logoMarquee--ltr" dir="ltr">
                    <div className="logoMarquee__track">
                        <div className="logoItem"><img src="https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg" alt="" /></div>
                        {/* Duplicates for loop */}
                        <div className="logoItem"><img src="https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg" alt="" /></div>
                    </div>
                </div>

                {/* Marquee RTL */}
                <div className="logoMarquee logoMarquee--rtl">
                    <div className="logoMarquee__track">
                        <div className="logoItem"><img src="https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg" alt="" /></div>
                        {/* Duplicates */}
                        <div className="logoItem"><img src="https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png" alt="" /></div>
                        <div className="logoItem"><img src="https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg" alt="" /></div>
                    </div>
                </div>
            </div>
        </section>
    );
}