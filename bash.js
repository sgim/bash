var prompt = "prompt > "
//console.log(process);

var action = require("./command.js");

process.stdout.write(prompt);
process.stdin.setEncoding("utf8");
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g);
  var cmdCheck = cmdList[0].split(" ");
  var arg = cmdCheck.slice(1);
  var cmd = cmdCheck[0];
  cmdList.unshift();
  if(action[cmd]) {
  	action[cmd].call(action, arg, function (out) {
      var func = action[cmdList.unshift()];
      typeof func === "function" ? func(out, action[cmdList.unshift()] || action.newPrompt) : action.newPrompt();
    });
  } else {
    process.stdout.write('You typed: ' + cmd + "\n");
    action.newPrompt();
  }

});

