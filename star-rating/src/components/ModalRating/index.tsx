import React from "react";
import classes from "./ModalRationg.module.css";
import { FaStar } from "react-icons/fa";
import { staticData } from "../../data";

const ModalRating = () => {
    const [indexRating, setIndex] = React.useState<number | null>(null);
    const [hoverRating, setHoverRating] = React.useState<number | null>(null);

    const handleClick = (clickedIndex: number) => {
        setIndex((prevState) => (clickedIndex === prevState ? null : clickedIndex));
    };

    return (
        <div className={classes.container}>
            {hoverRating === null && indexRating === null && (
                <h1 className={classes.text}>Оставьте свою оценку фильму</h1>
            )}
            {(hoverRating !== null || indexRating !== null) && (
                <div className={classes.text}>
                    <h1 style={{ color: staticData[hoverRating ?? indexRating].color }}>
                        {staticData[hoverRating ?? indexRating].rating}
                    </h1>
                    <p>{staticData[hoverRating ?? indexRating].title}</p>
                </div>
            )}
            <div className={classes.stars}>
                {staticData.map(({ title }, index) => (
                    <button
                        key={title}
                        className={classes.button}
                        onMouseEnter={() => setHoverRating(index)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => handleClick(index)}
                    >
                        <FaStar
                            color={
                                (hoverRating !== null || indexRating !== null) && index <= (hoverRating ?? indexRating)
                                    ? staticData[hoverRating ?? indexRating].color
                                    : "#EEE"
                            }
                            style={
                                (hoverRating !== null || indexRating !== null) &&
                                index <= (hoverRating ?? indexRating) && { transform: "scale(1.2)" }
                            }
                            className='icon'
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModalRating;