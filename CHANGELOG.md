# 5.0.4

* Security: update peer dependencies to allow lts versions of multer with security fixes

# 5.0.2

* Fixed: Solved bug when not using the client parameter and the topology is not present in the db object #377
* Update: Updated dependencies

# 5.0.1

  * Fixed: Updated ObjectID reference to ObjectId to allow compatibility with mongodb4.

# 5.0.0

  * Feature: Module rewritten in Typescript. Separate definition files are no longer required.
  * Fixed: If using the `fromStream` method the readable source emits an error the promise is rejected. #205
  * Fixed: Attached events to `MongoClient` or `Db` object depending on the installed mongo version.
  * Fixed: Replaced mongoose reference with mongoose like object to avoid version conflicts.
  * Update: Updated dependencies.

# 4.2.0

  * Feature: Added the `fromFile` and `fromStream` public methods
  * Update: Documented the `generateBytes` method
  * Update: Updated dependencies

# 4.1.0

  * Breaking change: Removed Node 8 support
  * Update: Updated dependencies

# 4.0.3

  * Update: Updated dependencies

# 4.0.2

  * Update: Updated dependencies

# 4.0.1

  * Fix: Moved multer from dependencies to peerDependencies
  * Fix: Removed xo from dependencies
  * Update: Updated `pump` dependency

# 4.0.0

  * Feature: Added the `client` option to the constructor
  * Feature: Supported `client` as a promise
  * Update: Removed the `connectionOpts` setting
  * Breaking change: Removed Node 6 support
  * Breaking change: The `ready` method and the `connection` event now produces an object with the `db` and the `client` 

# 3.3.0

  * Update: Removed compatibility with Node 4

# 3.2.3

  * Fix: Solved bug in mongodb@2 and mongoose compatibility

# 3.2.2

  * Fix: Removed multer extra dependency from `package.json`

# 3.2.1

  * Feature: Added `aliases` and `disableMD5` properties to file naming configuration

# 3.2.0

 * Feature: Support for Mongoose connections
 * Feature: Ready method to wait for the MongoDb connection
 * Breaking change: Deprecated "connectionOpts" in favor of "options"

# 3.1.0

 * Feature: Added caching feature
 * Fix: Updated dependencies
 * Fix: Moved multer to peer dependencies
 * Breaking change: Dropped support for node 0.x
 * Breaking change: Removed es6-promise dependency
 * Breaking change: Added lodash.isplainobject dependency

# 3.0.1

 * Fix: Changed mongodb dependency version from 3 to >=2

# 3.0.0

 * Feature: Added support for mongodb version 3 in url connection string
 * Feature: Added `client` property to storage object

# 2.1.0

 * Feature: Allowed strings, numbers and null values as file configuration
 * Fix: Added examples to the readme

# 2.0.0

 * Breaking change: Removed gridfs-stream dependency
 * Breaking change: Removed all old file configuration options
 * Breaking change: Removed logging functions
 * Breaking change: The grid property in the file object was removed and its properties merged directly with the file object
 * Feature: Simplified api by adding a new option `file` to control file configuration
 * Feature: Added delayed file storage after successful connection instead of failing with an error

# 1.3.0

  * Fix: Renamed 'error' event to 'streamError' to prevent a bug where the the user does not set any listener for that event and emitting it causes the program to crash.


# 1.2.2

  * Feature: Added 'dbError' event
  * Fix: Call log function in 'error' event

# 1.2.1

  * Feature: Added 'error' event

# 1.2.0

  * Feature: Added generator function support
  * Feature: Allow to use promises in configuration options instead of callbacks

# 1.1.1

  * Fix: Fixed UnhandledPromiseRejection error
  

# 1.1.0

  * Feature: Added support for connection promises
  * Feature: Added file size information
  * Feature: Allow the api to be called with the `new` operator
  * Feature: Added Typescript support

# 1.0.3

  * Fix: Fixed code coverage

# 1.0.2

  * Feature: Changed log option to accept a function

# 1.0.1

  * Fix: Added validation for options

# 1.0.0

  * Initial stable release
  
# 0.0.5
  
  * Feature: Added support for changing the default collection with the root option
  
# 0.0.4
  
  * Feature: Added support for changing the chunk size
  
# 0.0.3
  
  * First release
