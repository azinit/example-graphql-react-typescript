# Structure
Project was structured by [Feature Driven Development](https://www.notion.so/Feature-Driven-Development-dfe306d664ae4780bcf999ccdd15e532).

## Principles
- low coupling
    - **feature** should not depend from **other features**
    - **page** should not depend from **other pages**
    - **shared resources** should not depend from **each other**
- all **needed** resources (store / async effects / components) - locate in `features/` dir
- all **common used**  resources (components / helpers / fixtures) - locate in `shared/` dir
- about **pre-optimization**
    - not need to strive to optimize modules for *changing*
        - because of we can't predict future
    - instead of this - *it's desirable* to optimize their for *deleting*
        - because of it's only one thing we know - that all code transform to chaos =)
        - and it's easier to refactor **totally (clean up)** only few modules, instead of one app totally

> [more details](https://www.notion.so/Summary-YouTube-Feature-Driven-Arhitecture-b8609fd4452b41f499703c841e56b8e9#63dfc5b35e534147b8296e1aa915ad2b)

## Folders
```markdown
└── src/                            # Source files
    ├── app/                        # Base app's resources
    ├── features/                   # Crucial domain splitted app's features
    ├── pages/                      # App's pages (build from features, shared)
    └── shared/                     # Common modules for dev
        ├── components/             #   **Common used** React components
        ├── helpers/                #   **Common used** Helpers
        ├── hocs/                   #   **Common used** React HOCs
        ├── hooks/                  #   **Common used** React Hooks
        ├── fixtures/               #   **Common used** data helpers / dataSets
        ├── get-env                 #   Module with **env**-vars
        ├── mixins.scss             #   **Common used** SCSS mixins
        └── consts.scss             #   **Common used** SCSS consts (not colors)
```

## Feature

**Feature** - a <u>self-contained</u>, <u>user-facing</u>, (maybe) <u>reusable</u> between pages and <u>complex logic</u> contained building block (module).

> More details - [here](https://www.notion.so/Summary-YouTube-Feature-Driven-Arhitecture-b8609fd4452b41f499703c841e56b8e9#18cb1679b2754951ae92627d371d1a88)

```markdown
└── features/
    └── feature-name/
            ├── components/            # UI components (`React`, `Canvas`)
            ├── store/                 # Redux store of component
            │   ├── slice.ts           #    Feature state's `slice`
            │   ├── types.ts           #    Required `types` of slice
            │   ├── selectors.ts       #    `Selector`s of slice
            │   ├── effects.ts         #    `Thunks` with async side-effects
            │   └── helpers.ts         #    Required `helpers`
            ├── {...}/                 # Potentially, you can locate here and other **required** modules (but without fanaticism)
            └── index.ts               # Feature's `entry-point` (with declared public feature's API)
```

## Api
- `src/models.ts` - generated models types from graphql schema
- `src/{path/to/feature}/{query}.gql` - request file (query / mutation) for fetch / post information by server API
- `src/{path/to/feature}/{query}.gen.ts` - **READONLY** module with generated ts code of related request (in same dir with same name)

### Usage:
```tsx
import { useTodoQuery } from "./query.gen";
...
function YourComponent(props: Props) {
    const { data, loading, error } = useTodoQuery({ variables: { id }});
    ...
}
```

> codegen by `@graphql-codegen`, more details in [codegen.yml](/codegen.yml)

#### Assets
Perfectly, all static *assets* files should locate on related components level (**on using level**).

> Because of - generally - there is own **unique** icons collection for every UI area

If you its **very necesary and matter** for you - to have common-used icons, then locate their in `shared` folder (in this case - you can import them from any point of app)

```markdown
└── shared/
      ├── assets/
```

#### Shared
There is public API declaration file (`index.ts`) in all shared modules (with module's API for other modules)

**Recommends to get all needed submodules namely with its**

Other words, if you want to import common component `Loader`:
```ts
// Bad (private module path using)
import Loader from "shared/components/loader";
// Good (API is controlled by module entry-point file)
import { Loader } from "shared/components";
```
