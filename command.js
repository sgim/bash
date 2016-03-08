var fs = require("fs");
var request = require("request");
var prompt = "prompt > ";
// require("chalk")
// chalk is a standard library to add color to terminal

// if you require a folder, it assumes you are looking for an index.js file

var print = function (txt, noline) {
  process.stdout.write((noline ? "" :"\n") + (txt || prompt));
};
var pwd = function (files, done) {
	var result = __dirname;
	print(result);
	done(result);
};
var date = function (files, done) {
	var result = Date();
	print(result);
	done(result);
};
var echo = function (files, done) {
	var result = files.join(" ");
	print(result);
	done(result);
};
var forEachFile = function (func, n) {
	func = typeof func === "function" ? func : function (d) { return d;};
	return function (files, done) {
		var arr = 0;
		n || (n = 10);
		files.forEach(function(filezzz, i) {
			fs.readFile(filezzz, "utf8", function (err, data) {
				if (err) throw err;
				files.length > 1 && print("\n\n==> " + files[i] + " <==\n\n", false);
				var result = func(data, n);
				print(result);
				arr++;
				if(arr === files.length) done(result);
			});
		});
	};
};
var cat = forEachFile();
var head = forEachFile(function (data, n) {
	return data.split("\n").slice(0,n).join("\n");
});
var tail = forEachFile(function (data, n) {
  return data.split("\n").slice(0 - n).join("\n");
});
var sort = forEachFile(function (data, n) {
	return data.split("\n").sort().join("\n");
});
var wc = forEachFile(function (data) {
	return data.split("\n").length - 1;
});
var uniq = forEachFile(function (data) {
	var result = [];
	var j = 0, newData = data.split("\n"),
			length = newData.length - 1;
	for(; j <= length; j++) {
		if(newData[j - 1] !== newData[j]) {
			result.push(newData[j]);
		}
	}
	return result.join("\n");
});

module.exports = {
	"newPrompt": print,
	"pwd": pwd,
	"date": date,
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
	"echo": echo,
	"cat": cat,
	"head": head,
	"tail": tail,
	"sort": sort,
	"wc": wc,
	"uniq": uniq,
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