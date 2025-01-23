import { useState, useEffect, useRef } from "react";

function Card({ data, markCorrect, markWrong }) {
    const [viewFront, setViewFront] = useState(true);
    const flipCardRef = useRef(null);

    useEffect(() => {
        // Ensure buttons are visible when the component mounts
        const btnToBack = document.getElementById('flip-card-btn-turn-to-back');
        const btnToFront = document.getElementById('flip-card-btn-turn-to-front');

        if (btnToBack && btnToFront) {
            btnToBack.style.visibility = 'visible';
            btnToFront.style.visibility = 'visible';

            // Add event listeners for button clicks
            btnToBack.onclick = () => toggleView();
            btnToFront.onclick = () => toggleView();
        }

        return () => {
            // Cleanup event listeners when component unmounts
            if (btnToBack) btnToBack.onclick = null;
            if (btnToFront) btnToFront.onclick = null;
        };
    }, []);

    const toggleView = () => {
        setViewFront((prev) => !prev);
        if (flipCardRef.current) {
            flipCardRef.current.classList.toggle('do-flip');
        }
    };

    return (
        <div className="flip-card-3D-wrapper">
            <div id="flip-card" ref={flipCardRef}>
                {viewFront ? (
                    // Question Card
                    <div className="flip-card-front">
                        <p>{data.question}</p>
                    </div>
                ) : (
                    // Answer Card
                    <div className="flip-card-back">
                        <ul>
                            {data.answer.map((answer, idx) => (
                                <li key={`${answer}-${idx}`}>{answer}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() =>markCorrect()}
                        >
                            Mark Correct
                        </button>
                        <button
                            onClick={() => markWrong()}
                        >
                            Mark Wrong
                        </button>
                    </div>
                )}
            </div>
            {/* Buttons for flipping the card */}
            <button id="flip-card-btn-turn-to-back">Flip to Back</button>
            <button id="flip-card-btn-turn-to-front">Flip to Front</button>
        </div>
    );
}

export default Card;
