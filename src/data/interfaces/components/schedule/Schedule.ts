export interface ISchedule {
  time: number;
  status: boolean;
  handlerTime: () => void;
}
