import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit, SimpleChanges,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[libLazyComponent]'
})
export class LazyComponentDirective implements OnChanges {
  @Input() show = true;
  @Input() component: any;
  @Input() inputs: any;
  @Input() outputs: any;

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && this.show) {
      // Clear the view container before creating the component
      this.viewContainerRef?.clear();
      try {
        this.component.then(
          (value: any) => {
            // Select by index the first property of "value"
            const component = value[Object.keys(value)[0]];
            const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(component));

            // Set the input values if args is defined
            if (this.inputs) {
              Object.keys(this.inputs).forEach(x => {
                componentRef.instance[x] = this.inputs[x]
              })
            }


            // Set the output values if outputs are defined
            if (this.outputs) {
              Object.keys(this.outputs).forEach(x => {
                componentRef.instance[x].subscribe((data: any) => {
                  // Execute the function
                  this.outputs[x](data);
                });
              })
            }
          }
        )
      } catch (error) {
        let msg = 'Error in LazyComponentDirective: ' + ((!this.component) ? '| You should import a component as @Input key read the docs for furhter informations |' : '') + error;
        console.error(msg);
      }
    }
  }
}

