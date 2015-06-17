// ==UserScript==
// @name         Toodledo
// @namespace    https://www.toodledo.com/
// @version      0.1
// @description  Toodledo plugin to show the task url;
// @author       You
// @match        https://www.toodledo.com/tasks/quickadd*
// @grant        GM_setClipboard
// ==/UserScript==
(function () {
    function addExitKeyListener() {
        var element = document.getElementById('TDL_close');
        document.addEventListener('keyup', function exitKeyListener(event) {
            if (event.keyCode == 27) {
                top.postMessage("pass", "*");
                document.removeEventListener('keyup', exitKeyListener);
            }
        });
    }

    function taskAdded(a) {
        function buildUrl(responseText) {
            var url = "http://www.toodledo.com/tasks/index.php?#task_";
            return url + responseText.match(/row[0-9]+/)[0].match(/[0-9]+/)[0];
        }

        function buildHtml(responseText, container) {
            var url = buildUrl(responseText);
            var div = document.createElement('div');
            div.style.textAlign = "center";
            var input = document.createElement('input');
            input.readOnly = true;
            input.type = "text";
            input.style.width = "400px";
            input.id = "task-url-readonly-input";
            input.value = url;
            input.setAttribute('onfocus', 'this.select()');
            var closeBtn = document.createElement('input');
            closeBtn.type = 'button';
            closeBtn.className = 'button';
            closeBtn.id = 'copy-and-save';
            closeBtn.value = 'close';
            closeBtn.onclick = function () {
                top.postMessage("pass", "*");
            };
            div.appendChild(input);
            div.appendChild(document.createElement('br'));
            div.appendChild(closeBtn);
            container.appendChild(div);
            input.focus();
        }

        var b = a.responseText, c = 0;
        if ($("asgg"))var c = $F("asgg");
        var d = $("tasks").readAttribute("user");
        $("formAddTask").setAttribute("submitting", 0);
        var e = $("tasks").readAttribute("page");
        if ("" == b || "0" == b)alert("Sorry, there was an error and that task was not added.  Please try again."), "quick" == e && top.postMessage("fail", "*"); else if ("-1" == b)alert("Sorry, the task was not added because you are no longer signed in.  Please sign in and try again."), "quick" == e && top.postMessage("fail", "*"); else if ("-6" == b)alert("Sorry, you have reached the maximum number of tasks allowed (20,000) per account. You will need to delete some old completed tasks to make room for more."),
        "quick" == e && top.postMessage("fail", "*"); else if ("quick" == e) {
            var addTaskContainer = $('addtask');
            addTaskContainer.update("<br /><br /><br /><br /><div style='text-align:center'><b>Task Added</b></div>");
            buildHtml(b, addTaskContainer);
        } else if (0 != c && d != c)alert($("addMulti").visible() ? "The tasks have been added to your collaborator's list." : "The task has been added to your collaborator's list."), cancelAdd(null); else {
            new Insertion.Top("tasks", b), $("t0ev") && $("t0ev").remove(), cancelAdd(null), updateLengthTotals();
            var f = $$(".refreshme");
            f.each(function (a) {
                a.removeClassName("refreshme");
                var b = a.id.sub(/\D+/, ""), c = $("subtasks" + b).readAttribute("nofilters");
                getSubtasks(b, 1, c, -1)
            })
        }
    }

    var script = document.createElement('script');
    script.type = "text/javascript";
    script.innerHTML = '(function(){' +
        '(' + addExitKeyListener.toString() + ')();' +
        'window.taskAdded =' + taskAdded.toString() + ';' +
        '})()';
    document.head.appendChild(script);
})();