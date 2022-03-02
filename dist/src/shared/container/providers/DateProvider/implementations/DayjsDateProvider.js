"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
class DayjsDateProvider {
    dateNow() {
        return (0, dayjs_1.default)().toDate();
    }
    convertToUTC(date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    }
    compareInHours(start_date, end_date) {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, "hours");
    }
    compareInDays(start_date, end_date) {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(end_date_utc).diff(start_date_utc, "days");
    }
    addDays(days) {
        return (0, dayjs_1.default)().add(days, "days").toDate();
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
