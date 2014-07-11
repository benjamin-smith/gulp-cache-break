var gutil = require('gulp-util'),
  through = require('through2'),
  es = require('es');

const PLUGIN_NAME = 'gulp-cache-break';
const TIMESTAMP = new Date().getTime();

module.exports = function(assetPath, options){

  if (!assetPath) {
    throw new PluginError(PLUGIN_NAME, "Missing assetPath!");
  }

  /**
   * Where the cache-busting timestamp will reside in the file name
   * append:   foo.js?rel=TIMESTAMP  the default
   * filename: foo.TIMESTAMP.js
   * @type string
   */
  var position = (options && options.hasOwnProperty('position')) ? options.position : 'append';

  /**
   * Append a timestamp to a string
   * @param {String} filename
   * @returns {String}
   */
  var makeNewUrl = function( filename ) {
    if (position === 'filename') {
      return filename.replace(/^(.+)(\.[\w\d]+)$/, '$1.' + TIMESTAMP + '$2');
    }

    return (filename + '?rel=' + TIMESTAMP);
  };

  /**
   * Make a regular expression that matched a string up until the closing ["]
   * @param {String} string
   * @returns {RegExp}
   */
  var makeTagRegex = function( string ) {
    if (position === 'filename') {
      return new RegExp( string.replace(/^(.+)(\.[\w\d]+)$/, '$1(\.\\d+)?$2') );
    }

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
