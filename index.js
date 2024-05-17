const militaryTimeButton = document.getElementById("militaryTime");
let isMilitaryTime = false;

militaryTimeButton.addEventListener("click", () => {
    isMilitaryTime = !isMilitaryTime;
    militaryTimeButton.textContent = isMilitaryTime ? "Standard Time" : "Military Time";
    updateClock();
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    let timeString;
    
    if (isMilitaryTime) {
        hours = hours.toString().padStart(2, '0');
        timeString = `${hours}:${minutes}:${seconds}`;
    } else {
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        hours = hours.toString().padStart(2, '0');
        timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    }
    
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000); // Update the clock every 1000 milliseconds
