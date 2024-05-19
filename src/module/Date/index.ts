import { IDay } from './interfaces';

/**
 * @param date 
 * @returns string
 */
export function formatDate(date: Date): string {
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year} г.`;
}

/**
 * Получить название дня недели
 * @param weekNumber 
 * @returns 
 */
export function getWeekName(weekNumber: number): string {
    const weekNames: Array<string> = [
        'Понедельник', 'Вторник', 'Среда', 'Четверг',
        'Пятница', 'Суббота', 'Воскресенье'
    ];
    return weekNames[weekNumber - 1];
}

/**
 * Получить дни
 * @returns Array<string>
 */
export function getDays(date: Date = new Date()): Array<IDay> {
    const days: IDay[] = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date)
        currentDate.setDate(date.getDate() + i)
        const day: IDay = {
            weekNumber: (currentDate.getDay() !== 0) ? currentDate.getDay() : 7,
            day: currentDate.getDate(), 
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            date: currentDate
        };
        days.push(day);
    }
    return days;
}

/**
 * Получить день по дате
 * @param date
 * @returns IDay
 */
export function getDay(date: Date): IDay {
    const currentDate = new Date(date);
    return {
        weekNumber: (currentDate.getDay() !== 0) ? currentDate.getDay() : 7,
        day: currentDate.getDate(), 
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        date: currentDate        
    }
}

/**
 * Получить дату
 * @param date 
 * @returns string YYYY-mm-dd
 */
export function getDate(date: Date): string {
    return date.toLocaleDateString().split('.').reverse().join('-')
}