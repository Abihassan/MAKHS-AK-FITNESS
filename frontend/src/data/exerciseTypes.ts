export type LocalizedText = Record<string, string>;

export type LocalizedSteps = Record<string, string[]>;

export interface Exercise {
  id: string;
  name: string;
  category: string;
  body_part: string;
  equipment: string;

  instructions?: LocalizedText;
  instruction_steps?: LocalizedSteps;

  muscle_group?: string;
  secondary_muscles?: string[];

  target: string;

  image?: string;
  gif_url?: string;

  media_id?: string;
  created_at?: string;
  attribution?: string;
}