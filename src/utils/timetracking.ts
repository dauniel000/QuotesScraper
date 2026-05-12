export class TimeTrack {
    private timeStart = 0;

    constructor(private performance: Performance) {
        this.timeStart = this.performance.now();
    }

    async end(): Promise<void> {
        const endTime = this.performance.now();

        const executionTimeMs = endTime - this.timeStart;
        const executionTimeSec = (executionTimeMs / 1000).toFixed(2);

        console.log(`Time spent scraping in seconds: ${executionTimeSec}s`);
    }
}
