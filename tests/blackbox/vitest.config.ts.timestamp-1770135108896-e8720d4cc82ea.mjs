// vitest.config.ts
import tsconfigPaths from "file:///D:/me/projects/directus-unews/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_t_6104a7424375be8d5be658fd1a56aff9/node_modules/vite-tsconfig-paths/dist/index.js";
import { defineConfig } from "file:///D:/me/projects/directus-unews/node_modules/.pnpm/vitest@1.6.1_@types+node@24_e6f8eedd72eed08a3547bdd861007879/node_modules/vitest/dist/config.js";

// setup/sequencer.ts
import { findIndex } from "file:///D:/me/projects/directus-unews/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import fs from "node:fs/promises";
import { BaseSequencer } from "file:///D:/me/projects/directus-unews/node_modules/.pnpm/vitest@1.6.1_@types+node@24_e6f8eedd72eed08a3547bdd861007879/node_modules/vitest/dist/node.js";

// setup/sequential-tests.ts
var sequentialTestsList = {
  common: {
    before: ["/common/common.test.ts"],
    after: [],
    // If specified, only run these tests sequentially
    only: [
      // '/common/common.test.ts',
    ]
  },
  db: {
    before: [
      "/tests/db/seed-database.test.ts",
      "/common/common.test.ts",
      "/tests/db/routes/schema/schema.test.ts",
      "/tests/db/routes/collections/crud.test.ts",
      "/tests/db/routes/fields/change-fields.test.ts",
      "/tests/db/routes/fields/crud.test.ts",
      "/tests/db/routes/items/version.test.ts"
    ],
    after: [
      "/tests/db/schema/timezone/timezone.test.ts",
      "/tests/db/schema/timezone/timezone-changed-node-tz-america.test.ts",
      "/tests/db/schema/timezone/timezone-changed-node-tz-asia.test.ts",
      "/tests/db/websocket/auth.test.ts",
      "/tests/db/websocket/general.test.ts",
      "/tests/db/routes/permissions/cache-purge.test.ts",
      "/tests/db/routes/flows/webhook.test.ts",
      "/tests/db/app/cache.test.ts",
      "/tests/db/routes/collections/schema-cache.test.ts"
    ],
    // If specified, only run these tests sequentially
    only: [
      // '/tests/db/seed-database.test.ts',
      // '/common/common.test.ts',
    ]
  }
};

// setup/sequencer.ts
var CustomSequencer = class extends BaseSequencer {
  async sort(files) {
    if (files.length > 1) {
      const list = sequentialTestsList[files[0][0].config.name];
      if (list.only.length > 0) {
        const onlyTests = [];
        for (const sequentialTest of list.only) {
          const testIndex = findIndex(files, ([_, testFile]) => {
            return testFile.endsWith(sequentialTest);
          });
          if (testIndex !== -1) {
            const test = files[testIndex];
            if (test) {
              onlyTests.push(test);
            }
          } else {
            throw new Error(`Non-existent test file "${sequentialTest}" in "only" list`);
          }
        }
        files = onlyTests;
      } else {
        for (const sequentialTest of list.before.slice().reverse()) {
          const testIndex = findIndex(files, ([_, testFile]) => {
            return testFile.endsWith(sequentialTest);
          });
          if (testIndex !== -1) {
            const test = files.splice(testIndex, 1)[0];
            if (test) {
              files.unshift(test);
            }
          } else {
            throw new Error(`Non-existent test file "${sequentialTest}" in "before" list`);
          }
        }
        for (const sequentialTest of list.after) {
          const testIndex = findIndex(files, ([_, testFile]) => {
            return testFile.endsWith(sequentialTest);
          });
          if (testIndex !== -1) {
            const test = files.splice(testIndex, 1)[0];
            if (test) {
              files.push(test);
            }
          } else {
            throw new Error(`Non-existent test file "${sequentialTest}" in "after" list`);
          }
        }
      }
    }
    await fs.writeFile("sequencer-data.json", JSON.stringify({ totalTestsCount: files.length }));
    return files;
  }
};

