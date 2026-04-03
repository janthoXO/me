import { NavHeader } from "./components/NavHeader";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { StateProvider } from "./data/state";

function App() {
  return (
    <StateProvider>
      <main className="min-h-screen bg-background text-foreground font-sans">
        <header>
          <NavHeader />
        </header>

        <section>
          <Hero />
        </section>

        <section>
          <Skills />
        </section>

        <section>
          <Experience />
        </section>

        <section>
          <Projects />
        </section>

        <Footer />
      </main>
    </StateProvider>
  );
}

export default App;
