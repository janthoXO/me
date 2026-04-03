import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../data/state';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';
import type { ExperienceEntry } from '../domain/experience.model';

function formatDate(date: Date | null): string {
  if (date === null) return 'Present';
  if (date instanceof Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }
  return String(date);
}

function calculateDuration(startDate: Date, endDate: Date | null): string {
  const start = new Date(startDate);
  const end = endDate === null ? new Date() : new Date(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    let result = `${years} year${years !== 1 ? 's' : ''}`;
    if (remainingMonths > 0) {
      result += `, ${remainingMonths} month${
        remainingMonths !== 1 ? 's' : ''
      }`;
    }
    return result;
  }
}

export function Experience() {
  const { experienceEntries } = useStateContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const [visibleEntries, setVisibleEntries] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const calculateVisibility = () => {
      const newVisibility: Record<number, boolean> = {};
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      const triggerPoint = windowHeight * 0.7;
      
      experienceEntries.forEach((_: ExperienceEntry, index: number) => {
         const entryOffset = (index + 1) * 200;
         newVisibility[index] = rect.top < triggerPoint - entryOffset;
      });
      setVisibleEntries(newVisibility);
    };

    const handleScroll = () => calculateVisibility();
    window.addEventListener('scroll', handleScroll);
    calculateVisibility(); // initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [experienceEntries]);

  const getEntryAnimationClass = (index: number): string => {
    if (visibleEntries[index]) {
      return index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right';
    }
    return 'opacity-0';
  };

  return (
    <div id="experience" className="container mx-auto py-20" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Experience
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          My professional journey in software development
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full"></div>

        {experienceEntries.map((entry: ExperienceEntry, i: number) => (
          <div
            key={entry.id}
            className={cn(
              "relative flex items-center mb-16 transition-opacity duration-700 ease-out",
              getEntryAnimationClass(i)
            )}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background z-10 shadow-lg">
              <div className="absolute inset-1 bg-primary-foreground rounded-full"></div>
            </div>

            <div
              className={cn(
                "w-[45%] transition-transform duration-500 hover:scale-105",
                i % 2 === 0 ? "text-right" : "ml-auto text-left"
              )}
            >
              <Card className="shadow-lg hover:shadow-xl text-left">
                <CardHeader>
                  <div className={cn("flex", i % 2 === 0 ? "justify-end" : "justify-start")}>
                    <Badge variant="default">
                      {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mt-2">
                    {entry.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold">
                    {entry.subtitle}
                  </CardDescription>
                </CardHeader>
                
                {entry.description && (
                  <CardContent>
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: entry.description }}
                    ></div>
                  </CardContent>
                )}

                <CardFooter className={cn("flex basis-full", i % 2 === 0 ? "justify-end rtl" : "justify-start")}>
                  <div className="flex flex-col">
                    <div className={cn("flex flex-wrap gap-1 mb-2", i % 2 === 0 ? "justify-end" : "justify-start")}>
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className={cn("text-xs text-muted-foreground", i % 2 === 0 ? "text-right" : "text-left")}>
                      {entry.endDate === null ? (
                        <span className="inline-flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Currently Active
                        </span>
                      ) : (
                        <span>
                          Duration: {calculateDuration(entry.startDate, entry.endDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}