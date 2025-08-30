import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Github,
  Linkedin,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;

}
