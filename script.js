const panels = document.querySelectorAll(".panel");
let currentIndex = 0;
let autoSlideInterval;
let allActiveMode = false;

const removeActiveClasses = () => {
    panels.forEach((panel) => {
        panel.classList.remove("active")
    });
};

// Set a specific panel as active
const setActivePanel = (index) => {
     if (allActiveMode) {
        return;
     }
    removeActiveClasses();
    panels[index].classList.add("active");
    currentIndex = index;
};

// Handle click
panels.forEach((panel, index) => {
    panel.addEventListener("click", () => {
        if (!allActiveMode) {
            setActivePanel(index);
            resetAutoSlide();
        }
    });
});


// Auto-slide function
const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1)% panels.length;
        setActivePanel(nextIndex);
    }, 3000);
};

const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
};

// Keyboard controls
document.addEventListener("keydown", (e) => {
    if (e.key ==="ArrowRight") {
        let nextIndex = (currentIndex + 1)% panels.length;
        setActivePanel(nextIndex);
        resetAutoSlide();
    } else if (e.key === "ArrowLeft") {
        let prevIndex =(currentIndex -1 + panels.length) %panels.length
        setActivePanel(prevIndex);
        resetAutoSlide();
    } else if (e.key === "Backspace") {
        e.preventDefault();
        panels.forEach(panel => panel.classList.add("active"));
        clearInterval(autoSlideInterval);
        allActiveMode = true;
    } else if (e.key === "Escape") {
        allActiveMode = false;
        setActivePanel(currentIndex);
        resetAutoSlide();
    }
});

panels.forEach((panel, index) => {
    panel.addEventListener("click", () => {
        if (!allActiveMode) {
            setActivePanel(index);
            resetAutoSlide();
        }
    });
});

// Initialize
setActivePanel(currentIndex);
startAutoSlide();