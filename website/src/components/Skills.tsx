import { useState } from 'react';
import { useStateContext } from '../data/state';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronDown } from 'lucide-react';
import type { SkillEntry } from '../domain/skill.model';

export function Skills() {
  const { skillEntries } = useStateContext();
  const [isHovered, setIsHovered] = useState(false);

  const getConnectionLineStyle = (index: number, total: number) => {
    if (!isHovered) {
      return {
        width: '0px',
        transform: `rotate(0deg)`,
        opacity: 0,
      };
    }
    const angle = (360 / total) * index;
    return {
      width: '150px',
      transform: `rotate(${angle}deg)`,
      opacity: 0.5,
    };
  };

  const getSkillBubbleStyle = (index: number, total: number) => {
    if (!isHovered) {
      return {
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
      };
    }
    const angle = (360 / total) * index;
    const distance = 150;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;
    return {
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
      opacity: 1,
    };
  };

  return (
    <div id="skills" className="container mx-auto py-20 min-h-screen flex flex-col justify-center">
      {/* Interactive Profile Picture with Skills */}
      <div className="flex justify-center">
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Profile Picture */}
          <Avatar className="w-32 h-32 border-4 border-primary shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 z-20">
            <AvatarImage src="/20240207-profile-pic.jpg" alt="Profile Picture" />
            <AvatarFallback className="bg-primary/20 font-bold text-2xl">DJ</AvatarFallback>
            <div className="absolute inset-0 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
              <span className="text-white text-sm font-medium">Hover for skills</span>
            </div>
          </Avatar>

          {/* Tooltip under profile picture when skills are shown */}
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 transition-all duration-300 mt-4 pointer-events-none z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <div className="bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg text-sm border border-border max-w-xs text-center">
              <div className="font-medium">Hover over each skill to learn more</div>
              <div className="text-xs text-muted-foreground mt-1">
                Each bubble shows detailed information about my expertise
              </div>
              {/* Tooltip arrow */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-popover"></div>
            </div>
          </div>

          {/* Skill Bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {skillEntries.map((skill: SkillEntry, i: number) => (
              <div key={skill.id}>
                {/* Connection Line */}
                <div
                  className="absolute top-1/2 left-1/2 h-px bg-muted-foreground origin-left transition-all duration-500 ease-out"
                  style={getConnectionLineStyle(i, skillEntries.length)}
                ></div>

                {/* Skill Bubble */}
                <div
                  className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-background border border-border shadow-lg cursor-pointer group pointer-events-auto transition-all duration-500 ease-out z-30 hover:scale-125"
                  style={getSkillBubbleStyle(i, skillEntries.length)}
                >
                  <span className="text-xs font-medium text-center leading-tight px-1">
                    {skill.name}
                  </span>

                  {/* Skill tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-xl text-xs border border-border w-max max-w-[200px] pointer-events-none z-40">
                    <div className="font-semibold mb-1 text-[13px]">{skill.name}</div>
                    <div className="text-muted-foreground whitespace-normal leading-relaxed">
                      {skill.description}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center animate-bounce mt-32">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  );
}