export type LocalizedText = Record<
  string,
  string
>;

export type LocalizedSteps = Record<
  string,
  string[]
>;

export interface Exercise {
  id: string | number;
  name: string;

  category: string;
  body_part: string;
  equipment: string;
  target: string;

  muscle_group?: string;
  secondary_muscles?: string[];

  instructions?: LocalizedText;
  instruction_steps?: LocalizedSteps;

  image?: string;
  gif_url?: string;

  media_id?: string;
  created_at?: string;
  attribution?: string;
}
