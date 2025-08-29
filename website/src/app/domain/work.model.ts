export interface WorkEntry {
  id: number;
  company: string;
  position: string;
  shortDescription: string;
  description: string;
  startDate: Date | null | "PRESENT";
  endDate: Date | null | "PRESENT";
}
