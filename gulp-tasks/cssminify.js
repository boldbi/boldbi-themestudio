  
"use strict";
var gulp = require("gulp"),
concat = require("gulp-concat"),
cssmin = require("gulp-cssmin"),
merge = require("merge-stream");
var fg = require('fast-glob');
var fs = require('fs');

var pathList = [];
var dirList = fs.readdirSync('./themes');
for(var dir in dirList){
	pathList.push(dirList[dir]);
}
	
function mincss (file, fileList) {
	var tasks = gulp.src(fileList, { base: ".", allowEmpty: true })
              .pipe(concat('./assets/themes/' + file + '/boldbi.theme.definition.min.css'))
              .pipe(cssmin())
              .pipe(gulp.dest("."));	  
     return merge(tasks);
};

gulp.task('min:css', async function() {
	
	for(var file in pathList)
	{
		var fileList = [];
		var directories = fg.sync('./themes/'+pathList[file]+'/*.css', {objectMode: true});
		if(directories.length>0){
			for (var di in directories)
			{
				fileList.push(directories[di].path);
			}
			mincss(pathList[file], fileList);
		}
	}
});

gulp.task('build', gulp.series('min:css'));
