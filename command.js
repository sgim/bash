var fs = require("fs");
var request = require("request");
var prompt = "prompt > ";
// require("chalk")
// chalk is a standard library to add color to terminal

// if you require a folder, it assumes you are looking for an index.js file

var actions = {
	"newPrompt": function () {
    	process.stdout.write('\n' + prompt);
	},
	"pwd": function (files, done) {
		process.stdout.write(__dirname + "");
		//process.stdout.write(process.cwd() + "");
		//process.stdout.write(process.mainModule.filename);
		this.newPrompt();
	},
	"date": function (files, done) {
		process.stdout.write(Date());
		this.newPrompt();
	},
	ls: function (files, done) {
		fs.readdir(".", function (err, files) {
			if(err) throw err;
			var result = [];
			files.forEach(function (file) {
				result.push(file.toString());
			});
			process.stdout.write(result.join("\n"));
			done(result);
		});
	},
	"echo": function (file) {
		file.forEach(function (f) {
			process.stdout.write(f + " ");
		});
        this.newPrompt();
	},
	"cat": function (files, done) {
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var result = data;
				process.stdout.write("\n" + result);
				arr++;
				if(arr === files.length) done(result);
			});
		});

	},
	"head": function (files, done) {
		var n = 10;
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var result = data.split("\n").slice(0, n).join("\n");
				process.stdout.write("\n" + result);
				arr++;
				if(arr === files.length) done(result);
			});
		});

	},
	"tail": function (files, done) {
		var n = 10;
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var result = data.split("\n").slice(0 - n).join("\n");
				process.stdout.write("\n" + result);
				arr++;
				if(arr === files.length) done(result);
			});
		});

	},
	"sort": function (files, done) {
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var result = data.split("\n").sort();
				process.stdout.write("" + result.join("\n"));
				arr++;
				if(arr === files.length) done(result);
			});
		});

	},
	"wc": function(files, done) {
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var result = (data.split("\n").length - 1);
				process.stdout.write("" + result);
				arr++;
				arr === files.length && done(result);
			});
		});

	},
	"uniq": function(files, done) {
		var arr = 0;
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) {
					throw err;
				}
				files.length > 1 && process.stdout.write("\n\n==> " + files[i] + " <==\n\n");
				var final = [];
				var j = 0, newData = data.split("\n"),
				    length = newData.length - 1;
				for(; j <= length; j++) {
					if(newData[j - 1] !== newData[j]) {
						final.push(newData[j]);
					}
				}
				var result = final.join("\n");
				process.stdout.write("" + result);
				arr++;
				arr === files.length && done(result);
			});
		});

	},
	"curl": function(files, done) {
		request.get({url: "http://" + files[0]}, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    process.stdout.write(body);
		  }
		});
	},
	"find": function (files, done) {
		var arr = 0;
		actions.ls(files || ".", function(files) {
			files.forEach(function (f) {
				fs.stat(f, function(err, filezzz) {
					if(err) throw err;
					if(filezzz.isDirectory()) {
						actions.find(f, done);
					} else {
						process.stdout.write("\n" + f);
					}
					
				});
			});
			done();
		});
	},
	"|": function (files, done) {

	}

};


module.exports = actions;