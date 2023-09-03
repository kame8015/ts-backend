module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
};
