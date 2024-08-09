import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from "./components/user/user.component";
import { BrowserModule } from "@angular/platform-browser";
import { TasksModule } from "./components/tasks/tasks.module";
import { SharedModule } from "./components/shared/shared.module";

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [BrowserModule, SharedModule, TasksModule, UserComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}