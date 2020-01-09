$(document).ready(function() {
    
    $("#plannerAdd").on("click", function() {
        tabSwitch("#plannerAdd");
        $("#main").css("backgroundColor", "blue");
    });

    $("#plannerView").on("click", function() {
        tabSwitch("#plannerView");
        $("#main").css("backgroundColor", "green");
    });

    $("#calendarView").on("click", function() {
        tabSwitch("#calendarView");
        $("#main").css("backgroundColor", "purple");
    });

    $("#plannerAdd").click();

    function tabSwitch(tab) {
        $("#plannerAdd").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $("#plannerView").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $("#calendarView").css("backgroundColor", "rgba(250, 250, 210, 0.50)");
        $(tab).css("backgroundColor", "rgba(250, 250, 210, 1)");
    }

});