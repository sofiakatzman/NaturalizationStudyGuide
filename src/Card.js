import { useState, useRef } from "react";

function Card({ data, markCorrect, markWrong}) {
  const [viewFront, setViewFront] = useState(true);


    const flipCardRef = useRef(null);

    const toggleView = () => {
        setViewFront((prev) => !prev);
    };

    return (
        <div className="flip-card-3D-wrapper">
            <div id="flip-card" ref={flipCardRef}>
                {viewFront ? (
                    // Question Card
                    <div className="flip-card-front"
                    onClick ={()=>toggleView()}>
                        <p>{data.question}</p>
                    </div>
                    
                ) : (
                    // Answer Card
                    <div className="flip-card-back"
                        onClick ={()=>toggleView()}>
                    
                        <ul>
                            {data.answer.map((answer, idx) => (
                                <li key={`${answer}-${idx}`}>{answer}</li>
                            ))}
                        </ul>
                        <div className="button-container">
                            <button className="correct"
                                onClick={() =>markCorrect()}
                            >
                                Mark Correct
                            </button>
                            <button className="wrong"
                                onClick={() => markWrong()}
                            >
                                Mark Wrong
                            </button>
                        </div>
                    </div>
                )}
            </div>           
            
        </div>
    );
}

export default Card;
