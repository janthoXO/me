import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { Button } from './ui/button';
import { useStateContext } from '../data/state';

export function Hero() {
  const { contact } = useStateContext();

  return (
    <div className="text-center pt-32 pb-20">
      <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 animate-fade-in">
        {contact.name}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-delay">
        System Architect & Full-Stack Developer
      </p>

      {/* Contact links */}
      <div className="flex gap-6 justify-center animate-fade-in-delay-2">
        <Button className="rounded-full transition-all hover:scale-105" asChild>
          <a
            href={contact.githubUrl.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <IconBrandGithub className="w-5 h-5" />
            GitHub
          </a>
        </Button>
        <Button variant="secondary" className="rounded-full transition-all hover:scale-105" asChild>
          <a
            href={contact.linkedinUrl.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <IconBrandLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </Button>
      </div>
    </div>
  );
}