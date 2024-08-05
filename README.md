## Backend-node

### Build

```shell
pnpm build
```

### Launch CLI

```shell
node dist/src/index.js <command> <args>
```

### launch test

```shell
pnpm test
```

### Step 3

- For code quality, you can use some tools : which one and why (in a few words) ?

For code quality I would use eslint and prettier. Eslint to guarantee some common rules and good practice of to all devs. And prettier to have a good looking formated code in the editor, so it will more comfortable to work with

- you can consider to setup a ci/cd process : describe the necessary actions in a few words

Necessary actions would be to run test check if they pass.
If the tests pass, build the app and then deploy the app.