// vitest.config.ts
var vitest_config_default = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    poolOptions: {
      forks: {
        minForks: 1,
        maxForks: 6
      }
    },
    environment: "./setup/environment.ts",
    sequence: {
      sequencer: CustomSequencer
    },
    testTimeout: 15e3
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJzZXR1cC9zZXF1ZW5jZXIudHMiLCAic2V0dXAvc2VxdWVudGlhbC10ZXN0cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG1lXFxcXHByb2plY3RzXFxcXGRpcmVjdHVzLXVuZXdzXFxcXHRlc3RzXFxcXGJsYWNrYm94XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxtZVxcXFxwcm9qZWN0c1xcXFxkaXJlY3R1cy11bmV3c1xcXFx0ZXN0c1xcXFxibGFja2JveFxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9tZS9wcm9qZWN0cy9kaXJlY3R1cy11bmV3cy90ZXN0cy9ibGFja2JveC92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xyXG5pbXBvcnQgU2VxdWVuY2VyIGZyb20gJy4vc2V0dXAvc2VxdWVuY2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW3RzY29uZmlnUGF0aHMoKV0sXHJcblx0dGVzdDoge1xyXG5cdFx0cG9vbE9wdGlvbnM6IHtcclxuXHRcdFx0Zm9ya3M6IHtcclxuXHRcdFx0XHRtaW5Gb3JrczogMSxcclxuXHRcdFx0XHRtYXhGb3JrczogNixcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRlbnZpcm9ubWVudDogJy4vc2V0dXAvZW52aXJvbm1lbnQudHMnLFxyXG5cdFx0c2VxdWVuY2U6IHtcclxuXHRcdFx0c2VxdWVuY2VyOiBTZXF1ZW5jZXIsXHJcblx0XHR9LFxyXG5cdFx0dGVzdFRpbWVvdXQ6IDE1XzAwMCxcclxuXHR9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxtZVxcXFxwcm9qZWN0c1xcXFxkaXJlY3R1cy11bmV3c1xcXFx0ZXN0c1xcXFxibGFja2JveFxcXFxzZXR1cFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbWVcXFxccHJvamVjdHNcXFxcZGlyZWN0dXMtdW5ld3NcXFxcdGVzdHNcXFxcYmxhY2tib3hcXFxcc2V0dXBcXFxcc2VxdWVuY2VyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9tZS9wcm9qZWN0cy9kaXJlY3R1cy11bmV3cy90ZXN0cy9ibGFja2JveC9zZXR1cC9zZXF1ZW5jZXIudHNcIjtpbXBvcnQgeyBmaW5kSW5kZXggfSBmcm9tICdsb2Rhc2gtZXMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XHJcbmltcG9ydCB7IEJhc2VTZXF1ZW5jZXIsIHR5cGUgV29ya3NwYWNlU3BlYyB9IGZyb20gJ3ZpdGVzdC9ub2RlJztcclxuaW1wb3J0IHsgc2VxdWVudGlhbFRlc3RzTGlzdCB9IGZyb20gJy4vc2VxdWVudGlhbC10ZXN0cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21TZXF1ZW5jZXIgZXh0ZW5kcyBCYXNlU2VxdWVuY2VyIHtcclxuXHRvdmVycmlkZSBhc3luYyBzb3J0KGZpbGVzOiBXb3Jrc3BhY2VTcGVjW10pIHtcclxuXHRcdGlmIChmaWxlcy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdGNvbnN0IGxpc3QgPSBzZXF1ZW50aWFsVGVzdHNMaXN0W2ZpbGVzWzBdIVswXS5jb25maWcubmFtZSBhcyAnZGInIHwgJ2NvbW1vbiddO1xyXG5cclxuXHRcdFx0Ly8gSWYgc3BlY2lmaWVkLCBvbmx5IHJ1biB0aGVzZSB0ZXN0cyBzZXF1ZW50aWFsbHlcclxuXHRcdFx0aWYgKGxpc3Qub25seS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0Y29uc3Qgb25seVRlc3RzID0gW107XHJcblxyXG5cdFx0XHRcdGZvciAoY29uc3Qgc2VxdWVudGlhbFRlc3Qgb2YgbGlzdC5vbmx5KSB7XHJcblx0XHRcdFx0XHRjb25zdCB0ZXN0SW5kZXggPSBmaW5kSW5kZXgoZmlsZXMsIChbXywgdGVzdEZpbGVdKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ZXN0RmlsZS5lbmRzV2l0aChzZXF1ZW50aWFsVGVzdCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGVzdEluZGV4ICE9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gZmlsZXNbdGVzdEluZGV4XTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICh0ZXN0KSB7XHJcblx0XHRcdFx0XHRcdFx0b25seVRlc3RzLnB1c2godGVzdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTm9uLWV4aXN0ZW50IHRlc3QgZmlsZSBcIiR7c2VxdWVudGlhbFRlc3R9XCIgaW4gXCJvbmx5XCIgbGlzdGApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZmlsZXMgPSBvbmx5VGVzdHM7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBzZXF1ZW50aWFsVGVzdCBvZiBsaXN0LmJlZm9yZS5zbGljZSgpLnJldmVyc2UoKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdGVzdEluZGV4ID0gZmluZEluZGV4KGZpbGVzLCAoW18sIHRlc3RGaWxlXSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVzdEZpbGUuZW5kc1dpdGgoc2VxdWVudGlhbFRlc3QpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRlc3RJbmRleCAhPT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGVzdCA9IGZpbGVzLnNwbGljZSh0ZXN0SW5kZXgsIDEpWzBdO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRlc3QpIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlcy51bnNoaWZ0KHRlc3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE5vbi1leGlzdGVudCB0ZXN0IGZpbGUgXCIke3NlcXVlbnRpYWxUZXN0fVwiIGluIFwiYmVmb3JlXCIgbGlzdGApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yIChjb25zdCBzZXF1ZW50aWFsVGVzdCBvZiBsaXN0LmFmdGVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCB0ZXN0SW5kZXggPSBmaW5kSW5kZXgoZmlsZXMsIChbXywgdGVzdEZpbGVdKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0ZXN0RmlsZS5lbmRzV2l0aChzZXF1ZW50aWFsVGVzdCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGVzdEluZGV4ICE9PSAtMSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0ZXN0ID0gZmlsZXMuc3BsaWNlKHRlc3RJbmRleCwgMSlbMF07XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGVzdCkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGVzLnB1c2godGVzdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTm9uLWV4aXN0ZW50IHRlc3QgZmlsZSBcIiR7c2VxdWVudGlhbFRlc3R9XCIgaW4gXCJhZnRlclwiIGxpc3RgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBFeHBvc2Ugc2VxdWVuY2VyIGRhdGEgdG8gc2V0dXAgJiB0ZXN0c1xyXG5cdFx0YXdhaXQgZnMud3JpdGVGaWxlKCdzZXF1ZW5jZXItZGF0YS5qc29uJywgSlNPTi5zdHJpbmdpZnkoeyB0b3RhbFRlc3RzQ291bnQ6IGZpbGVzLmxlbmd0aCB9KSk7XHJcblxyXG5cdFx0cmV0dXJuIGZpbGVzO1xyXG5cdH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG1lXFxcXHByb2plY3RzXFxcXGRpcmVjdHVzLXVuZXdzXFxcXHRlc3RzXFxcXGJsYWNrYm94XFxcXHNldHVwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxtZVxcXFxwcm9qZWN0c1xcXFxkaXJlY3R1cy11bmV3c1xcXFx0ZXN0c1xcXFxibGFja2JveFxcXFxzZXR1cFxcXFxzZXF1ZW50aWFsLXRlc3RzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9tZS9wcm9qZWN0cy9kaXJlY3R1cy11bmV3cy90ZXN0cy9ibGFja2JveC9zZXR1cC9zZXF1ZW50aWFsLXRlc3RzLnRzXCI7Ly8gVGVzdHMgd2lsbCBydW4gc2VxdWVudGlhbGx5IGFjY29yZGluZyB0byB0aGlzIGxpc3RcclxuZXhwb3J0IGNvbnN0IHNlcXVlbnRpYWxUZXN0c0xpc3Q6IFJlY29yZDwnZGInIHwgJ2NvbW1vbicsIFNlcXVlbnRpYWxUZXN0c0xpc3Q+ID0ge1xyXG5cdGNvbW1vbjoge1xyXG5cdFx0YmVmb3JlOiBbJy9jb21tb24vY29tbW9uLnRlc3QudHMnXSxcclxuXHRcdGFmdGVyOiBbXSxcclxuXHRcdC8vIElmIHNwZWNpZmllZCwgb25seSBydW4gdGhlc2UgdGVzdHMgc2VxdWVudGlhbGx5XHJcblx0XHRvbmx5OiBbXHJcblx0XHRcdC8vICcvY29tbW9uL2NvbW1vbi50ZXN0LnRzJyxcclxuXHRcdF0sXHJcblx0fSxcclxuXHRkYjoge1xyXG5cdFx0YmVmb3JlOiBbXHJcblx0XHRcdCcvdGVzdHMvZGIvc2VlZC1kYXRhYmFzZS50ZXN0LnRzJyxcclxuXHRcdFx0Jy9jb21tb24vY29tbW9uLnRlc3QudHMnLFxyXG5cdFx0XHQnL3Rlc3RzL2RiL3JvdXRlcy9zY2hlbWEvc2NoZW1hLnRlc3QudHMnLFxyXG5cdFx0XHQnL3Rlc3RzL2RiL3JvdXRlcy9jb2xsZWN0aW9ucy9jcnVkLnRlc3QudHMnLFxyXG5cdFx0XHQnL3Rlc3RzL2RiL3JvdXRlcy9maWVsZHMvY2hhbmdlLWZpZWxkcy50ZXN0LnRzJyxcclxuXHRcdFx0Jy90ZXN0cy9kYi9yb3V0ZXMvZmllbGRzL2NydWQudGVzdC50cycsXHJcblx0XHRcdCcvdGVzdHMvZGIvcm91dGVzL2l0ZW1zL3ZlcnNpb24udGVzdC50cycsXHJcblx0XHRdLFxyXG5cdFx0YWZ0ZXI6IFtcclxuXHRcdFx0Jy90ZXN0cy9kYi9zY2hlbWEvdGltZXpvbmUvdGltZXpvbmUudGVzdC50cycsXHJcblx0XHRcdCcvdGVzdHMvZGIvc2NoZW1hL3RpbWV6b25lL3RpbWV6b25lLWNoYW5nZWQtbm9kZS10ei1hbWVyaWNhLnRlc3QudHMnLFxyXG5cdFx0XHQnL3Rlc3RzL2RiL3NjaGVtYS90aW1lem9uZS90aW1lem9uZS1jaGFuZ2VkLW5vZGUtdHotYXNpYS50ZXN0LnRzJyxcclxuXHRcdFx0Jy90ZXN0cy9kYi93ZWJzb2NrZXQvYXV0aC50ZXN0LnRzJyxcclxuXHRcdFx0Jy90ZXN0cy9kYi93ZWJzb2NrZXQvZ2VuZXJhbC50ZXN0LnRzJyxcclxuXHRcdFx0Jy90ZXN0cy9kYi9yb3V0ZXMvcGVybWlzc2lvbnMvY2FjaGUtcHVyZ2UudGVzdC50cycsXHJcblx0XHRcdCcvdGVzdHMvZGIvcm91dGVzL2Zsb3dzL3dlYmhvb2sudGVzdC50cycsXHJcblx0XHRcdCcvdGVzdHMvZGIvYXBwL2NhY2hlLnRlc3QudHMnLFxyXG5cdFx0XHQnL3Rlc3RzL2RiL3JvdXRlcy9jb2xsZWN0aW9ucy9zY2hlbWEtY2FjaGUudGVzdC50cycsXHJcblx0XHRdLFxyXG5cdFx0Ly8gSWYgc3BlY2lmaWVkLCBvbmx5IHJ1biB0aGVzZSB0ZXN0cyBzZXF1ZW50aWFsbHlcclxuXHRcdG9ubHk6IFtcclxuXHRcdFx0Ly8gJy90ZXN0cy9kYi9zZWVkLWRhdGFiYXNlLnRlc3QudHMnLFxyXG5cdFx0XHQvLyAnL2NvbW1vbi9jb21tb24udGVzdC50cycsXHJcblx0XHRdLFxyXG5cdH0sXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmV2ZXJzZWRUZXN0SW5kZXgodGVzdEZpbGVQYXRoOiBzdHJpbmcsIHByb2plY3Q6ICdkYicgfCAnY29tbW9uJykge1xyXG5cdGNvbnN0IGxpc3QgPSBzZXF1ZW50aWFsVGVzdHNMaXN0W3Byb2plY3RdO1xyXG5cclxuXHRpZiAobGlzdC5vbmx5Lmxlbmd0aCA+IDApIHtcclxuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lm9ubHkubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdGNvbnN0IG9ubHlUZXN0ID0gbGlzdC5vbmx5W2luZGV4XTtcclxuXHJcblx0XHRcdGlmIChvbmx5VGVzdCAmJiB0ZXN0RmlsZVBhdGguaW5jbHVkZXMob25seVRlc3QpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5iZWZvcmUubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRjb25zdCBiZWZvcmVUZXN0ID0gbGlzdC5iZWZvcmVbaW5kZXhdO1xyXG5cclxuXHRcdGlmIChiZWZvcmVUZXN0ICYmIHRlc3RGaWxlUGF0aC5pbmNsdWRlcyhiZWZvcmVUZXN0KSkge1xyXG5cdFx0XHRyZXR1cm4gaW5kZXg7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGlzdC5hZnRlci5sZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdGNvbnN0IGFmdGVyVGVzdCA9IGxpc3QuYWZ0ZXJbaW5kZXhdO1xyXG5cclxuXHRcdGlmIChhZnRlclRlc3QgJiYgdGVzdEZpbGVQYXRoLmluY2x1ZGVzKGFmdGVyVGVzdCkpIHtcclxuXHRcdFx0cmV0dXJuIDAgLSBsaXN0LmFmdGVyLmxlbmd0aCArIGluZGV4O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpc3QuYmVmb3JlLmxlbmd0aDtcclxufVxyXG5cclxudHlwZSBTZXF1ZW50aWFsVGVzdHNMaXN0ID0ge1xyXG5cdGJlZm9yZTogc3RyaW5nW107XHJcblx0YWZ0ZXI6IHN0cmluZ1tdO1xyXG5cdG9ubHk6IHN0cmluZ1tdO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNVLE9BQU8sbUJBQW1CO0FBQ2hXLFNBQVMsb0JBQW9COzs7QUNEcVQsU0FBUyxpQkFBaUI7QUFDNVcsT0FBTyxRQUFRO0FBQ2YsU0FBUyxxQkFBeUM7OztBQ0QzQyxJQUFNLHNCQUFvRTtBQUFBLEVBQ2hGLFFBQVE7QUFBQSxJQUNQLFFBQVEsQ0FBQyx3QkFBd0I7QUFBQSxJQUNqQyxPQUFPLENBQUM7QUFBQTtBQUFBLElBRVIsTUFBTTtBQUFBO0FBQUEsSUFFTjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNILFFBQVE7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Q7QUFBQTtBQUFBLElBRUEsTUFBTTtBQUFBO0FBQUE7QUFBQSxJQUdOO0FBQUEsRUFDRDtBQUNEOzs7QURoQ0EsSUFBcUIsa0JBQXJCLGNBQTZDLGNBQWM7QUFBQSxFQUMx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
