import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component/header.component';
import { ProjectsComponent } from '../../components/projects.component/projects.component';
import { FooterComponent } from "../../components/footer.component/footer.component";
import { ExperienceComponent } from "../../components/experience.component/experience.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ProjectsComponent,
    FooterComponent,
    ExperienceComponent
],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

}
