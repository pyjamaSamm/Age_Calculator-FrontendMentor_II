
$(document).ready(function () {
    $("input").on("keyup", function () {
        setTimeout(checkInputs, 500);
    });
});

function errorCss() {
    $(".dateHeading").css("color", "red")
    $("input").css("border-color", "red")
}

function correctedCss() {
    $(".dateHeading").css("color", "hsl(0, 1%, 44%)")
    $("input").css("border-color", "rgb(215, 208, 208)")
}

function checkInputs() {
    var dayVal = $("#dayID").val().trim();
    var monthVal = $("#monthID").val().trim();
    var yearVal = $("#yearID").val().trim();

    dayVal = parseInt(dayVal);
    monthVal = parseInt(monthVal);
    yearVal = parseInt(yearVal);

    var dd = false;
    var mm = false;
    var yy = false;

    if (dayVal !== "" && !isNaN(dayVal)) {
        $(".dateErr").text("");
        $(".dateErr").css("visibility", "hidden");
        correctedCss()
        dd = true;
    } else {
        $(".dateErr").text("Enter a valid number");
        $(".dateErr").css("visibility", "visible");
        errorCss()
    }

    if (monthVal !== "" && !isNaN(monthVal)) {
        $(".monthErr").text("");
        $(".monthErr").css("visibility", "hidden");
        correctedCss()
        mm = true;
    } else {
        $(".monthErr").text("Enter a valid number");
        $(".monthErr").css("visibility", "visible");
        errorCss()
    }

    if (yearVal !== "" && !isNaN(yearVal)) {
        $(".yearErr").text("");
        $(".yearErr").css("visibility", "hidden");
        correctedCss()
        yy = true;
    } else {
        $(".yearErr").text("Enter a valid number");
        $(".yearErr").css("visibility", "visible");
        errorCss()
    }

    if (dd && mm && yy) {
        if (checkDate(dayVal, monthVal, yearVal)) {
            showDate(dayVal, monthVal, yearVal);
        }
    }
}

function checkDate(d, m, y) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const currentDate = new Date();
    const inputDate = new Date(y, m - 1, d);

    if (inputDate > currentDate) {
        $(".dateErr, .monthErr, .yearErr").text("Must be in the past");
        $(".dateErr, .monthErr, .yearErr").css("visibility", "visible");
        errorCss()
        return false;
    }

    if (m === 1 || m > 2) {
        if (d > days[m - 1]) {
            $(".dateErr").text("Enter a valid date");
            $(".dateErr").css("visibility", "visible");
            errorCss()
            return false;
        }
    } else if (m === 2) {
        let leapYear = false;
        if ((!(y % 4) && y % 100) || !(y % 400)) {
            leapYear = true;
        }
        if (!leapYear && d >= 29) {
            $(".dateErr").text("Enter a valid date for February");
            $(".dateErr").css("visibility", "visible");
            errorCss()
            return false;
        } else if (leapYear && d > 29) {
            $(".dateErr").text("Enter a valid date for February");
            $(".dateErr").css("visibility", "visible");
            errorCss()
            return false;
        }
    }

    return true;
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so adding 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function showDate(d, m, y) {
    const givenDate = y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    const presentDate = getCurrentDate();
    const ans = getDateDifference(givenDate, presentDate);

    // console.log(ans.years + "/" + ans.months + "/" + ans.days);
    if (isNaN(ans.days) || isNaN(ans.months) || isNaN(ans.years)) {
        errorCss()
        $(".dateErr, .monthErr, .yearErr").text("Enter valid date");
        $(".dateErr, .monthErr, .yearErr").css("visibility", "visible");
    } else {
        correctedCss()
        $(".dateErr, .monthErr, .yearErr").css("visibility", "hidden");
        $(".updateDay").text(ans.days)
        $(".updateMonth").text(ans.months)
        $(".updateYear").text(ans.years)
    }
}

function getDateDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    // Convert the date strings to Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the difference in days
    const diffInDays = Math.round(Math.abs((d2 - d1) / oneDay));

    // Calculate the difference in years, months, and remaining days
    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    const days = diffInDays % 30;

    // Return the difference as an object
    return {
        years,
        months,
        days
    };
}
