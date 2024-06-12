const patternEmail =
    /([a-zA-Z][\w\.\-\_]+[a-zA-Z0-9]@(([a-zA-Z]|[a-zA-Z][\w\.\-\-]*[\w])\.[\w]{2,})+)/g;

const patternTel =
    /((0|\+84|\(\+84\))(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7})/g;
const patternUrl =
    /((https?:\/\/|www\.)((?!www\.|youtube\.com|youtu\.be)[^\s/$.?#].[^\s]*))/g;
const patternYoutubeUrl =
    /(?:https?:\/\/)?(?:www\.)(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})[^\s]*/g;

export const convertRegex = (content) => {
    console.log(content);

    content = content.replace(
        patternEmail,
        `<a class="text-sky-500" href="mailto:$1 " target="_blank" title="Tên miền web: $2">$1</a>`
    );
    content = content.replace(
        patternTel,
        `<a class="text-sky-500" href="tel:$1" target="_blank">$1</a>`
    );
    content = content.replace(
        patternUrl,
        `<a class="text-sky-500" href="$1" target="_blank">$1</a>`
    );

    content = content.replace(
        patternYoutubeUrl,
        `<iframe width="580px" height="315px" src="https://www.youtube.com/embed/$1"frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" class="mb-2"></iframe>`
    );

    content = content.replace(/\n+/g, "\n").replace(/\n/g, "<br> <br>");
    console.log(content);
    return content;
};
