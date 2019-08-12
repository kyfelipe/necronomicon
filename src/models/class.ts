
export interface Class {
    title: string;
    student: number[];
    classDates: {
        month: number;
        dayOfMonth: number;
        hourBegin: number;
        minuteBegin: number;
        numberOfPeriods: number;
    }[];
}
