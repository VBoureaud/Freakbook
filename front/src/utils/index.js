export const displayDate = (dateStr, withHours=false, dateObj=null) => {
    if (!dateStr && !dateObj)
        return '';
    const myDate = !dateObj ? new Date(dateStr) : dateObj;
    const fullDate = ('0' + myDate.getDate()).slice(-2) + '/'
    + ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
    + myDate.getFullYear();
  const fullHours = ('0' + myDate.getHours()).slice(-2) 
    + ':' + ('0' + myDate.getMinutes()).slice(-2)
    + ':' + ('0' + myDate.getSeconds()).slice(-2);
  return fullDate + (withHours ? ' ' + fullHours : '');
}

export const coordToTokenId = (x, y, maxX) => {
    return y * maxX + x;
}

export const dateToSeconds = (dateStr) => {
    const date = new Date(dateStr);
    const seconds = date.getTime() / 1000 / 86400 / 365.25;
    return seconds;
}

export const calculateAge = (birthDate) => {
    birthDate = new Date(birthDate);
    const otherDate = new Date();

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}