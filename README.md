# simplePopup
simplePopup is a js library to play with popup

# Download

```sh
yarn add simplePopup
```

# How to use

```js
simplePopup.openWindow(siteurl, width, height, center);
```

siteurl -> The website you want to open
width -> Width of the popup
height -> Height of the popup
center -> If true or not defined, the popup is centered (work with dual screen)

Exemple :
```js
simplePopup.openWindow("http://google.com/", "1080px", "50%");
```

# TODO

- Translate in english
- Add stolen code credits (dual screen compatibility) :)