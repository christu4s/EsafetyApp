var fs = require('fs');
var archiver = require('archiver');
var request = require('request');
var filename = 'target.zip';

// var putURL = 'http://esafety.enkuire.com/wp-admin/admin-ajax.php?action=deploy';
var putURL = 'https://actsyn.com/esafety/wp-admin/admin-ajax.php?action=deploy';

var output = fs.createWriteStream(filename);
var archive = archiver('zip');

archive.on('error', function(err) { console.log(err.message); });

output.on('close', deploy);

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(__dirname + '/../build', false);

// append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory('subdir/', 'new-subdir');
archive.finalize();

//deploy
function deploy(){
    var req = request.post(putURL, async function (err, resp, body) {
        err ? console.error('Error!', err) : console.log(body);
        try {
            fs.unlink(filename, function(){ console.log(`successfully deleted ${filename}`); });
        } catch (error) {
            console.error('there was an error:', error.message);
        }
    });
    var form = req.form();
    form.append('file', fs.createReadStream(filename));
}
