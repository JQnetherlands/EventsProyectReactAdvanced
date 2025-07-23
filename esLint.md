1. Where the pattern is used                    | Glob patterns are resolved **relative to**

1. Where the pattern is used                    | Glob patterns are resolved **relative to**
Great question! Let’s break this down clearly and simply so you fully understand how **ESLint evaluates glob patterns** depending on where they are used:

---

## ✅ What Are Glob Patterns?

Glob patterns are special strings like:

```bash
"build/**/*"
"**/*.test.js"
"!src/ignored.js"
```

They are used to match file paths. ESLint uses them to decide which files or folders to **include or ignore**.

---

## 📍 ESLint Resolves These Patterns *Relative To* Different Places Depending on Context:

### 1. **In `eslint.config.js` with `globalIgnores()`**

👉 ESLint treats the pattern as **relative to where `eslint.config.js` is located**.

**Example:**

```bash
project/
├── eslint.config.js
├── src/
│   └── file.js
```

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["src/**"]), // <- This is resolved relative to this config file
]);
```

✅ ESLint will look for `project/src/**`.

---

### 2. **When Using `--config` to Specify a Custom Config File**

If you run:

```bash
eslint . --config configs/eslint.custom.js
```

Then `globalIgnores()` in that file will be evaluated relative to the **current working directory**, not the config file.

**Example:**

```
project/
├── configs/
│   └── eslint.custom.js
├── src/
```

```js
// configs/eslint.custom.js
export default [
  globalIgnores(["src/**"]), // 🔥 This is resolved relative to CWD (probably the project root)
];
```

So even though the config is inside `configs/`, the pattern is matched from `project/`.

---

### 3. **Using `--ignore-pattern` on the CLI**

When you run:

```bash
eslint . --ignore-pattern "build/**"
```

👉 ESLint matches this **relative to the current working directory** — **not** the config file.

So:

* If you're in `project/`, then `build/**` will ignore `project/build/`

---

## 📌 Summary Table

| Where the pattern is used                    | Glob patterns are resolved **relative to** |
| -------------------------------------------- | ------------------------------------------ |
| `eslint.config.js` with `globalIgnores()`    | The location of `eslint.config.js`         |
| CLI option `--config some/other/config.js`   | The **current working directory**          |
| CLI option `--ignore-pattern "something/**"` | The **current working directory**          |

---

## 💡 Why It Matters

This helps you avoid confusion like:

> “Why isn’t ESLint ignoring my `src/` folder? I wrote `src/**`!”

It may be because:

* You used a config file in a subfolder
* Or ESLint is running from a different directory than you expect

---

Would you like an interactive example using folder structure or ESLint commands? I'm happy to walk you through one!
