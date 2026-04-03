import { useStateContext } from '../data/state';

export function NavHeader() {
  const { contact } = useStateContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <a href="#">{contact.name}</a>
        </h1>
        <div className="flex gap-6">
          <a
            href="#skills"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Skills
          </a>
          <a
            href="#experience"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}