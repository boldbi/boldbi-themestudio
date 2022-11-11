  
"use strict";
var gulp = require("gulp"),
concat = require("gulp-concat"),
cssmin = require("gulp-cssmin"),
merge = require("merge-stream");
var fg = require('fast-glob');
var fs = require('fs');
var path = require("path");

var rootName = "./themes";

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

function DirectoryList(_path)
{
	var directoryList = fs.readdirSync(_path).map(name=>{
	return path.join(_path, name)});
	var pathList = [];
	
	for(var directory in directoryList)
	{
		if(fs.lstatSync(directoryList[directory]).isDirectory()){
			pathList.push(directoryList[directory]);
			
			var files = fs.readdirSync(directoryList[directory])
			.map(file=> {
				return path.join(directoryList[directory], file)
			})
			.filter(isFile);
			
			files.forEach(file=>{
				pathList.push(file);
			});
			
		}
		else{
			
			pathList.push(directoryList[directory]);
		}
		
	}
	return pathList;
}
	
function mincss (file, fileList) {
	var tasks = gulp.src(fileList, { base: ".", allowEmpty: true })
              .pipe(concat('./assets/' + file + '/boldbi.theme.definition.min.css'))
              .pipe(cssmin())
              .pipe(gulp.dest("."));	  
     return merge(tasks);
};

gulp.task('min:css', async function() {
	
	var rootPath = fs.readdirSync(rootName)
		.map(name =>{ return path.join(rootName, name)});
	
	rootPath.forEach(_paths => {
		if(fs.lstatSync(_paths).isDirectory()){
			var files = DirectoryList(_paths);
			mincss(_paths,files);
		}
	});
});

gulp.task('build', gulp.series('min:css'));
