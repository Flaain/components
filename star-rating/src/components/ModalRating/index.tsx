import React from "react";
import classes from "./ModalRationg.module.css";
import { FaStar } from "react-icons/fa";
import { staticData } from "../../data";

const ModalRating = () => {
    const [indexRating, setIndex] = React.useState<number | null>(null);
    const [hoverRating, setHoverRating] = React.useState<number | null>(null);

    const handleClick = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setIndex((prevState) => (Number(value) === prevState ? null : Number(value)));
    };

    return (
        <div className={classes.container}>
            {hoverRating === null && indexRating === null && (
                <h1 className={classes.text}>Оцените фильм</h1>
            )}
            {(hoverRating !== null || indexRating !== null) && (
                <div className={classes.text}>
                    <h1 style={{ color: staticData[hoverRating ?? indexRating!].color }}>
                        {staticData[hoverRating ?? indexRating!].rating}
                    </h1>
                    <p>{staticData[hoverRating ?? indexRating!].title}</p>
                </div>
            )}
            <ul className={classes.stars}>
                {staticData.map(({ title }, index) => (
                    <li key={title}>
                        <label className={classes.button} onMouseEnter={() => setHoverRating(index)} onMouseLeave={() => setHoverRating(null)}>
                            <FaStar
                                size={45}
                                color={
                                    (hoverRating !== null || indexRating !== null) &&
                                    index <= (hoverRating ?? indexRating!)
                                        ? staticData[hoverRating ?? indexRating!].color
                                        : "#EEE"
                                }
                                style={
                                    (hoverRating !== null || indexRating !== null) &&
                                    index <= (hoverRating ?? indexRating!) && { transform: "scale(1.1)" }
                                }
                                className='icon'
                            />
                            <input
                                className={classes.input}
                                type='radio'
                                aria-label={title}
                                name="rating"
                                value={index}
                                checked={index === indexRating}
                                onChange={handleClick}
                            />
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModalRating;