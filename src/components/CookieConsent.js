import { useState, useEffect } from "react";

const CookieConsent = () => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isClosed, setIsClosed] = useState(true); 

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "accepted") {
            setIsAccepted(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsAccepted(true);
    };

    const handleClose = () => {
        setIsClosed(true); 
    };

    if (isAccepted || isClosed) return null; 

    return (
        <div className="cookie-box">
            <p>We use cookies to improve your experience. By continuing, you accept our cookie policy.</p>
            <button onClick={handleAccept} className="accept-btn" title="Accept Cookie Consent">Accept</button>
            <button onClick={handleClose} className="close-btn" title="Collapse Cookie Consent">✖</button>
        </div>
    );
};

export default CookieConsent;
