// dinh nghia object Render
var F8 = {
    createElement: function (name, props = {}, ...children) {
        var element = document.createElement(name);
        Object.keys(props).forEach(function (key) {
            if (key.startsWith("on")) {
                var eventName = key.replace("on", "").toLowerCase().trim();
                element.addEventListener(eventName, props[key]);
            } else {
                element[key] = props[key];
            }
        });
        if (children.length) {
            children.forEach(function (item) {
                element.append(item);
            });
        }
        return element;
    },
};
var F8DOM = {
    render: function (rootEl, node) {
        rootEl.append(node);
    },
};
