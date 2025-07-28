export interface ReservationCompleteData {
  selectedDate: string | Date;
  selectedTime: string[];
  useType: string[];
  text: string;
  name: string;
  maxCapacity: number;
  contact: string;
  pricePerHour: number;
  totalPrice: number;
  user: {
    nickname: string;
    name: string;
    phone: string;
  };
}
