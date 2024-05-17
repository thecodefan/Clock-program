const militaryTimeButton = document.getElementById("militaryTime");
const locations = document.getElementById("locations");
let isMilitaryTime = false;

militaryTimeButton.addEventListener("click", () => {
    isMilitaryTime = !isMilitaryTime;
    militaryTimeButton.textContent = isMilitaryTime ? "Standard Time" : "Military Time";
    updateClock();
});

locations.addEventListener("change", updateClock);

function updateClock() {
    let now;

    if (locations.value === "pcTime") {
        now = new Date();
    } else if (locations.value === "toIran") {
        const localTime = new Date();
        const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
        now = new Date(utcTime + (3600000 * 3.5)); // UTC+3:30 for Iran
    } else if (locations.value === "toNY") {
        const localTime = new Date();
        const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
        const isDaylightSaving = localTime.getMonth() > 2 && localTime.getMonth() < 10 || (localTime.getMonth() === 2 && localTime.getDate() >= 14 && localTime.getDay() >= 1) || (localTime.getMonth() === 10 && localTime.getDate() <= 7 && localTime.getDay() <= 1);
        const offset = isDaylightSaving ? -4 : -5; // UTC-4 during Daylight Saving Time, otherwise UTC-5
        now = new Date(utcTime + (3600000 * offset));
    }

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
