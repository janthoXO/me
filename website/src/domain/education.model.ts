export interface EducationEntry {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate: Date | null; // null represents ongoing education
}