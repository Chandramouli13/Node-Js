
//  OS - operating system.      its a inbuilt in the node.js.
// When we want to download any tool/software for laptop 
// How the tool/software knows that automatically shows download for windows / download for mac 
// Here comes we use OS.js


let os = require('os');
console.log(os.platform())
console.log(os.arch())
console.log(os.freemem())
console.log(os.uptime())
console.log(`${os.cpus().length} core`)

// output
/* chand@MSI MINGW64 /d/EDUREKA/NodeJS Edureka/inbuilt (master)
$ node os.js
win32  // platform
x64     // architecture
7733067776  // freemem
973348      // uptime
12 core     // cpus 
*/

