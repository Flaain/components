import Accordion from "./components/Accordion/Accordion";

const App = () => (
    <Accordion
        data={[
            { title: "Title 1", description: "Description 1" },
            { title: "Title 2", description: "Description 2" },
            { title: "Title 3", description: "Description 3" },
            { title: "Title 4", description: "Description 4" },
            { title: "Title 5", description: "Description 5" },
        ]}
        autoclose={true}
    />
);

export default App;