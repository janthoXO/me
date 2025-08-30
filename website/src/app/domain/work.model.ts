export interface WorkEntry {
  id: number;
  company: string;
  position: string;
  shortDescription: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate: Date | null;
}
