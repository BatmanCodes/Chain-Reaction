// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    WinJS.Binding.optimizeBindingReferences = true;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();

})();

var st;
var n = 8;
var co = 6;
var color;
var red = new Number();
var green = new Number();                          //1 for red and 2 for green
var molecules;
var alter = 0;
var e, f;
var blank = "images/blank.png";
var red1 = "images/red1.png";
var red2 = "images/red2.png";
var red3 = "images/red3.png";
var green1 = "images/green1.png";
var green2 = "images/green2.png";
var green3 = "images/green3.png";

function display() {                 //on clicking start  
    console.log("display called");
    color = new Array(n);
    molecules = new Array(n);
    for (var k = 0; k < n; k++) {           //makes a,molecules and color multidimensional
        color[k] = new Array(co);
        molecules[k] = new Array(co);
    }

    for (var i = 0; i < n; i++) {           //initialises a,molecules and color to 0
        for (var j = 0; j < co; j++) {
            color[i][j] = 0;
            molecules[i][j] = 0;
        }
    }

    st = "<p id='result'></p><table id='tabl'>";
    for (var l = 0; l < n; l++) {           //creates grid 
        st = st + "<tr>";
        for (var m = 0; m < co; m++) {
            st = st + "<td><button class='box'><img src='images/blank.png' id=" + ((l * co) + m) + " onclick=play(this.id) </button></td>";
        }
        st = st + "</tr>";
    }
    st = st + "</table>";
    var z = document.getElementById("bigbox");
//    stStatic = toStaticHTML(st);
      z.innerHTML = st;
}

function play(ide) {
    var o = new Number(ide);
    e = Math.floor(o / co);
    f = Math.floor(o % co);
    alter++;
    if (color[e][f] == 0) {
        if (alter % 2 == 1) {
            color[e][f] = 1;
        }
        else color[e][f] = 2;
    }
    else if (color[e][f] == 1) {
        if (alter % 2 == 0) {
            alter--;
            return;
        }
    }
    else if (alter % 2 == 1) {
        alter--;
        return;
    }
    fill(e, f);
    var d = document.getElementById("result");
    if (alter > 2) {
        if (red <= 0) {
            d.innerHTML = "!!!!Green Wins!!!!";
        }
        else if (green <= 0) {
            d.innerHTML = "!!!!Red Wins!!!!";
        }
    }
}

function fill(g, h) {
    g = parseInt(g, 10);
    h = parseInt(h, 10);
    molecules[g][h]++;
    if (color[e][f] == 1) {
        if (color[g][h] == 2) {
            red += molecules[g][h];
            green -= molecules[g][h] - 1;
        }
        else {
            red++;
        }
    }
    else if (color[e][f] == 2) {
        if (color[g][h] == 1) {
            green += molecules[g][h];
            red -= molecules[g][h] - 1;
        }
        else {
            green++;
        }
    }
    else {
        if (alter % 2 == 1) {
            red++;
        }
        else if (alter % 2 == 0) {
            green++;
        }
    }
    console.log("id" + g + h + "molecules" + molecules[g][h]);
    var t = document.getElementById(g * co + h);
    if (g < n - 1 && g > 0 && h < co - 1 && h > 0) {
        console.log("if1");
        if (molecules[g][h] == 4) {
            molecules[g][h] = 0;
            if (color[e][f] == 1) {
                red -= 4;
            }
            else {
                green -= 4;
            }
            fill(g, h - 1);
            fill(g, h + 1);
            fill(g - 1, h);
            fill(g + 1, h);
        }
    }

    else if (g == n - 1 && h > 0 && h < co - 1) {
        console.log("if2");
        if (molecules[g][h] == 3) {
            molecules[g][h] = 0;
            if (color[e][f] == 1) {
                red -= 3;
            }
            else {
                green -= 3;
            }
            fill(g, h + 1);
            fill(g, h - 1);
            fill(g - 1, h);
        }
    }

    else if (g == 0 && h > 0 && h < co - 1) {
        console.log("if3");
        if (molecules[0][h] == 3) {
            molecules[0][h] = 0;
            if (color[e][f] == 1) {
                red -= 3;
            }
            else {
                green -= 3;
            }
            fill(0, h + 1);
            fill(0, h - 1);
            fill(1, h);
        }
    }

    else if (g < n - 1 && g > 0 && h == co - 1) {
        console.log("if4");
        if (molecules[g][h] == 3) {
            molecules[g][h] = 0;
            if (color[e][f] == 1) {
                red -= 3;
            }
            else {
                green -= 3;
            }
            fill(g + 1, h);
            fill(g - 1, h);
            fill(g, h - 1);
        }
    }

    else if (g < n - 1 && g > 0 && h == 0) {
        console.log("if5");
        if (molecules[g][0] == 3) {
            molecules[g][0] = 0;
            if (color[e][f] == 1) {
                red -= 3;
            }
            else {
                green -= 3;
            }
            fill(g, 1);
            fill(g + 1, h);
            fill(g - 1, h);
        }
    }

    else if (g == 0 && h == 0) {
        console.log("if6");
        if (molecules[0][0] == 2) {
            molecules[0][0] = 0;
            if (color[e][f] == 1) {
                red -= 2;
            }
            else {
                green -= 2;
            }
            fill(0, 1);
            fill(1, 0);
        }
    }

    else if (g == 0 && h == co - 1) {
        console.log("if7");
        if (molecules[0][h] == 2) {
            molecules[0][h] = 0;
            if (color[e][f] == 1) {
                red -= 2;
            }
            else {
                green -= 2;
            }
            fill(0, h - 1);
            fill(1, h);
        }
    }

    else if (g == n - 1 && h == 0) {
        console.log("if8");
        if (molecules[g][0] == 2) {
            molecules[g][0] = 0;
            if (color[e][f] == 1) {
                red -= 2;
            }
            else {
                green -= 2;
            }
            fill(g - 1, 0);
            fill(g, 1);
        }
    }

    else if (g == n - 1 && h == co - 1) {
        console.log("if9");
        if (molecules[g][h] == 2) {
            console.log("Error");
            molecules[g][h] = 0;
            if (color[e][f] == 1) {
                red -= 2;
            }
            else {
                green -= 2;
            }
            fill(g - 1, h);
            fill(g, h - 1);
        }
    }

    color[g][h] = color[e][f];
    if (color[e][f] == 1) {
        if (molecules[g][h] == 0) {
            t.src = blank;
            color[g][h] = 0;
        }
        else if (molecules[g][h] == 1) {
            t.src = red1;
        }
        else if (molecules[g][h] == 2) {
            t.src = red2;
        }
        else {
            t.src = red3;
        }
    }

    else {
        if (molecules[g][h] == 0) {
            t.src = blank;
            color[g][h] = 0;
        }
        else if (molecules[g][h] == 1) {
            t.src = green1;
        }
        else if (molecules[g][h] == 2) {
            t.src = green2;
        }
        else {
            t.src = green3;
        }
    }
}
