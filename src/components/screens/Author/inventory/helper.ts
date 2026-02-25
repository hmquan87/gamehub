import { AddedDateSort } from "@/constant/enum";

export const getDate = (value: string) => {
    switch (value) {
        case AddedDateSort.AllTime:
            return "All Time";
        case AddedDateSort.Days7:
            return "Last 7 days";
        case AddedDateSort.Days30:
            return "Last 30 days";
        case AddedDateSort.Months6:
            return "Last 6 months";
        default:
            return "Last 12 months";
    }
};