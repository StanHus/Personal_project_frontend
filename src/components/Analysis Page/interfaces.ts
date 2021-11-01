export interface IExercise {
  user_email: string;
  exercise_name: string;
  total_weight: number;
  date: string;
}
export interface IAnalysis {
  user_email: string;
  exercise_name: string;
  total_weight: number;
  days_trained: number;
  average_total_weight: number;
  average_weight: number;
  average_sets: number;
  average_reps: number;
  min_session: number;
  max_session: number;
}

export interface IListItem {
  user_email: string;
  exercise_name: string;
}

export interface IListMuscleGroup {
  user_email: string;
  muscle_group: string;
}

export interface IEntry {
  user_email: string;
  session_id: number;
  date: string;
  muscle_group: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight: number;
}
