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

function getWeekName(weekNumber: number): string {
    const weekNames: Array<string> = [
        'Понедельник', 'Вторник', 'Среда', 'Четверг',
        'Пятница', 'Суббота', 'Воскресенье'
    ];
    return weekNames[weekNumber];
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
            weekName: getWeekName(currentDate.getDate()),
            day: currentDate.getDate(), 
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear()
        };
        days.push(day);
    }
    return days;
}