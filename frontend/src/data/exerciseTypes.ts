export interface Exercise {
  id: string | number;
  name: string;
  category: string;
  equipment: string;
  target: string;
  body_part?: string;
  muscle_group?: string;
  secondary_muscles?: string[];
  instructions?: string;
  instruction_steps?: string[];
  image?: string;
  video?: string;
  [key: string]: unknown;
}
