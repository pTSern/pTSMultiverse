# 📜 Project Rules

---

## 📁 File Organization

### Naming Conventions

| Type | Convention | Example |
|:-----|:-----------|:--------|
| Regular modules | `kebab-case` | `quick-test.ts` |
| CCComponent files | `PascalCase` | `JoyStick.ts` |

### Module Structure

> ✅ Every module **must** have an `index.ts` that handles all exports.  
> ✅ All imports should go through the module's `index.ts`.  
> ✅ Exported modules use `camelCase` with `p` prefix (e.g., `pDecorator`).

```
project/
├── decorator/
│   ├── index.ts          ← Entry point
│   ├── singleton.ts
│   ├── types.ts
│   └── interfaces.ts
│
├── driver/
│   └── index.ts          ← Entry point
│
└── index.ts              ← Exports `decorator` as `pDecorator`
                             to avoid conflict with `cc` module
```

---

## ✍️ Coding Styles

### Non-CCComponent Classes

> Use `snake_case` as the primary convention.

| Scope | Prefix | Example |
|:------|:-------|:--------|
| Public | — | `number_count` |
| Private / Protected | `_` | `_number_count` |

### CCComponent Classes

> Use `camelCase` as the primary convention.

| Scope | Prefix | Example |
|:------|:-------|:--------|
| Public | — | `myVariable` |
| Private / Protected | `_` | `_myVariable` |
