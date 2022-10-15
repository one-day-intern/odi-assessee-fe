import { dateFormatter } from "./dateFormatter";

describe("Date formatter utility function test suite", () => {
    test("testing normal relative date", () => {
        const beforeDate = new Date(Date.now());
        const formattedDate = dateFormatter(beforeDate);
        
        expect(typeof formattedDate).toBe("string")
    })
    test("testing same day date (AM)", () => {
        const nowDate = new Date("2022-04-15T12:00:00");
        const beforeDate = new Date("2022-04-15T11:00:00");
        const formattedDate = dateFormatter(beforeDate, nowDate);
        
        expect(formattedDate).toBe("11:00 AM");
    })
    test("testing same day date (PM)", () => {
        const nowDate = new Date("2022-04-15T23:00:00");
        const beforeDate = new Date("2022-04-15T22:00:00");
        const formattedDate = dateFormatter(beforeDate, nowDate);
        
        expect(formattedDate).toBe("10:00 PM");
    })
    test("testing same year date", () => {
        const nowDate = new Date("2022-04-15");
        const beforeDate = new Date("2022-02-15");
        const formattedDate = dateFormatter(beforeDate, nowDate);
        
        expect(formattedDate).toBe("Feb 15");
    })
    test("testing different year date", () => {
        const nowDate = new Date("2022-04-15");
        const beforeDate = new Date("2021-04-15");
        const formattedDate = dateFormatter(beforeDate, nowDate);

        expect(formattedDate).toBe("15/04/21");
    })
    test("testing different day but within 24 hours date", () => {
        const nowDate = new Date("2022-04-16T00:00:00");
        const beforeDate = new Date("2022-04-15T23:00:00");
        const formattedDate = dateFormatter(beforeDate, nowDate);

        expect(formattedDate).toBe("Apr 15");
    })
})