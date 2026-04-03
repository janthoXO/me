import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useStateContext } from '../data/state';

export function Footer() {
  const { contact } = useStateContext();
  
  return (
    <footer id="contact" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <a
            href={contact.githubUrl.href}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconBrandGithub className="w-6 h-6" />
          </a>
          <a
            href={contact.linkedinUrl.href}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconBrandLinkedin className="w-6 h-6" />
          </a>
        </div>
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {contact.name}. Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}