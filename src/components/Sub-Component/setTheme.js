export default function setTheme() {
    const LightenDarkenColor = (col, amt) => {
        col = col.replace('#', '')
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
    }
    document.documentElement.style.setProperty('--background-color', localStorage['BgColor']);
    document.documentElement.style.setProperty('--color', localStorage['Color']);
    document.documentElement.style.setProperty('--background-color-lighter', '#' + LightenDarkenColor(localStorage['BgColor'], 95));//95
}