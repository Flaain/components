import React from "react";

interface Data {
    title: string;
    description: string;
}

interface Props {
    data: Array<Data>;
    autoclose?: Boolean;
}

const Accordion: React.FC<Props> = ({ data, autoclose = false }) => {
    const [selected, setSelected] = React.useState<Array<Number>>([]);

    const handleSelect = (index: number): void => {
        if (!autoclose) {
            setSelected((prevState) => [...(prevState.includes(index) ? prevState.filter((value) => value !== index) : [...prevState, index])])
            return;
        }

        setSelected((prevState) => (prevState.includes(index) ? [] : [index]));
    };

    return (
        <ul>
            {data.map(({ title, description }, index) => (
                <li key={index} onClick={() => handleSelect(index)}>
                    <div>
                        <h1>{title}</h1>
                        {selected.includes(index) && <p>{description}</p>}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Accordion;
