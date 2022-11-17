# ✨ RNC - Lazy Component   ✨
----------------------------


## Description

>Simple directive to use in components in lazy mode, without losing the use of @Input or @Output



## Installation
>Right now the directive has only been tested on Angular12+ but it should work with older versions as well


```sh
npm i rnc-lazy-component
```

## Inputs

The current developments directive accepts 4 inputs including, outputs, component, inputs and show.

| INPUT | DESCRIPTION | DEFAULT | REQUIRED
| ------ | ------ | ----- | ----- |
| show | If TRUE the component will be loaded | TRUE | YES
| component | The component that we can lazy-load | undefined | NO
| inputs | Object that contain the inputs that we want to pass to the lazy-component | undefined |NO
| outputs | Object that contain the outputs that we want to pass to the lazy-component  | undefined | NO

## Example
>Keep in mind that a complete example will be made using all the library features but that only the "component" input is a mandatory.

#### Parent component.ts
```sh
// DECLARED VARS
   inputs = {NAME_OF_LAZY_COMPONENT_INPUT: 'Hi there!'};
   component;
   output = {NAME_OF_LAZY_COMPONENT_OUTPUT: (data) => this.myFunction1(data), NAME_OF_LAZY_COMPONENT_OUTPUT2: () => this.myFunction2()};
```
```sh
// LOADING OUR LAZY COMPONENT
 loadLazyComponent() {
    this.component = import('./PATH/NAME_OF_THE_COMPONENT.component'); // CHOOSING WHAT COMPONENT WE NEED
    this.show = true; // SHOW ONLY WHEN WE CALL THIS FUNCTION
  }
```
#### Parent component.html
```sh
// LOADING OUR LAZY COMPONENT
<ng-template libLazyComponent [outputs]="output"  [component]="component" [inputs]="inputs"></ng-template>
```

#### Lazy child component.ts
```sh
// DECLARED VARS
  @Input() NAME_OF_LAZY_COMPONENT_INPUT;
  @Output() NAME_OF_LAZY_COMPONENT_OUTPUT = new EventEmitter();
  @Output() NAME_OF_LAZY_COMPONENT_OUTPUT2 = new EventEmitter();
```


#### Lazy child component.html
```sh
<h1>{{NAME_OF_LAZY_COMPONENT_INPUT}}</h1>
```
