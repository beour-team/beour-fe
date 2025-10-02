export interface AvailableTimesResponse {
  code: number;
  httpStatus: string;
  message: string;
  data: {
    timeList: string[];
  };
}
