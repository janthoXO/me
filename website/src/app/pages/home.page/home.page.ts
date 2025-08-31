import { Component } from '@angular/core';
import { NavHeaderComponent } from '../../components/nav-header.component/nav-header.component';
import { HeroComponent } from '../../components/hero.component/hero.component';
import { SkillsComponent } from '../../components/skills.component/skills.component';
import { ExperienceComponent } from "../../components/experience.component/experience.component";
import { ProjectsComponent } from '../../components/projects.component/projects.component';
import { FooterComponent } from "../../components/footer.component/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavHeaderComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    FooterComponent
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

}
