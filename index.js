//digital clock

function updateClock(){

    const now=new Date();
    let hours= now.getHours().toString().padStart(2,0); //first 2 chars, pad with 0 , this adds numbers on digits
    const minutes=now.getMinutes().toString().padStart(2,0);
    const seconds=now.getSeconds().toString().padStart(2,0);

    const meridium=hours>=12 ?"PM":"AM"
    hours=hours % 12 || 12; // if it's dividuslbe by zero, use "or" 12
    hours=hours.toString().padStart(2,0); //since hours is redefined, you need to repad it

    const timeString=`${hours}:${minutes}:${seconds} ${meridium}`;
    document.getElementById("clock").textContent=timeString;
}

updateClock();
setInterval(updateClock,1000); //update the clock every 1000 milliseconds