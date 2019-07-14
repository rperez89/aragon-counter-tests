// import execa from "execa";
// const fs = require("fs");
// import { startBackgroundProcess, normalizeOutput } from "./util";
// var exec = require("child_process").exec;
// var child;
// const { spawn } = require("child_process");

// jest.setTimeout(1000000);

// it("Adding 1 + 1 equals 2", async () => {
//   try {
//     // act
//     const { stdout, exit } = await startBackgroundProcess({
//       cmd: "aragon",
//       args: ["run"],
//       execaOpts: {
//         cwd: "../"
//         /**
//          * By default execa will run the aragon binary that is located at '.tmp/foobar/node_modules'.
//          * That is coming from npm and is not the one we want to test.
//          *
//          * We need to tell it to use the one we just built locally and installed in the e2e-tests package
//          */
//       },
//       readyOutput: "Opening http://localhost:3000/#/"
//     });

//     // hack so the wrapper has time to start
//     await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000)); // TODO move to utils

//     // finding the DAO address
//     const daoAddress = stdout.match(/DAO address: (0x[a-fA-F0-9]{40})/)[1];

//     // TODO: fetch the counter app instead
//     const fetchResult = await fetch(`http://localhost:3000/#/${daoAddress}`);
//     const fetchBody = await fetchResult.text();
//     console.log("fetchResult ", fetchResult);
//     console.log("fetchBody ", fetchBody);
//   } catch (e) {
//     console.log("error ", e);
//   }
//   // cleanup
//   await exit();

//   expect(1).toBe(1);
// });
// it("Multiplying 1 * 1 equals 1", () => {
//   expect(1).toBe(1);
// });
// it("Subtracting 1 - 1 equals 0", () => {
//   expect(1).toBe(1);
// });
// it("Dividing 1 / 1 equals 1", () => {
//   expect(1).toBe(1);
// });
