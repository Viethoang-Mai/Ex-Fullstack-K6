export const handleDatePicker = (dateExpire, elm) => {
    const date = new Date(dateExpire);
    const dateNow = new Date();
    let difference = (date.getTime() - dateNow.getTime()) / 1000;
    if (difference <= 0) {
        elm.value = "";
        return alert("Vui lòng chọn lại ngày");
    }
    console.log(123);
    const timeDay = Math.floor(difference / 86400);
    const timeHour = Math.floor((difference - timeDay * 86400) / 3600);
    const timeMinute = Math.floor(
        (difference - timeDay * 86400 - timeHour * 3600) / 60
    );
    const timeSecond = Math.floor(
        difference - timeDay * 86400 - timeHour * 3600 - timeMinute * 60
    );
    return alert(`Thời gian còn lại: ${timeDay} ngày ${timeHour} giờ ${timeMinute} phút
    Ngày đăng bài: ${date.toLocaleDateString()} lúc ${date.toLocaleTimeString()}`);
};
