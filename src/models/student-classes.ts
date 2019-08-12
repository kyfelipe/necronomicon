
export interface StudentClasses {
    id: string;
    title: string;
    dates: {
        dateHourBegin: Date;
        dateHourEnd: Date;
    }[];
    dayOfWeek?: string;
    hourClass?: string;
}
