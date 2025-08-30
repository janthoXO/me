export interface ProjectEntry {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  link: URL;
  startDate: Date;
  endDate: Date | null;
}