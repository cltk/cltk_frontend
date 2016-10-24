import { UploadFS } from 'meteor/jalik:ufs';

// TODO: this should probably be a local per project file

// Activate simulation for slowing file reading
// UploadFS.config.simulateReadDelay = 1000; // 1 sec

// Activate simulation for slowing file uploading
// UploadFS.config.simulateUploadSpeed = 128000; // 128kb/s

// Activate simulation for slowing file writing
// UploadFS.config.simulateWriteDelay = 2000; // 2 sec
UploadFS.config.simulateWriteDelay = 0;

// This path will be appended to the site URL, be sure to not put a "/" as first character
// for example, a PNG file with the _id 12345 in the "photos" store will be available via this URL :
// http://www.yourdomain.com/uploads/photos/12345.png
UploadFS.config.storesPath = 'uploads';

// Set the temporary directory where uploading files will be saved
// before sent to the store.
UploadFS.config.tmpDir = './tmp/uploads';

// Set the temporary directory permissions.
UploadFS.config.tmpDirPermissions = '0700';