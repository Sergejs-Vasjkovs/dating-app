import "numeralize-ru";
const pluralize = require("numeralize-ru").pluralize;

export const displayPostTime = (time) => {
    const postDate = new Date(parseInt(time));
    const date = new Date();
    const differens = date - postDate;
    if (differens < (60 * 1000)) return "1 минуту назад";
    if (differens < (60 * 1000 * 5)) return "5 минут назад";
    if (differens < (60 * 1000 * 10)) return "10 минут назад";
    if (differens < (60 * 1000 * 30)) return "30 минут назад";
    if (differens < (60 * 1000 * 60 * 24)) {
        const hours = new Date(differens).getHours();
        const hoursWord = pluralize(hours, "час", "часа", "часов");
        const min = new Date(differens).getMinutes();
        const minWord = pluralize(min, "минута", "минуты", "минут");
        return hours ? `${hours} ${hoursWord} : ${minWord} ${minWord} назад` : `${minWord} ${minWord} назад`;
    }
    if (differens < (60 * 1000 * 60 * 24 * 365)) {
        const month = new Date(differens).getMonth();
        const monthWord = pluralize(month, "месяц", "месяца", "месяцев");
        const day = new Date(differens).getDay();
        const dayWord = pluralize(day, "день", "дня", "дней");
        return month ? `${month} ${monthWord} ${day ? `и ${day} ${dayWord}` : ``} назад` : `${day} ${dayWord} назад`;
    }
    const year = new Date(differens).getFullYear();
    const yearWord = pluralize(year, "год", "года", "лет");
    return `${year} ${yearWord} назад`;
};
