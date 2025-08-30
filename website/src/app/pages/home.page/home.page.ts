import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component/header.component';
import { EducationComponent } from '../../components/education.component/education.component';
import { WorkComponent } from '../../components/work.component/work.component';
import { ProjectsComponent } from '../../components/projects.component/projects.component';
import { FooterComponent } from "../../components/footer.component/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    EducationComponent,
    WorkComponent,
    ProjectsComponent,
    FooterComponent,
],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

}
