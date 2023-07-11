class Slider {
    constructor(container = ".slider__container", options = { loop: true, slidesToShow: 3, slidesToScroll: 1, gap: 20 }) {
        this.container = document.querySelector(container);
        this.track = this.container?.querySelector(".slider__list");
        this.items = this.track?.querySelectorAll(".slider__item");
        this.buttons = this.container?.querySelectorAll(".slider__button");
        this.prevBtn = this.container.querySelector(".slider__button_type_prev");
        this.nextBtn = this.container.querySelector(".slider__button_type_next");

        this.loop = options.loop;
        this.slidesToShow = options.slidesToShow;
        this.slidesToScroll = options.slidesToScroll;
        this.gap = options.gap;

        this.itemWidth = this.container?.getBoundingClientRect().width / this.slidesToShow;
        this.moveTo = this.slidesToScroll * this.itemWidth;
        this.itemsLeft = null;

        this.position = 0;

        this.setWidth(this.itemWidth, this.items);
        this.setListeners();
        this.setDisabled();
    }

    setWidth(width, items = []) {
        items.forEach((item) => {
            item.style.minWidth = `${width - this.gap}px`;
        });
    }

    setListeners() {
        this.buttons.forEach((button) =>
            button.addEventListener(
                "click",
                ({
                    target: {
                        dataset: { button },
                    },
                }) => (button === "prev" ? this.handlePrev() : this.handleNext())
            )
        );
    }

    handlePrev() {
        if (this.position === 0 && this.loop) {
            this.position = -(this.items.length - this.slidesToShow) * this.itemWidth;
            this.track.style.transform = `translateX(${this.position}px)`;
            return;
        }

        this.itemsLeft = Math.abs(this.position) / this.itemWidth;
        this.position += this.itemsLeft >= this.slidesToScroll ? this.moveTo : this.itemsLeft * this.itemWidth;
        this.track.style.transform = `translateX(${this.position}px)`;

        this.setDisabled();
    }

    handleNext() {
        this.isLastSlide = Math.abs(this.position) >= (this.items.length - this.slidesToShow) * this.itemWidth;

        if (this.isLastSlide && this.loop) {
            this.position = 0;
            this.track.style.transform = `translateX(${this.position}px)`;
            return;
        }

        this.itemsLeft = Math.floor(this.items.length - (Math.abs(this.position) + this.slidesToShow * this.itemWidth) / this.itemWidth);
        this.position -= this.itemsLeft >= this.slidesToScroll ? this.moveTo : this.itemsLeft * this.itemWidth;
        this.track.style.transform = `translateX(${this.position}px)`;

        this.setDisabled();
    }

    setDisabled() {
        if (this.loop) return;

        this.prevBtn.disabled = this.position === 0;
        this.nextBtn.disabled = Math.abs(this.position) >= (this.items.length - this.slidesToShow) * this.itemWidth;
    }
}

const slider = new Slider();