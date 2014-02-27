var gutil = require('gulp-util'),
  through = require('through2'),
  es = require('es');

const PLUGIN_NAME = 'gulp-cache-break';
const TIMESTAMP = new Date().getTime();

module.exports = function(assetPath){

  if (!assetPath) {
    throw new PluginError(PLUGIN_NAME, "Missing assetPath!");
  }

  /**
   * Append a timestamp to a string
   * @param {String} filename
   * @returns {String}
   */
  var makeNewUrl = function( filename ) {
    return (filename + '?rel=' + TIMESTAMP);
  };

  /**
   * Make a regular expression that matched a string up until the closing ["]
   * @param {String} string
   * @returns {RegExp}
   */
  var makeTagRegex = function( string ) {
    return new RegExp( string + '(.+)?(?=")' );
  };

  return through.obj(function (file, enc, cb) {

    // define the streamer that will transform the content
    var streamer = through();

    // catch errors from the streamer and emit a gulp plugin error
    streamer.on('error', this.emit.bind(this, 'error'));

    var data = file.contents.toString('utf8');
    var regex    = makeTagRegex( assetPath ),
        url      = makeNewUrl( assetPath ),
        match    = data.match( regex ),
        newData;

    if ( match !== null ) {
      newData = data.replace( regex, url );
      newData = new Buffer(String(newData))
      file.contents = newData;
      gutil.log(PLUGIN_NAME+':', assetPath);
    } else {
      throw new PluginError(PLUGIN_NAME, "Asset URL not found!");
    }

    this.push(file);
    return cb();

  });

};
