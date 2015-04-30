import {Component, View, bootstrap} from 'angular2/angular2';
import {Sandbox} from 'sandbox';

@Component({
  selector: 'main'
})

@View({
  directives: [Sandbox],
  template: `
    <sandbox></sandbox>
  `
})

class Main {

}

bootstrap(Main);
