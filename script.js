var preWorkArr = new Array(9);
var workHoursArr = new Array(9);
var postWorkArr = new Array(6);
var chosenArray;
var viewTab = false;

var leftButton = "<button id='dayBackwardBtn'><i class='fas fa-arrow-left'></i></button>";
var rightButton = "<button id='dayForwardBtn'><i class='fas fa-arrow-right'></i></i></button>";
var currentDay = [moment().format('dddd, MMMM Do'),moment().format('MMDDYYYY')];
var currentView = new Array(2);
var backward = 0;
var forward = 0;

$(document).ready(function() {
    
    currentView = currentDay;
    $("#plannerAdd").on("click", function() {
        tabSwitch("#plannerAdd");
        plannerConstructor();
        addToPlanner();
        currDayBtn();
        viewTab = false;
    });

    $("#plannerView").on("click", function() {
        tabSwitch("#plannerView");
        viewPlanner();
        currDayBtn();
        viewTab = true;
    });

    $("#calendarView").on("click", function() {
        tabSwitch("#calendarView");
        clear();
        $("#curDayBtn").css("visibility", "hidden");
        viewCalendar();
    });
    
    $(document).on("click",".saveBtn", function() {
        var id = $(this).attr('id');
        var eventName = $("#"+id+"e").val();
        var eDescription = $("#"+id+"d").val();
        if(!eventName.replace(/\s/g, '').length) {
            return;
        }
        console.log(currentView[1] + " || This Id: " + id + " || " + eventName + ": Description: " + eDescription);
        var savedName = currentView[1] + id;
        var savedItem = [eventName, eDescription];
        localStorage.setItem(savedName, JSON.stringify(savedItem));
        addToPlanner();
        return;
    });

    $(document).on("click",".clearBtn", function() {
        var id = $(this).attr('id');
        var deleteItem = currentView[1]+id;
        console.log(deleteItem + " appointment deleted");
        localStorage.removeItem(deleteItem);
        addToPlanner();
    });

    $("#curDayBtn").on("click", function() {
        currentView = currentDay;
        backward = 0;
        forward = 0;
        currDayBtn();
        $("#dateContainer2").html(currentView[0]);
        if(!viewTab) {
            addToPlanner();
        } else {
            viewPlanner();
        }
    });

    $(document).on("click",".calendarDayBtn", function() {
        var calDate = $(this).attr('id');
        var curCalDate = parseInt(moment().date());
        backward = 0;
        forward = 0;
        if (curCalDate > calDate) {
            var backTmp = curCalDate-calDate;
        }
        else if (curCalDate < calDate) {
            var forTmp = calDate-curCalDate
        } 
        else {
            console.log("same");
        }
        $("#plannerView").click();
        for(var i = 0; i < backTmp; i++) {
            dayBackward();
        }
        for(var i = 0; i < forTmp; i++) {
            dayForward();
        }
        return;
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

    function plannerConstructor() {
        var tmp = "<button id='preWork'>Pre-Work</button>";
        tmp += "<div id='workBtnContainerTop'><button id='workHoursBtnTop'>Work Hours</button></div>";
        tmp += "<div id='plannerContainer'>";
        tmp += "<div class='plannerDataCss' id='plannerDataContainer'></div>";
        tmp += "</div>";
        tmp += "<div id='workBtnContainer'><button id='workHoursBtn'>Work Hours</button></div>";
        tmp += "<button id='postWork'>Post Work</button>";
        
        $("#main").html(tmp);
        
        return;
    }

    function addToPlanner() {
        clear();
        topDateSelector();
        plannerConstructor();

        $("#preWork").on("click", function() {
            addToPlannerPre();
        });
        
        $("#postWork").on("click", function() {
            addToPlannerPost();
        });

        $("#workHoursBtn").on("click", function() {
            addToPlannerWork();
        });

        $("#workHoursBtnTop").on("click", function() {
            addToPlannerWork();
        });
        if(chosenArray === postWorkArr) {
            addToPlannerPost();

        }else if(chosenArray === preWorkArr) {
            addToPlannerPre();
        } else {
            addToPlannerWork();
        }
        return;
    }

    function addToPlannerWork() {
        $("#plannerDataContainer").html(loadPlanner(workHoursArr));
        $("#workHourHeader").css("visibility", "visible");
        $("#workHoursBtn").css("visibility", "hidden");
        $("#workHoursBtnTop").css("visibility", "hidden");
        $("#plannerDataContainer").removeClass().addClass('plannerDataCss');
    }

    function addToPlannerPre() {
        $("#plannerDataContainer").html(loadPlanner(preWorkArr));
        $("#workHourHeader").css("visibility", "hidden");
        $("#workHoursBtn").css("visibility", "visible");
        $("#workHoursBtnTop").css("visibility", "hidden");
        $("#plannerDataContainer").removeClass().addClass('plannerDataCss2');
    }

    function addToPlannerPost() {
        $("#plannerDataContainer").html(loadPlanner(postWorkArr));
        $("#workHourHeader").css("visibility", "hidden");
        $("#workHoursBtn").css("visibility", "hidden");
        $("#workHoursBtnTop").css("visibility", "visible");
        $("#plannerDataContainer").removeClass().addClass('plannerDataCss3');
    }

    function loadPlanner(chArray) {
        chosenArray = chArray;

            //Checks which array and sets x to starting time
            if(chosenArray === preWorkArr){
                var x = 12;
                var timeChar = "AM";
            }
            else if(chosenArray === workHoursArr){
                var x = 9;
                var timeChar = "AM";
            }
            else{
                var x = 6;
                var timeChar = "PM";
            }
            
            var tmp = "<h5 id='workHourHeader' style='text-align: center;'>Work Hours</h5>";
            for(var i = 0; i < chosenArray.length; i++) {
                if(x === 12 && chosenArray !== preWorkArr) {timeChar = "PM";}
                if((x+timeChar) === moment().format('hA')) {
                    tmp += "<div class='row' id='currentHour'>";
                } else {
                    tmp += "<div class='row'>";
                }
                tmp += "<div class='col-md-2 time'>";
                if(localStorage.getItem(currentView[1] + x + timeChar) !== null) {
                    tmp += "<h4 style='color: red'>"+ x + " " + timeChar + "</h4>";
                    tmp += "</div><div class='col-md-3'>";
                    var storedItem = JSON.parse(localStorage.getItem((currentView[1] + x + timeChar)));
                    tmp += "<input type='text' placeholder='Event' id='" + x + timeChar +"e' value='" + storedItem[0] + "'>";
                    tmp += "</div><div class='col-md-5'>";
                    tmp +=  "<input type='text' placeholder='Description' id='" + x + timeChar +"d' value='" + storedItem[1] + "'>";
                    tmp += "</div><button id='" + x + timeChar + "' class='clearBtn' style='color: red;'>X</button>";
                    tmp += "<button id='" + x + timeChar + "' class='saveBtn'>Save</button></div>";

                } else {
                    tmp += "<h4>"+ x + " " + timeChar + "</h4>";
                    tmp += "</div><div class='col-md-3'>";
                    tmp += "<input type='text' placeholder='Event' id='" + x + timeChar +"e' value=''>";
                    tmp += "</div><div class='col-md-5'>";
                    tmp +=  "<input type='text' placeholder='Description' id='" + x + timeChar +"d' value=''>";
                    tmp += "</div><button id='" + x + timeChar + "' class='saveBtn'>Save</button></div>";
                }
                if(x === 12) {x = 1;}
                else{x++;}
            }
            return tmp;
    }

    function viewPlanner () {
        clear();
        topDateSelector();
        viewConstructor();

    }

    function viewConstructor() {
        var tmpHeader = "<div class='row' class='scroll' id='viewEventsCss'>";
        var tmp = "";
        for(var i = 1; i < 13; i++) {
            var dataID = currentView[1] + i + "AM";
            if(localStorage.getItem(dataID) !== null) {
                if(i===12){
                    var newtmp = tmp;
                    tmp = "";
                }
                var storedItem = JSON.parse(localStorage.getItem(dataID));
                var time = i + " AM";
                if(i === 9 || i === 10 || i === 11) {
                    tmp += "<div id='schEventWork'>";
                }else{
                    tmp += "<div id='schEventPre'>";
                }
                tmp += "<h3 id='timeAt'>" + time +"</h3>";
                tmp += "<h4 id='titleAt'>" + storedItem[0] + "</h4>";
                tmp += "<p id='descripAt'>" + storedItem[1] + "</p>";
                tmp += "</div>";
                if(i===12){
                    tmp += newtmp;
                }
            }
        }
        var tmp2 = "";
        for(var i = 1; i < 13; i++) {
            var dataID = currentView[1] + i + "PM";
            if(localStorage.getItem(dataID) !== null) {
                if(i===12){
                    var newtmp = tmp2;
                    tmp2 = "";
                }
                var storedItem = JSON.parse(localStorage.getItem(dataID));
                var time = i + " PM";
                if( ((i > 0) && (i < 6)) || (i===12) ) {
                    tmp2 += "<div id='schEventWork'>";
                }else{
                    tmp2 += "<div id='schEventPost'>";
                }
                tmp2 += "<h3 id='timeAt'>" + time +"</h3>";
                tmp2 += "<h4 id='titleAt'>" + storedItem[0] + "</h4>";
                tmp2 += "<p id='descripAt'>" + storedItem[1] + "</p>";
                tmp2 += "</div>";
                if(i===12){
                    tmp2 += newtmp;
                }
            }
        }
        tmp += tmp2 + "</div>";
        tmp = tmpHeader + tmp;
        $("#main").html(tmp);
        
        return;
    }
    
    function dayBackward() {
        if(forward > 0) {
            forward--;
            currentView = [moment().add(forward, "days").format('dddd, MMMM Do'),moment().add(forward, "days").format('MMDDYYYY')];
        } else {
            backward++;
            currentView = [moment().subtract(backward, "days").format('dddd, MMMM Do'),moment().subtract(backward, "days").format('MMDDYYYY')];
        }
        currDayBtn();
        if(!viewTab) {
            addToPlanner();
        } else {
            viewPlanner();
        }
        return currentView;
    }

    function dayForward() {
        if(backward > 0) {
            backward--;
            currentView = [moment().subtract(backward, "days").format('dddd, MMMM Do'),moment().subtract(backward, "days").format('MMDDYYYY')];
        } else {
            forward++;
            currentView = [moment().add(forward, "days").format('dddd, MMMM Do'),moment().add(forward, "days").format('MMDDYYYY')];
        }
        currDayBtn();
        if(!viewTab) {
            addToPlanner();
        } else {
            viewPlanner();
        }
        return currentView;
    }

    function currDayBtn() {
        if(currentView[0] === currentDay[0]){
            $("#curDayBtn").css("visibility", "hidden");
        } else {
            $("#curDayBtn").css("visibility", "visible");
        }
        return;
    }

    function topDateSelector() {
        $("#dateContainer1").html(leftButton);
        $("#dateContainer2").html(currentView[0]);
        $("#dateContainer3").html(rightButton);
        
        $("#dayBackwardBtn").on("click", function() {
            dayBackward();
            $("#dateContainer2").html(currentView[0]);
        });
        
        $("#dayForwardBtn").on("click", function() {
            dayForward();
            $("#dateContainer2").html(currentView[0]);
        });
    }

    function viewCalendar() {
        var x = 0;
        var tmp = "<div id='calendarContainer'><div class='row'>";
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
        for(var i = 0; i < days.length; i++){
            tmp += "<div class='day dayNames'><h6>";
            tmp += days[i];
            tmp += "</h6></div>"
        }
        tmp += "</div><div class='row'>";
        for(var i = 0; i < moment().startOf('month').day(); i++) {
            tmp += "<div class='day emptyDay'><h1>";
            tmp += ""
            tmp += "</h1></div>"
            x++;
        }
        for(var i = 0; i < moment().endOf('month').date(); i++) {
            var y = i + 1;
            y = y.toString();
            if(y === moment().format('D')) {
                tmp += "<div class='day curCalDay'>";
            } else {
                tmp += "<div class='day'>";
            }
            if(isEventPlanned(y)){
                tmp += "<h1 id='" + y + "' class='calendarDayBtn calDayTxt'>";
            } else {
                tmp += "<h1 class='calDayTxt'>";
            }
            
            tmp += i+1;
            tmp += "</h1></div>"
            x++;
            if(x===7){
                tmp += "</div><div class='row'>";
                x = 0;
            }
        }
        while(x!==7) {
            tmp += "<div class='day emptyDay'><h1>";
            tmp += ""
            tmp += "</h1></div>"
            x++;
        }
        tmp += "</div></div>";
        $("#dateContainer2").html(moment().format('MMMM'));
        $("#main").html(tmp);
    
    }

    function isEventPlanned (y) {
        var calDateID = moment().date(y).format('MMDDYYYY');
        for(var z = 1; z < 13; z++) {
            if(localStorage.getItem(calDateID + z + "AM") !== null) {
                return true;
            }
        }
    
        for(var z = 1; z < 12; z++) {
            if(localStorage.getItem(calDateID + z + "PM") !== null) {
                return true;
            }
        }
        return false;
    }    

});