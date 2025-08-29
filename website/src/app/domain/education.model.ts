export interface EducationEntry {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  startDate: Date | null | "PRESENT";
  endDate: Date | null | "PRESENT";
}