import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";

@NgModule({
    imports: [CardComponent],
    exports: [CardComponent]
})
export class SharedModule {

}