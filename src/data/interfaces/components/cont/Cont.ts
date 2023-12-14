export interface ICont {
  time: number;
  handlerTime: (status: boolean) => void;
  status: boolean;
}

export interface IStatusCont {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
