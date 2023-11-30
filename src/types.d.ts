export interface Survey {
  _id?: string;
  title: string;
  description: string;
  status: boolean;
  slug: string;
  questions: Question[];
  startDate: string;
  endDate: string;
  __v?: number;
}

export enum QuestionType {
  Checkbox,
  MultipleOptions,
  OptionsList,
}

export interface Question {
  id?: string;
  title: string;
  type: QuestionType;
  options: Option[];
  required: boolean;
}

export interface Option {
  id?: string;
  title: string;
}

export interface ResponseException {
  message: string;
  error: string;
  statusCode: number;
}

export interface ServerResponse {
  error: boolean;
  message: string;
}

export interface Answer {
  id_question: string;
  response: string[];
}

export interface ChartData {
  labels:   string[];
  datasets: Dataset[];
}

export interface Dataset {
  label:           string;
  data:            number[];
  backgroundColor: string[];
  borderColor:     string[];
  borderWidth:     number;
}

export interface UserInfoAnswers {
  name:    string;
  email:   string;
  answers: UserAnswer[];
}

export interface UserAnswer {
  title:   string;
  options: string[];
}
