# nng-course-enroll



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default |
| --------- | --------- | ----------- | --------- | ------- |
| `courses` | `courses` |             | `any`     | `[]`    |
| `saved`   | `saved`   |             | `boolean` | `false` |


## Events

| Event  | Description | Type                   |
| ------ | ----------- | ---------------------- |
| `save` |             | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [nng-course-card](../nng-course-card)

### Graph
```mermaid
graph TD;
  nng-course-enroll --> nng-course-card
  style nng-course-enroll fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
