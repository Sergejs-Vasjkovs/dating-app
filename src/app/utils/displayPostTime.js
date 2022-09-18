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
        const hours = Math.floor(differens / 1000 / 60 / 60);
        const min = Math.floor((differens / 1000 / 60 / 60 - hours) * 60);
        const hoursWord = pluralize(hours, "час", "часа", "часов");
        const minWord = pluralize(min, "минута", "минуты", "минут");
        return hours ? `${hours} ${hoursWord} и ${min} ${minWord} назад` : `${hours} ${hoursWord} назад`;
    }
    if (differens < (60 * 1000 * 60 * 24 * 30)) {
        const day = Math.floor(differens / 1000 / 60 / 60 / 24);
        const hours = Math.floor((differens / 1000 / 60 / 60 / 24 - day) * 24);
        const dayhWord = pluralize(day, "день", "дня", "дней");
        const hoursWord = pluralize(hours, "час", "часа", "часов");
        return day ? `${day} ${dayhWord} ${hours ? `и ${hours} ${hoursWord}` : ``} назад` : `${hours} ${hoursWord} назад`;
    }
    if (differens < (60 * 1000 * 60 * 24 * 365)) {
        const year = Math.floor(differens / 1000 / 60 / 60 / 24 / 365);
        const month = Math.floor((differens / 1000 / 60 / 60 / 24 / 365 - year) * 12);
        const monthWord = pluralize(month, "месяц", "месяца", "месяцев");
        const dayWord = pluralize(year, "день", "дня", "дней");
        return month ? `${month} ${monthWord} ${year ? `и ${year} ${dayWord}` : ``} назад` : `${year} ${dayWord} назад`;
    }
    const year = new Date(differens).getFullYear();
    const yearWord = pluralize(year, "год", "года", "лет");
    return `${year} ${yearWord} назад`;
};
