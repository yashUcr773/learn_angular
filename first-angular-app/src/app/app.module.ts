import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TaskComponent } from "./components/tasks/task/task.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { CardComponent } from "./components/ui/card/card.component";
import { NewTaskComponent } from "./components/tasks/new-task/new-task.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from "./components/user/user.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [AppComponent, TasksComponent, TaskComponent, NewTaskComponent],
    imports: [BrowserModule, HeaderComponent, UserComponent, CardComponent, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}