const input = document.querySelector("input");
const defaultValue = document.querySelector(".span_type_default");
const debounceValue = document.querySelector(".span_type_debounce");

function debounce(fn, ms) {
    return function perform(...args) {
        let previous = this.last;

        this.last = Date.now();

        if (previous && this.last - previous <= ms) {
            clearTimeout(this.call);
        }

        this.call = setTimeout(() => fn(...args), ms);
    };
}

const handleInput = debounce((value) => {
    debounceValue.textContent = `Debounce Value: ${value}`;
}, 1000);

input.addEventListener("input", ({ target: { value } }) => {
    defaultValue.textContent = `Default Value: ${value}`;
    handleInput(value);
});