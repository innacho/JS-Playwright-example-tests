class GenerateCurrentMoment {
    constructor() {
        this.generateCurrentMoment = function () {
            const date = new Date();
            const currentDate = `${date.getUTCDate()}`;
            const currentDateRes = currentDate.length === 2 ? currentDate : `0${currentDate}`;
            const currentMonth = `${date.getUTCMonth() + 1}`;
            const currentMonthRes = currentMonth.length === 2 ? currentMonth : `0${currentMonth}`;
            const currentYear = `${date.getFullYear()}`;
            const currentYearRes = currentYear[2] + currentYear[3];
            const currentHour = `${date.getHours()}`;
            const currentHourRes = currentHour.length === 2 ? currentHour : `0${currentHour}`;
            const currentMinutes = `${date.getMinutes()}`;
            const currentMinutesRes = currentMinutes.length === 2 ? currentMinutes : `0${currentMinutes}`;
            const currentSeconds = `${date.getSeconds()}`;
            const currentSecondsRes = currentSeconds.length === 2 ? currentSeconds : `0${currentSeconds}`;
            const currentMilliseconds = `${date.getMilliseconds()}`;
            const randomizer = Math.floor(Math.random() * (9 - 0 + 1) + 0); // The maximum is inclusive and the minimum is inclusive 
            const currentTime = `${currentDateRes}${currentMonthRes}${currentYearRes}${currentHourRes}${currentMinutesRes}${currentSecondsRes}${currentMilliseconds}${randomizer}`;
            return currentTime;
        };
    }
}

export { GenerateCurrentMoment };