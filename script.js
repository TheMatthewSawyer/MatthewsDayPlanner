var preWorkArr = new Array(9);
var workHoursArr = new Array(9);
var postWorkArr = new Array(6);

var day = {
    preWork : preWorkArr,
    workHours : workHoursArr,
    postWork : postWorkArr
}

var leftButton = "<button id='dayBackwardBtn'><i class='fas fa-arrow-left'></i></button>";
var rightButton = "<button id='dayForwardBtn'><i class='fas fa-arrow-right'></i></i></button>";
var currentDay = moment().format('dddd, MMMM Do');
var currentView = currentDay;
var backward = 0;
var forward = 0;

$(document).ready(function() {
    
    $("#plannerAdd").on("click", function() {
        tabSwitch("#plannerAdd");
        addToPlanner();
    });

    $("#plannerView").on("click", function() {
        tabSwitch("#plannerView");
        viewPlanner();
    });

    $("#calendarView").on("click", function() {
        tabSwitch("#calendarView");
        clear();
    });

    $("#plannerAdd").click();

    function tabSwitch(tab) {
        $("#plannerAdd").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $("#plannerView").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $("#calendarView").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $(tab).css("backgroundColor", "rgba(250, 250, 210, 1)");
    }

    function clear() {
        $("#dateContainer1").empty();
        $("#dateContainer2").empty();
        $("#dateContainer3").empty();
        $("#main").empty();
    }

    function addToPlanner() {
        clear();
        topDateSelector();

    }

    function dayBackward() {
        if(forward > 0) {
            forward--;
            currentView = moment().add(forward, "days").format('dddd, MMMM Do');
        } else {
            backward++;
            currentView = moment().subtract(backward, "days").format('dddd, MMMM Do');
        }
        currDayBtn();
        return currentView;
    }

    function dayForward() {
        if(backward > 0) {
            backward--;
            currentView = moment().subtract(backward, "days").format('dddd, MMMM Do');
        } else {
            forward++;
            currentView = moment().add(forward, "days").format('dddd, MMMM Do');
        }
        currDayBtn();
        return currentView;
    }

    function currDayBtn() {
        if(currentView === currentDay){
            $("#curDayBtn").css("visibility", "hidden");

        } else {
            $("#curDayBtn").css("visibility", "visible");
        }
        return;
    }

    function topDateSelector() {
        $("#dateContainer1").html(leftButton);
        $("#dateContainer2").html(currentView);
        $("#dateContainer3").html(rightButton);
        
        $("#dayBackwardBtn").on("click", function() {
            dayBackward();
            $("#dateContainer2").html(currentView);
        });
        
        $("#dayForwardBtn").on("click", function() {
            dayForward();
            $("#dateContainer2").html(currentView);
        });

        $("#curDayBtn").on("click", function() {
            currentView = currentDay;
            backward = 0;
            forward = 0;
            currDayBtn();
            $("#dateContainer2").html(currentView);
        });
    }

    function viewPlanner () {
        clear();
        topDateSelector();

    }

});