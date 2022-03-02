interface IDateProvider {
    dateNow(): Date;
    convertToUTC(date: Date): string;
    compareInHours(start_date: Date, end_date: Date): number;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIsBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
