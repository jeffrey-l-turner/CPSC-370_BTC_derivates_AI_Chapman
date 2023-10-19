import { log } from './log';
export var MetricLoggerUnit;
(function (MetricLoggerUnit) {
    MetricLoggerUnit["Seconds"] = "Seconds";
    MetricLoggerUnit["Microseconds"] = "Microseconds";
    MetricLoggerUnit["Milliseconds"] = "Milliseconds";
    MetricLoggerUnit["Bytes"] = "Bytes";
    MetricLoggerUnit["Kilobytes"] = "Kilobytes";
    MetricLoggerUnit["Megabytes"] = "Megabytes";
    MetricLoggerUnit["Gigabytes"] = "Gigabytes";
    MetricLoggerUnit["Terabytes"] = "Terabytes";
    MetricLoggerUnit["Bits"] = "Bits";
    MetricLoggerUnit["Kilobits"] = "Kilobits";
    MetricLoggerUnit["Megabits"] = "Megabits";
    MetricLoggerUnit["Gigabits"] = "Gigabits";
    MetricLoggerUnit["Terabits"] = "Terabits";
    MetricLoggerUnit["Percent"] = "Percent";
    MetricLoggerUnit["Count"] = "Count";
    MetricLoggerUnit["BytesPerSecond"] = "Bytes/Second";
    MetricLoggerUnit["KilobytesPerSecond"] = "Kilobytes/Second";
    MetricLoggerUnit["MegabytesPerSecond"] = "Megabytes/Second";
    MetricLoggerUnit["GigabytesPerSecond"] = "Gigabytes/Second";
    MetricLoggerUnit["TerabytesPerSecond"] = "Terabytes/Second";
    MetricLoggerUnit["BitsPerSecond"] = "Bits/Second";
    MetricLoggerUnit["KilobitsPerSecond"] = "Kilobits/Second";
    MetricLoggerUnit["MegabitsPerSecond"] = "Megabits/Second";
    MetricLoggerUnit["GigabitsPerSecond"] = "Gigabits/Second";
    MetricLoggerUnit["TerabitsPerSecond"] = "Terabits/Second";
    MetricLoggerUnit["CountPerSecond"] = "Count/Second";
    MetricLoggerUnit["None"] = "None";
})(MetricLoggerUnit || (MetricLoggerUnit = {}));
export class IMetric {
}
export class MetricLogger extends IMetric {
    constructor(context) {
        super();
        this.log = log.child(context || {});
    }
    putDimensions(dimensions) {
        this.log = this.log.child(dimensions);
    }
    putMetric(key, value, unit) {
        this.log.info({ key, value, unit }, `[Metric]: ${key}: ${value} | ${unit ? unit : ''}`);
    }
}
export let metric = new MetricLogger();
export const setGlobalMetric = (_metric) => {
    metric = _metric;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvbWV0cmljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFNUIsTUFBTSxDQUFOLElBQVksZ0JBNEJYO0FBNUJELFdBQVksZ0JBQWdCO0lBQzFCLHVDQUFtQixDQUFBO0lBQ25CLGlEQUE2QixDQUFBO0lBQzdCLGlEQUE2QixDQUFBO0lBQzdCLG1DQUFlLENBQUE7SUFDZiwyQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBdUIsQ0FBQTtJQUN2QixpQ0FBYSxDQUFBO0lBQ2IseUNBQXFCLENBQUE7SUFDckIseUNBQXFCLENBQUE7SUFDckIseUNBQXFCLENBQUE7SUFDckIseUNBQXFCLENBQUE7SUFDckIsdUNBQW1CLENBQUE7SUFDbkIsbUNBQWUsQ0FBQTtJQUNmLG1EQUErQixDQUFBO0lBQy9CLDJEQUF1QyxDQUFBO0lBQ3ZDLDJEQUF1QyxDQUFBO0lBQ3ZDLDJEQUF1QyxDQUFBO0lBQ3ZDLDJEQUF1QyxDQUFBO0lBQ3ZDLGlEQUE2QixDQUFBO0lBQzdCLHlEQUFxQyxDQUFBO0lBQ3JDLHlEQUFxQyxDQUFBO0lBQ3JDLHlEQUFxQyxDQUFBO0lBQ3JDLHlEQUFxQyxDQUFBO0lBQ3JDLG1EQUErQixDQUFBO0lBQy9CLGlDQUFhLENBQUE7QUFDZixDQUFDLEVBNUJXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUE0QjNCO0FBRUQsTUFBTSxPQUFnQixPQUFPO0NBRzVCO0FBT0QsTUFBTSxPQUFPLFlBQWEsU0FBUSxPQUFPO0lBR3ZDLFlBQVksT0FBdUI7UUFDakMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxhQUFhLENBQUMsVUFBa0M7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sU0FBUyxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBdUI7UUFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQ1gsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUNwQixhQUFhLEdBQUcsS0FBSyxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNuRCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFZLElBQUksWUFBWSxFQUFFLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsT0FBZ0IsRUFBRSxFQUFFO0lBQ2xELE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDbkIsQ0FBQyxDQUFDIn0=