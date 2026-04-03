export interface ExperienceEntry {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate: Date | null;
}
