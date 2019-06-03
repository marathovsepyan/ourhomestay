import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "fontFamily": "sans-serif",
        "MsTextSizeAdjust": "100%",
        "WebkitTextSizeAdjust": "100%",
        "fontSize": 10,
        "WebkitTapHighlightColor": "rgba(0,0,0,0)"
    },
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": 1.42857143,
        "fontFamily": "source_sans_proregular,sans-serif",
        "color": "#333434",
        "fontSize": 13,
        "backgroundColor": "#fff"
    },
    "article": {
        "display": "block"
    },
    "aside": {
        "display": "block"
    },
    "details": {
        "display": "block"
    },
    "figcaption": {
        "display": "block"
    },
    "figure": {
        "display": "block",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "footer": {
        "display": "block",
        "backgroundColor": "#303032",
        "paddingTop": 60,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "header": {
        "display": "block",
        "borderLeft": "solid 5px #f3291b"
    },
    "hgroup": {
        "display": "block"
    },
    "main": {
        "display": "block"
    },
    "menu": {
        "display": "block"
    },
    "nav": {
        "display": "block",
        "marginBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "section": {
        "display": "block"
    },
    "summary": {
        "display": "block"
    },
    "audio": {
        "display": "inline-block",
        "verticalAlign": "baseline"
    },
    "canvas": {
        "display": "inline-block",
        "verticalAlign": "baseline"
    },
    "progress": {
        "display": "inline-block",
        "verticalAlign": "baseline",
        "overflow": "hidden",
        "height": 20,
        "marginBottom": 20,
        "backgroundColor": "#f5f5f5",
        "borderRadius": 4,
        "WebkitBoxShadow": "inset 0 1px 2px rgba(0,0,0,.1)",
        "boxShadow": "inset 0 1px 2px rgba(0,0,0,.1)"
    },
    "video": {
        "display": "inline-block",
        "verticalAlign": "baseline"
    },
    "audio:not([controls])": {
        "display": "none",
        "height": 0
    },
    "[hidden]": {
        "display": "none"
    },
    "template": {
        "display": "none"
    },
    "a": {
        "backgroundColor": "transparent",
        "textDecoration": "none",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "color": "#000"
    },
    "a:active": {
        "outline": 0,
        "color": "#f3291b",
        "textDecoration": "none"
    },
    "a:hover": {
        "outline": "0!important",
        "textDecoration": "none",
        "color": "#f3291b"
    },
    "b": {
        "fontWeight": "700"
    },
    "strong": {
        "fontWeight": "700"
    },
    "dfn": {
        "fontStyle": "italic"
    },
    "mark": {
        "background": "#ff0",
        "color": "#000",
        "backgroundColor": "#fcf8e3",
        "paddingTop": 0.2,
        "paddingRight": 0.2,
        "paddingBottom": 0.2,
        "paddingLeft": 0.2
    },
    "sub": {
        "fontSize": "75%",
        "lineHeight": 0,
        "position": "relative",
        "verticalAlign": "baseline",
        "bottom": -0.25
    },
    "sup": {
        "fontSize": "75%",
        "lineHeight": 0,
        "position": "relative",
        "verticalAlign": "baseline",
        "top": -0.5
    },
    "img": {
        "border": 0,
        "verticalAlign": "middle",
        "maxWidth": "100%"
    },
    "svg:not(:root)": {
        "overflow": "hidden"
    },
    "hr": {
        "boxSizing": "content-box",
        "height": 0,
        "marginTop": 20,
        "marginBottom": 20,
        "border": 0,
        "borderTop": "1px solid #eee"
    },
    "pre": {
        "overflow": "auto",
        "fontSize": 13,
        "fontFamily": "Menlo,Monaco,Consolas,\"Courier New\",monospace",
        "display": "block",
        "paddingTop": 9.5,
        "paddingRight": 9.5,
        "paddingBottom": 9.5,
        "paddingLeft": 9.5,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0,
        "lineHeight": 1.42857143,
        "wordBreak": "break-all",
        "wordWrap": "break-word",
        "color": "#333",
        "backgroundColor": "#f5f5f5",
        "border": "1px solid #ccc",
        "borderRadius": 4
    },
    "code": {
        "fontSize": "90%",
        "fontFamily": "Menlo,Monaco,Consolas,\"Courier New\",monospace",
        "paddingTop": 2,
        "paddingRight": 4,
        "paddingBottom": 2,
        "paddingLeft": 4,
        "color": "#c7254e",
        "backgroundColor": "#f9f2f4",
        "borderRadius": 4
    },
    "kbd": {
        "fontSize": "90%",
        "fontFamily": "Menlo,Monaco,Consolas,\"Courier New\",monospace",
        "paddingTop": 2,
        "paddingRight": 4,
        "paddingBottom": 2,
        "paddingLeft": 4,
        "color": "#fff",
        "backgroundColor": "#333",
        "borderRadius": 3,
        "boxShadow": "inset 0 -1px 0 rgba(0,0,0,.25)"
    },
    "samp": {
        "fontSize": 1,
        "fontFamily": "Menlo,Monaco,Consolas,\"Courier New\",monospace"
    },
    "button": {
        "color": "inherit",
        "font": "inherit",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "visible",
        "textTransform": "none",
        "WebkitAppearance": "button",
        "cursor": "pointer",
        "fontFamily": "inherit",
        "fontSize": "inherit",
        "lineHeight": "inherit",
        "backgroundColor": "transparent",
        "border": "none",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "input": {
        "color": "inherit",
        "font": "inherit",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontFamily": "inherit",
        "fontSize": "inherit",
        "lineHeight": "inherit"
    },
    "optgroup": {
        "color": "inherit",
        "font": "inherit",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontWeight": "700"
    },
    "select": {
        "color": "inherit",
        "font": "inherit",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "textTransform": "none",
        "fontFamily": "inherit",
        "fontSize": "inherit",
        "lineHeight": "inherit",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "textarea": {
        "color": "inherit",
        "font": "inherit",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "auto",
        "fontFamily": "inherit",
        "fontSize": "inherit",
        "lineHeight": "inherit"
    },
    "html input[type=button]": {
        "WebkitAppearance": "button",
        "cursor": "pointer"
    },
    "input[type=reset]": {
        "WebkitAppearance": "button",
        "cursor": "pointer"
    },
    "input[type=submit]": {
        "WebkitAppearance": "button",
        "cursor": "pointer"
    },
    "button[disabled]": {
        "cursor": "default"
    },
    "html input[disabled]": {
        "cursor": "default"
    },
    "button::-moz-focus-inner": {
        "border": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "input::-moz-focus-inner": {
        "border": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "input[type=checkbox]": {
        "boxSizing": "border-box",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": "1px \\9",
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": "normal",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "input[type=radio]": {
        "boxSizing": "border-box",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": "1px \\9",
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": "normal",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "input[type=number]::-webkit-inner-spin-button": {
        "height": "auto"
    },
    "input[type=number]::-webkit-outer-spin-button": {
        "height": "auto"
    },
    "input[type=search]::-webkit-search-cancel-button": {
        "WebkitAppearance": "none"
    },
    "input[type=search]::-webkit-search-decoration": {
        "WebkitAppearance": "none"
    },
    "table": {
        "borderCollapse": "collapse",
        "borderSpacing": 0,
        "backgroundColor": "transparent",
        "width": "100%",
        "maxWidth": "100%",
        "marginBottom": 20
    },
    "td": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "th": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "textAlign": "left"
    },
    "glyphicon": {
        "position": "relative",
        "top": 1,
        "display": "inline-block",
        "fontFamily": "'Glyphicons Halflings'",
        "fontStyle": "normal",
        "fontWeight": "400",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "glyphicon-asterisk:before": {
        "content": "\\002a"
    },
    "glyphicon-plus:before": {
        "content": "\\002b"
    },
    "glyphicon-eur:before": {
        "content": "\\20ac"
    },
    "glyphicon-euro:before": {
        "content": "\\20ac"
    },
    "glyphicon-minus:before": {
        "content": "\\2212"
    },
    "glyphicon-cloud:before": {
        "content": "\\2601"
    },
    "glyphicon-envelope:before": {
        "content": "\\2709"
    },
    "glyphicon-pencil:before": {
        "content": "\\270f"
    },
    "glyphicon-glass:before": {
        "content": "\\e001"
    },
    "glyphicon-music:before": {
        "content": "\\e002"
    },
    "glyphicon-search:before": {
        "content": "\\e003"
    },
    "glyphicon-heart:before": {
        "content": "\\e005"
    },
    "glyphicon-star:before": {
        "content": "\\e006"
    },
    "glyphicon-star-empty:before": {
        "content": "\\e007"
    },
    "glyphicon-user:before": {
        "content": "\\e008"
    },
    "glyphicon-film:before": {
        "content": "\\e009"
    },
    "glyphicon-th-large:before": {
        "content": "\\e010"
    },
    "glyphicon-th:before": {
        "content": "\\e011"
    },
    "glyphicon-th-list:before": {
        "content": "\\e012"
    },
    "glyphicon-ok:before": {
        "content": "\\e013"
    },
    "glyphicon-remove:before": {
        "content": "\\e014"
    },
    "glyphicon-zoom-in:before": {
        "content": "\\e015"
    },
    "glyphicon-zoom-out:before": {
        "content": "\\e016"
    },
    "glyphicon-off:before": {
        "content": "\\e017"
    },
    "glyphicon-signal:before": {
        "content": "\\e018"
    },
    "glyphicon-cog:before": {
        "content": "\\e019"
    },
    "glyphicon-trash:before": {
        "content": "\\e020"
    },
    "glyphicon-home:before": {
        "content": "\\e021"
    },
    "glyphicon-file:before": {
        "content": "\\e022"
    },
    "glyphicon-time:before": {
        "content": "\\e023"
    },
    "glyphicon-road:before": {
        "content": "\\e024"
    },
    "glyphicon-download-alt:before": {
        "content": "\\e025"
    },
    "glyphicon-download:before": {
        "content": "\\e026"
    },
    "glyphicon-upload:before": {
        "content": "\\e027"
    },
    "glyphicon-inbox:before": {
        "content": "\\e028"
    },
    "glyphicon-play-circle:before": {
        "content": "\\e029"
    },
    "glyphicon-repeat:before": {
        "content": "\\e030"
    },
    "glyphicon-refresh:before": {
        "content": "\\e031"
    },
    "glyphicon-list-alt:before": {
        "content": "\\e032"
    },
    "glyphicon-lock:before": {
        "content": "\\e033"
    },
    "glyphicon-flag:before": {
        "content": "\\e034"
    },
    "glyphicon-headphones:before": {
        "content": "\\e035"
    },
    "glyphicon-volume-off:before": {
        "content": "\\e036"
    },
    "glyphicon-volume-down:before": {
        "content": "\\e037"
    },
    "glyphicon-volume-up:before": {
        "content": "\\e038"
    },
    "glyphicon-qrcode:before": {
        "content": "\\e039"
    },
    "glyphicon-barcode:before": {
        "content": "\\e040"
    },
    "glyphicon-tag:before": {
        "content": "\\e041"
    },
    "glyphicon-tags:before": {
        "content": "\\e042"
    },
    "glyphicon-book:before": {
        "content": "\\e043"
    },
    "glyphicon-bookmark:before": {
        "content": "\\e044"
    },
    "glyphicon-print:before": {
        "content": "\\e045"
    },
    "glyphicon-camera:before": {
        "content": "\\e046"
    },
    "glyphicon-font:before": {
        "content": "\\e047"
    },
    "glyphicon-bold:before": {
        "content": "\\e048"
    },
    "glyphicon-italic:before": {
        "content": "\\e049"
    },
    "glyphicon-text-height:before": {
        "content": "\\e050"
    },
    "glyphicon-text-width:before": {
        "content": "\\e051"
    },
    "glyphicon-align-left:before": {
        "content": "\\e052"
    },
    "glyphicon-align-center:before": {
        "content": "\\e053"
    },
    "glyphicon-align-right:before": {
        "content": "\\e054"
    },
    "glyphicon-align-justify:before": {
        "content": "\\e055"
    },
    "glyphicon-list:before": {
        "content": "\\e056"
    },
    "glyphicon-indent-left:before": {
        "content": "\\e057"
    },
    "glyphicon-indent-right:before": {
        "content": "\\e058"
    },
    "glyphicon-facetime-video:before": {
        "content": "\\e059"
    },
    "glyphicon-picture:before": {
        "content": "\\e060"
    },
    "glyphicon-map-marker:before": {
        "content": "\\e062"
    },
    "glyphicon-adjust:before": {
        "content": "\\e063"
    },
    "glyphicon-tint:before": {
        "content": "\\e064"
    },
    "glyphicon-edit:before": {
        "content": "\\e065"
    },
    "glyphicon-share:before": {
        "content": "\\e066"
    },
    "glyphicon-check:before": {
        "content": "\\e067"
    },
    "glyphicon-move:before": {
        "content": "\\e068"
    },
    "glyphicon-step-backward:before": {
        "content": "\\e069"
    },
    "glyphicon-fast-backward:before": {
        "content": "\\e070"
    },
    "glyphicon-backward:before": {
        "content": "\\e071"
    },
    "glyphicon-play:before": {
        "content": "\\e072"
    },
    "glyphicon-pause:before": {
        "content": "\\e073"
    },
    "glyphicon-stop:before": {
        "content": "\\e074"
    },
    "glyphicon-forward:before": {
        "content": "\\e075"
    },
    "glyphicon-fast-forward:before": {
        "content": "\\e076"
    },
    "glyphicon-step-forward:before": {
        "content": "\\e077"
    },
    "glyphicon-eject:before": {
        "content": "\\e078"
    },
    "glyphicon-chevron-left:before": {
        "content": "\\e079"
    },
    "glyphicon-chevron-right:before": {
        "content": "\\e080"
    },
    "glyphicon-plus-sign:before": {
        "content": "\\e081"
    },
    "glyphicon-minus-sign:before": {
        "content": "\\e082"
    },
    "glyphicon-remove-sign:before": {
        "content": "\\e083"
    },
    "glyphicon-ok-sign:before": {
        "content": "\\e084"
    },
    "glyphicon-question-sign:before": {
        "content": "\\e085"
    },
    "glyphicon-info-sign:before": {
        "content": "\\e086"
    },
    "glyphicon-screenshot:before": {
        "content": "\\e087"
    },
    "glyphicon-remove-circle:before": {
        "content": "\\e088"
    },
    "glyphicon-ok-circle:before": {
        "content": "\\e089"
    },
    "glyphicon-ban-circle:before": {
        "content": "\\e090"
    },
    "glyphicon-arrow-left:before": {
        "content": "\\e091"
    },
    "glyphicon-arrow-right:before": {
        "content": "\\e092"
    },
    "glyphicon-arrow-up:before": {
        "content": "\\e093"
    },
    "glyphicon-arrow-down:before": {
        "content": "\\e094"
    },
    "glyphicon-share-alt:before": {
        "content": "\\e095"
    },
    "glyphicon-resize-full:before": {
        "content": "\\e096"
    },
    "glyphicon-resize-small:before": {
        "content": "\\e097"
    },
    "glyphicon-exclamation-sign:before": {
        "content": "\\e101"
    },
    "glyphicon-gift:before": {
        "content": "\\e102"
    },
    "glyphicon-leaf:before": {
        "content": "\\e103"
    },
    "glyphicon-fire:before": {
        "content": "\\e104"
    },
    "glyphicon-eye-open:before": {
        "content": "\\e105"
    },
    "glyphicon-eye-close:before": {
        "content": "\\e106"
    },
    "glyphicon-warning-sign:before": {
        "content": "\\e107"
    },
    "glyphicon-plane:before": {
        "content": "\\e108"
    },
    "glyphicon-calendar:before": {
        "content": "\\e109"
    },
    "glyphicon-random:before": {
        "content": "\\e110"
    },
    "glyphicon-comment:before": {
        "content": "\\e111"
    },
    "glyphicon-magnet:before": {
        "content": "\\e112"
    },
    "glyphicon-chevron-up:before": {
        "content": "\\e113"
    },
    "glyphicon-chevron-down:before": {
        "content": "\\e114"
    },
    "glyphicon-retweet:before": {
        "content": "\\e115"
    },
    "glyphicon-shopping-cart:before": {
        "content": "\\e116"
    },
    "glyphicon-folder-close:before": {
        "content": "\\e117"
    },
    "glyphicon-folder-open:before": {
        "content": "\\e118"
    },
    "glyphicon-resize-vertical:before": {
        "content": "\\e119"
    },
    "glyphicon-resize-horizontal:before": {
        "content": "\\e120"
    },
    "glyphicon-hdd:before": {
        "content": "\\e121"
    },
    "glyphicon-bullhorn:before": {
        "content": "\\e122"
    },
    "glyphicon-bell:before": {
        "content": "\\e123"
    },
    "glyphicon-certificate:before": {
        "content": "\\e124"
    },
    "glyphicon-thumbs-up:before": {
        "content": "\\e125"
    },
    "glyphicon-thumbs-down:before": {
        "content": "\\e126"
    },
    "glyphicon-hand-right:before": {
        "content": "\\e127"
    },
    "glyphicon-hand-left:before": {
        "content": "\\e128"
    },
    "glyphicon-hand-up:before": {
        "content": "\\e129"
    },
    "glyphicon-hand-down:before": {
        "content": "\\e130"
    },
    "glyphicon-circle-arrow-right:before": {
        "content": "\\e131"
    },
    "glyphicon-circle-arrow-left:before": {
        "content": "\\e132"
    },
    "glyphicon-circle-arrow-up:before": {
        "content": "\\e133"
    },
    "glyphicon-circle-arrow-down:before": {
        "content": "\\e134"
    },
    "glyphicon-globe:before": {
        "content": "\\e135"
    },
    "glyphicon-wrench:before": {
        "content": "\\e136"
    },
    "glyphicon-tasks:before": {
        "content": "\\e137"
    },
    "glyphicon-filter:before": {
        "content": "\\e138"
    },
    "glyphicon-briefcase:before": {
        "content": "\\e139"
    },
    "glyphicon-fullscreen:before": {
        "content": "\\e140"
    },
    "glyphicon-dashboard:before": {
        "content": "\\e141"
    },
    "glyphicon-paperclip:before": {
        "content": "\\e142"
    },
    "glyphicon-heart-empty:before": {
        "content": "\\e143"
    },
    "glyphicon-link:before": {
        "content": "\\e144"
    },
    "glyphicon-phone:before": {
        "content": "\\e145"
    },
    "glyphicon-pushpin:before": {
        "content": "\\e146"
    },
    "glyphicon-usd:before": {
        "content": "\\e148"
    },
    "glyphicon-gbp:before": {
        "content": "\\e149"
    },
    "glyphicon-sort:before": {
        "content": "\\e150"
    },
    "glyphicon-sort-by-alphabet:before": {
        "content": "\\e151"
    },
    "glyphicon-sort-by-alphabet-alt:before": {
        "content": "\\e152"
    },
    "glyphicon-sort-by-order:before": {
        "content": "\\e153"
    },
    "glyphicon-sort-by-order-alt:before": {
        "content": "\\e154"
    },
    "glyphicon-sort-by-attributes:before": {
        "content": "\\e155"
    },
    "glyphicon-sort-by-attributes-alt:before": {
        "content": "\\e156"
    },
    "glyphicon-unchecked:before": {
        "content": "\\e157"
    },
    "glyphicon-expand:before": {
        "content": "\\e158"
    },
    "glyphicon-collapse-down:before": {
        "content": "\\e159"
    },
    "glyphicon-collapse-up:before": {
        "content": "\\e160"
    },
    "glyphicon-log-in:before": {
        "content": "\\e161"
    },
    "glyphicon-flash:before": {
        "content": "\\e162"
    },
    "glyphicon-log-out:before": {
        "content": "\\e163"
    },
    "glyphicon-new-window:before": {
        "content": "\\e164"
    },
    "glyphicon-record:before": {
        "content": "\\e165"
    },
    "glyphicon-save:before": {
        "content": "\\e166"
    },
    "glyphicon-open:before": {
        "content": "\\e167"
    },
    "glyphicon-saved:before": {
        "content": "\\e168"
    },
    "glyphicon-import:before": {
        "content": "\\e169"
    },
    "glyphicon-export:before": {
        "content": "\\e170"
    },
    "glyphicon-send:before": {
        "content": "\\e171"
    },
    "glyphicon-floppy-disk:before": {
        "content": "\\e172"
    },
    "glyphicon-floppy-saved:before": {
        "content": "\\e173"
    },
    "glyphicon-floppy-remove:before": {
        "content": "\\e174"
    },
    "glyphicon-floppy-save:before": {
        "content": "\\e175"
    },
    "glyphicon-floppy-open:before": {
        "content": "\\e176"
    },
    "glyphicon-credit-card:before": {
        "content": "\\e177"
    },
    "glyphicon-transfer:before": {
        "content": "\\e178"
    },
    "glyphicon-cutlery:before": {
        "content": "\\e179"
    },
    "glyphicon-header:before": {
        "content": "\\e180"
    },
    "glyphicon-compressed:before": {
        "content": "\\e181"
    },
    "glyphicon-earphone:before": {
        "content": "\\e182"
    },
    "glyphicon-phone-alt:before": {
        "content": "\\e183"
    },
    "glyphicon-tower:before": {
        "content": "\\e184"
    },
    "glyphicon-stats:before": {
        "content": "\\e185"
    },
    "glyphicon-sd-video:before": {
        "content": "\\e186"
    },
    "glyphicon-hd-video:before": {
        "content": "\\e187"
    },
    "glyphicon-subtitles:before": {
        "content": "\\e188"
    },
    "glyphicon-sound-stereo:before": {
        "content": "\\e189"
    },
    "glyphicon-sound-dolby:before": {
        "content": "\\e190"
    },
    "glyphicon-sound-5-1:before": {
        "content": "\\e191"
    },
    "glyphicon-sound-6-1:before": {
        "content": "\\e192"
    },
    "glyphicon-sound-7-1:before": {
        "content": "\\e193"
    },
    "glyphicon-copyright-mark:before": {
        "content": "\\e194"
    },
    "glyphicon-registration-mark:before": {
        "content": "\\e195"
    },
    "glyphicon-cloud-download:before": {
        "content": "\\e197"
    },
    "glyphicon-cloud-upload:before": {
        "content": "\\e198"
    },
    "glyphicon-tree-conifer:before": {
        "content": "\\e199"
    },
    "glyphicon-tree-deciduous:before": {
        "content": "\\e200"
    },
    "glyphicon-cd:before": {
        "content": "\\e201"
    },
    "glyphicon-save-file:before": {
        "content": "\\e202"
    },
    "glyphicon-open-file:before": {
        "content": "\\e203"
    },
    "glyphicon-level-up:before": {
        "content": "\\e204"
    },
    "glyphicon-copy:before": {
        "content": "\\e205"
    },
    "glyphicon-paste:before": {
        "content": "\\e206"
    },
    "glyphicon-alert:before": {
        "content": "\\e209"
    },
    "glyphicon-equalizer:before": {
        "content": "\\e210"
    },
    "glyphicon-king:before": {
        "content": "\\e211"
    },
    "glyphicon-queen:before": {
        "content": "\\e212"
    },
    "glyphicon-pawn:before": {
        "content": "\\e213"
    },
    "glyphicon-bishop:before": {
        "content": "\\e214"
    },
    "glyphicon-knight:before": {
        "content": "\\e215"
    },
    "glyphicon-baby-formula:before": {
        "content": "\\e216"
    },
    "glyphicon-tent:before": {
        "content": "\\26fa"
    },
    "glyphicon-blackboard:before": {
        "content": "\\e218"
    },
    "glyphicon-bed:before": {
        "content": "\\e219"
    },
    "glyphicon-apple:before": {
        "content": "\\f8ff"
    },
    "glyphicon-erase:before": {
        "content": "\\e221"
    },
    "glyphicon-hourglass:before": {
        "content": "\\231b"
    },
    "glyphicon-lamp:before": {
        "content": "\\e223"
    },
    "glyphicon-duplicate:before": {
        "content": "\\e224"
    },
    "glyphicon-piggy-bank:before": {
        "content": "\\e225"
    },
    "glyphicon-scissors:before": {
        "content": "\\e226"
    },
    "glyphicon-bitcoin:before": {
        "content": "\\e227"
    },
    "glyphicon-btc:before": {
        "content": "\\e227"
    },
    "glyphicon-xbt:before": {
        "content": "\\e227"
    },
    "glyphicon-jpy:before": {
        "content": "\\00a5"
    },
    "glyphicon-yen:before": {
        "content": "\\00a5"
    },
    "glyphicon-rub:before": {
        "content": "\\20bd"
    },
    "glyphicon-ruble:before": {
        "content": "\\20bd"
    },
    "glyphicon-scale:before": {
        "content": "\\e230"
    },
    "glyphicon-ice-lolly:before": {
        "content": "\\e231"
    },
    "glyphicon-ice-lolly-tasted:before": {
        "content": "\\e232"
    },
    "glyphicon-education:before": {
        "content": "\\e233"
    },
    "glyphicon-option-horizontal:before": {
        "content": "\\e234"
    },
    "glyphicon-option-vertical:before": {
        "content": "\\e235"
    },
    "glyphicon-menu-hamburger:before": {
        "content": "\\e236"
    },
    "glyphicon-modal-window:before": {
        "content": "\\e237"
    },
    "glyphicon-oil:before": {
        "content": "\\e238"
    },
    "glyphicon-grain:before": {
        "content": "\\e239"
    },
    "glyphicon-sunglasses:before": {
        "content": "\\e240"
    },
    "glyphicon-text-size:before": {
        "content": "\\e241"
    },
    "glyphicon-text-color:before": {
        "content": "\\e242"
    },
    "glyphicon-text-background:before": {
        "content": "\\e243"
    },
    "glyphicon-object-align-top:before": {
        "content": "\\e244"
    },
    "glyphicon-object-align-bottom:before": {
        "content": "\\e245"
    },
    "glyphicon-object-align-horizontal:before": {
        "content": "\\e246"
    },
    "glyphicon-object-align-left:before": {
        "content": "\\e247"
    },
    "glyphicon-object-align-vertical:before": {
        "content": "\\e248"
    },
    "glyphicon-object-align-right:before": {
        "content": "\\e249"
    },
    "glyphicon-triangle-right:before": {
        "content": "\\e250"
    },
    "glyphicon-triangle-left:before": {
        "content": "\\e251"
    },
    "glyphicon-triangle-bottom:before": {
        "content": "\\e252"
    },
    "glyphicon-triangle-top:before": {
        "content": "\\e253"
    },
    "glyphicon-console:before": {
        "content": "\\e254"
    },
    "glyphicon-superscript:before": {
        "content": "\\e255"
    },
    "glyphicon-subscript:before": {
        "content": "\\e256"
    },
    "glyphicon-menu-left:before": {
        "content": "\\e257"
    },
    "glyphicon-menu-right:before": {
        "content": "\\e258"
    },
    "glyphicon-menu-down:before": {
        "content": "\\e259"
    },
    "glyphicon-menu-up:before": {
        "content": "\\e260"
    },
    "*": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    ":after": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    ":before": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "a:focus": {
        "outlineOffset": -2,
        "textDecoration": "none",
        "outline": "0!important",
        "color": "#f3291b"
    },
    "carousel-inner>item>a>img": {
        "display": "block",
        "maxWidth": "100%",
        "height": "auto",
        "lineHeight": 1
    },
    "carousel-inner>item>img": {
        "display": "block",
        "maxWidth": "100%",
        "height": "auto",
        "lineHeight": 1
    },
    "img-responsive": {
        "display": "block",
        "maxWidth": "100%",
        "height": "auto"
    },
    "thumbnail a>img": {
        "display": "block",
        "maxWidth": "100%",
        "height": "auto",
        "marginLeft": "auto",
        "marginRight": "auto"
    },
    "thumbnail>img": {
        "display": "block",
        "maxWidth": "100%",
        "height": "auto",
        "marginLeft": "auto",
        "marginRight": "auto"
    },
    "img-rounded": {
        "borderRadius": 6
    },
    "img-thumbnail": {
        "paddingTop": 4,
        "paddingRight": 4,
        "paddingBottom": 4,
        "paddingLeft": 4,
        "lineHeight": 1.42857143,
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderRadius": 4,
        "WebkitTransition": "all .2s ease-in-out",
        "OTransition": "all .2s ease-in-out",
        "transition": "all .2s ease-in-out",
        "display": "inline-block",
        "maxWidth": "100%",
        "height": "auto"
    },
    "img-circle": {
        "borderRadius": "50%"
    },
    "sr-only-focusable:active": {
        "position": "static",
        "width": "auto",
        "height": "auto",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "visible",
        "clip": "auto"
    },
    "sr-only-focusable:focus": {
        "position": "static",
        "width": "auto",
        "height": "auto",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "visible",
        "clip": "auto"
    },
    "[role=button]": {
        "cursor": "pointer"
    },
    "h1": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 36,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h2": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 30,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h3": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 24,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h4": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 18,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h5": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 14,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h6": {
        "fontFamily": "inherit",
        "fontWeight": "500",
        "lineHeight": 1.1,
        "color": "inherit",
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 12,
        "marginRight": 0,
        "marginLeft": 0
    },
    "h1 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "65%"
    },
    "h2 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "65%"
    },
    "h3 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "65%"
    },
    "h4 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "75%"
    },
    "h5 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "75%"
    },
    "h6 small": {
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#777",
        "fontSize": "75%"
    },
    "p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0,
        "fontSize": 14,
        "color": "#333434"
    },
    "lead": {
        "marginBottom": 20,
        "fontSize": 16,
        "fontWeight": "300",
        "lineHeight": 1.4
    },
    "small": {
        "fontSize": "85%"
    },
    "text-left": {
        "textAlign": "left"
    },
    "text-right": {
        "textAlign": "right"
    },
    "text-center": {
        "textAlign": "center"
    },
    "text-justify": {
        "textAlign": "justify"
    },
    "text-nowrap": {
        "whiteSpace": "nowrap"
    },
    "text-lowercase": {
        "textTransform": "lowercase"
    },
    "text-uppercase": {
        "textTransform": "uppercase"
    },
    "text-capitalize": {
        "textTransform": "capitalize"
    },
    "text-muted": {
        "color": "#777"
    },
    "text-primary": {
        "color": "#337ab7"
    },
    "atext-primary:focus": {
        "color": "#286090"
    },
    "atext-primary:hover": {
        "color": "#286090"
    },
    "text-success": {
        "color": "#3c763d"
    },
    "atext-success:focus": {
        "color": "#2b542c"
    },
    "atext-success:hover": {
        "color": "#2b542c"
    },
    "text-info": {
        "color": "#31708f"
    },
    "atext-info:focus": {
        "color": "#245269"
    },
    "atext-info:hover": {
        "color": "#245269"
    },
    "text-warning": {
        "color": "#8a6d3b"
    },
    "atext-warning:focus": {
        "color": "#66512c"
    },
    "atext-warning:hover": {
        "color": "#66512c"
    },
    "text-danger": {
        "color": "#a94442"
    },
    "atext-danger:focus": {
        "color": "#843534"
    },
    "atext-danger:hover": {
        "color": "#843534"
    },
    "bg-primary": {
        "color": "#fff",
        "backgroundColor": "#337ab7"
    },
    "abg-primary:focus": {
        "backgroundColor": "#286090"
    },
    "abg-primary:hover": {
        "backgroundColor": "#286090"
    },
    "bg-success": {
        "backgroundColor": "#dff0d8"
    },
    "abg-success:focus": {
        "backgroundColor": "#c1e2b3"
    },
    "abg-success:hover": {
        "backgroundColor": "#c1e2b3"
    },
    "bg-info": {
        "backgroundColor": "#d9edf7"
    },
    "abg-info:focus": {
        "backgroundColor": "#afd9ee"
    },
    "abg-info:hover": {
        "backgroundColor": "#afd9ee"
    },
    "bg-warning": {
        "backgroundColor": "#fcf8e3"
    },
    "abg-warning:focus": {
        "backgroundColor": "#f7ecb5"
    },
    "abg-warning:hover": {
        "backgroundColor": "#f7ecb5"
    },
    "bg-danger": {
        "backgroundColor": "#f2dede"
    },
    "abg-danger:focus": {
        "backgroundColor": "#e4b9b9"
    },
    "abg-danger:hover": {
        "backgroundColor": "#e4b9b9"
    },
    "page-header": {
        "paddingBottom": 9,
        "marginTop": 40,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "borderBottom": "1px solid #eee"
    },
    "ol": {
        "marginTop": 0,
        "marginBottom": 10
    },
    "ul": {
        "marginTop": 0,
        "marginBottom": 10
    },
    "ol ol": {
        "marginBottom": 0
    },
    "ol ul": {
        "marginBottom": 0
    },
    "ul ol": {
        "marginBottom": 0
    },
    "ul ul": {
        "marginBottom": 0
    },
    "list-unstyled": {
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "list-inline": {
        "paddingLeft": 0,
        "listStyle": "none",
        "marginLeft": -5
    },
    "list-inline>li": {
        "display": "inline-block",
        "paddingLeft": 5,
        "paddingRight": 5
    },
    "dl": {
        "marginTop": 0,
        "marginBottom": 20
    },
    "dd": {
        "lineHeight": 1.42857143,
        "marginLeft": 0
    },
    "dt": {
        "lineHeight": 1.42857143,
        "fontWeight": "700"
    },
    "abbr[data-original-title]": {
        "cursor": "help",
        "borderBottom": "1px dotted #777"
    },
    "abbr[title]": {
        "cursor": "help",
        "borderBottom": "1px dotted #777"
    },
    "initialism": {
        "fontSize": "90%",
        "textTransform": "uppercase"
    },
    "blockquote": {
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "fontSize": 17.5,
        "borderLeft": "5px solid #eee"
    },
    "blockquote ol:last-child": {
        "marginBottom": 0
    },
    "blockquote p:last-child": {
        "marginBottom": 0
    },
    "blockquote ul:last-child": {
        "marginBottom": 0
    },
    "blockquote small": {
        "display": "block",
        "fontSize": "80%",
        "lineHeight": 1.42857143,
        "color": "#777"
    },
    "blockquote footer": {
        "display": "block",
        "fontSize": "80%",
        "lineHeight": 1.42857143,
        "color": "#777"
    },
    "blockquote small:before": {
        "content": "'\\2014 \\00A0'"
    },
    "blockquote footer:before": {
        "content": "'\\2014 \\00A0'"
    },
    "blockquote-reverse": {
        "paddingRight": 15,
        "paddingLeft": 0,
        "borderRight": "5px solid #eee",
        "borderLeft": 0,
        "textAlign": "right"
    },
    "blockquotepull-right": {
        "paddingRight": 15,
        "paddingLeft": 0,
        "borderRight": "5px solid #eee",
        "borderLeft": 0,
        "textAlign": "right"
    },
    "blockquote-reverse small:before": {
        "content": "''"
    },
    "blockquote-reverse footer:before": {
        "content": "''"
    },
    "blockquotepull-right small:before": {
        "content": "''"
    },
    "blockquotepull-right footer:before": {
        "content": "''"
    },
    "blockquote-reverse small:after": {
        "content": "'\\00A0 \\2014'"
    },
    "blockquote-reverse footer:after": {
        "content": "'\\00A0 \\2014'"
    },
    "blockquotepull-right small:after": {
        "content": "'\\00A0 \\2014'"
    },
    "blockquotepull-right footer:after": {
        "content": "'\\00A0 \\2014'"
    },
    "address": {
        "marginBottom": 20,
        "fontStyle": "normal",
        "lineHeight": 1.42857143
    },
    "kbd kbd": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "700",
        "boxShadow": "none"
    },
    "pre code": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "inherit",
        "color": "inherit",
        "whiteSpace": "pre-wrap",
        "backgroundColor": "transparent",
        "borderRadius": 0
    },
    "pre-scrollable": {
        "maxHeight": 340,
        "overflowY": "scroll"
    },
    "container": {
        "marginRight": "auto",
        "marginLeft": "auto",
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "container-fluid": {
        "marginRight": "auto",
        "marginLeft": "auto",
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "row": {
        "marginLeft": -15,
        "marginRight": -15
    },
    "col-lg-1": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-10": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-11": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-12": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-2": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-3": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-4": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-5": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-6": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-7": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-8": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-lg-9": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-1": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-10": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-11": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-12": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-2": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-3": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-4": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-5": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-6": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-7": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-8": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-md-9": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-1": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-10": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-11": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-12": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-2": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-3": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-4": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-5": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-6": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-7": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-8": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-sm-9": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "col-xs-1": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "8.33333333%"
    },
    "col-xs-10": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "83.33333333%"
    },
    "col-xs-11": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "91.66666667%"
    },
    "col-xs-12": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "100%"
    },
    "col-xs-2": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "16.66666667%"
    },
    "col-xs-3": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "25%"
    },
    "col-xs-4": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "33.33333333%"
    },
    "col-xs-5": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "41.66666667%"
    },
    "col-xs-6": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "50%"
    },
    "col-xs-7": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "58.33333333%"
    },
    "col-xs-8": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "66.66666667%"
    },
    "col-xs-9": {
        "position": "relative",
        "minHeight": 1,
        "paddingLeft": 15,
        "paddingRight": 15,
        "float": "left",
        "width": "75%"
    },
    "col-xs-pull-12": {
        "right": "100%"
    },
    "col-xs-pull-11": {
        "right": "91.66666667%"
    },
    "col-xs-pull-10": {
        "right": "83.33333333%"
    },
    "col-xs-pull-9": {
        "right": "75%"
    },
    "col-xs-pull-8": {
        "right": "66.66666667%"
    },
    "col-xs-pull-7": {
        "right": "58.33333333%"
    },
    "col-xs-pull-6": {
        "right": "50%"
    },
    "col-xs-pull-5": {
        "right": "41.66666667%"
    },
    "col-xs-pull-4": {
        "right": "33.33333333%"
    },
    "col-xs-pull-3": {
        "right": "25%"
    },
    "col-xs-pull-2": {
        "right": "16.66666667%"
    },
    "col-xs-pull-1": {
        "right": "8.33333333%"
    },
    "col-xs-pull-0": {
        "right": "auto"
    },
    "col-xs-push-12": {
        "left": "100%"
    },
    "col-xs-push-11": {
        "left": "91.66666667%"
    },
    "col-xs-push-10": {
        "left": "83.33333333%"
    },
    "col-xs-push-9": {
        "left": "75%"
    },
    "col-xs-push-8": {
        "left": "66.66666667%"
    },
    "col-xs-push-7": {
        "left": "58.33333333%"
    },
    "col-xs-push-6": {
        "left": "50%"
    },
    "col-xs-push-5": {
        "left": "41.66666667%"
    },
    "col-xs-push-4": {
        "left": "33.33333333%"
    },
    "col-xs-push-3": {
        "left": "25%"
    },
    "col-xs-push-2": {
        "left": "16.66666667%"
    },
    "col-xs-push-1": {
        "left": "8.33333333%"
    },
    "col-xs-push-0": {
        "left": "auto"
    },
    "col-xs-offset-12": {
        "marginLeft": "100%"
    },
    "col-xs-offset-11": {
        "marginLeft": "91.66666667%"
    },
    "col-xs-offset-10": {
        "marginLeft": "83.33333333%"
    },
    "col-xs-offset-9": {
        "marginLeft": "75%"
    },
    "col-xs-offset-8": {
        "marginLeft": "66.66666667%"
    },
    "col-xs-offset-7": {
        "marginLeft": "58.33333333%"
    },
    "col-xs-offset-6": {
        "marginLeft": "50%"
    },
    "col-xs-offset-5": {
        "marginLeft": "41.66666667%"
    },
    "col-xs-offset-4": {
        "marginLeft": "33.33333333%"
    },
    "col-xs-offset-3": {
        "marginLeft": "25%"
    },
    "col-xs-offset-2": {
        "marginLeft": "16.66666667%"
    },
    "col-xs-offset-1": {
        "marginLeft": "8.33333333%"
    },
    "col-xs-offset-0": {
        "marginLeft": 0
    },
    "caption": {
        "paddingTop": 8,
        "paddingBottom": 8,
        "color": "#777",
        "textAlign": "left"
    },
    "table>tbody>tr>td": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "top",
        "borderTop": "1px solid #ddd"
    },
    "table>tbody>tr>th": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "top",
        "borderTop": "1px solid #ddd"
    },
    "table>tfoot>tr>td": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "top",
        "borderTop": "1px solid #ddd"
    },
    "table>tfoot>tr>th": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "top",
        "borderTop": "1px solid #ddd"
    },
    "table>thead>tr>td": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "top",
        "borderTop": "1px solid #ddd"
    },
    "table>thead>tr>th": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "lineHeight": 1.42857143,
        "verticalAlign": "bottom",
        "borderTop": "1px solid #ddd",
        "borderBottom": "2px solid #ddd"
    },
    "table>caption+thead>tr:first-child>td": {
        "borderTop": 0
    },
    "table>caption+thead>tr:first-child>th": {
        "borderTop": 0
    },
    "table>colgroup+thead>tr:first-child>td": {
        "borderTop": 0
    },
    "table>colgroup+thead>tr:first-child>th": {
        "borderTop": 0
    },
    "table>thead:first-child>tr:first-child>td": {
        "borderTop": 0
    },
    "table>thead:first-child>tr:first-child>th": {
        "borderTop": 0
    },
    "table>tbody+tbody": {
        "borderTop": "2px solid #ddd"
    },
    "table table": {
        "backgroundColor": "#fff"
    },
    "table-condensed>tbody>tr>td": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-condensed>tbody>tr>th": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-condensed>tfoot>tr>td": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-condensed>tfoot>tr>th": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-condensed>thead>tr>td": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-condensed>thead>tr>th": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "table-bordered": {
        "border": "1px solid #ddd"
    },
    "table-bordered>tbody>tr>td": {
        "border": "1px solid #ddd"
    },
    "table-bordered>tbody>tr>th": {
        "border": "1px solid #ddd"
    },
    "table-bordered>tfoot>tr>td": {
        "border": "1px solid #ddd"
    },
    "table-bordered>tfoot>tr>th": {
        "border": "1px solid #ddd"
    },
    "table-bordered>thead>tr>td": {
        "border": "1px solid #ddd",
        "borderBottomWidth": 2
    },
    "table-bordered>thead>tr>th": {
        "border": "1px solid #ddd",
        "borderBottomWidth": 2
    },
    "table-striped>tbody>tr:nth-of-type(odd)": {
        "backgroundColor": "#f9f9f9"
    },
    "table-hover>tbody>tr:hover": {
        "backgroundColor": "#f5f5f5"
    },
    "table col[class*=col-]": {
        "position": "static",
        "float": "none",
        "display": "table-column"
    },
    "table td[class*=col-]": {
        "position": "static",
        "float": "none",
        "display": "table-cell"
    },
    "table th[class*=col-]": {
        "position": "static",
        "float": "none",
        "display": "table-cell"
    },
    "table>tbody>tractive>td": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tbody>tractive>th": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tbody>tr>tdactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tbody>tr>thactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tfoot>tractive>td": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tfoot>tractive>th": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tfoot>tr>tdactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table>tfoot>tr>thactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table>thead>tractive>td": {
        "backgroundColor": "#f5f5f5"
    },
    "table>thead>tractive>th": {
        "backgroundColor": "#f5f5f5"
    },
    "table>thead>tr>tdactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table>thead>tr>thactive": {
        "backgroundColor": "#f5f5f5"
    },
    "table-hover>tbody>tractive:hover>td": {
        "backgroundColor": "#e8e8e8"
    },
    "table-hover>tbody>tractive:hover>th": {
        "backgroundColor": "#e8e8e8"
    },
    "table-hover>tbody>tr:hover>active": {
        "backgroundColor": "#e8e8e8"
    },
    "table-hover>tbody>tr>tdactive:hover": {
        "backgroundColor": "#e8e8e8"
    },
    "table-hover>tbody>tr>thactive:hover": {
        "backgroundColor": "#e8e8e8"
    },
    "table>tbody>trsuccess>td": {
        "backgroundColor": "#dff0d8"
    },
    "table>tbody>trsuccess>th": {
        "backgroundColor": "#dff0d8"
    },
    "table>tbody>tr>tdsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table>tbody>tr>thsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table>tfoot>trsuccess>td": {
        "backgroundColor": "#dff0d8"
    },
    "table>tfoot>trsuccess>th": {
        "backgroundColor": "#dff0d8"
    },
    "table>tfoot>tr>tdsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table>tfoot>tr>thsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table>thead>trsuccess>td": {
        "backgroundColor": "#dff0d8"
    },
    "table>thead>trsuccess>th": {
        "backgroundColor": "#dff0d8"
    },
    "table>thead>tr>tdsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table>thead>tr>thsuccess": {
        "backgroundColor": "#dff0d8"
    },
    "table-hover>tbody>trsuccess:hover>td": {
        "backgroundColor": "#d0e9c6"
    },
    "table-hover>tbody>trsuccess:hover>th": {
        "backgroundColor": "#d0e9c6"
    },
    "table-hover>tbody>tr:hover>success": {
        "backgroundColor": "#d0e9c6"
    },
    "table-hover>tbody>tr>tdsuccess:hover": {
        "backgroundColor": "#d0e9c6"
    },
    "table-hover>tbody>tr>thsuccess:hover": {
        "backgroundColor": "#d0e9c6"
    },
    "table>tbody>trinfo>td": {
        "backgroundColor": "#d9edf7"
    },
    "table>tbody>trinfo>th": {
        "backgroundColor": "#d9edf7"
    },
    "table>tbody>tr>tdinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table>tbody>tr>thinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table>tfoot>trinfo>td": {
        "backgroundColor": "#d9edf7"
    },
    "table>tfoot>trinfo>th": {
        "backgroundColor": "#d9edf7"
    },
    "table>tfoot>tr>tdinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table>tfoot>tr>thinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table>thead>trinfo>td": {
        "backgroundColor": "#d9edf7"
    },
    "table>thead>trinfo>th": {
        "backgroundColor": "#d9edf7"
    },
    "table>thead>tr>tdinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table>thead>tr>thinfo": {
        "backgroundColor": "#d9edf7"
    },
    "table-hover>tbody>trinfo:hover>td": {
        "backgroundColor": "#c4e3f3"
    },
    "table-hover>tbody>trinfo:hover>th": {
        "backgroundColor": "#c4e3f3"
    },
    "table-hover>tbody>tr:hover>info": {
        "backgroundColor": "#c4e3f3"
    },
    "table-hover>tbody>tr>tdinfo:hover": {
        "backgroundColor": "#c4e3f3"
    },
    "table-hover>tbody>tr>thinfo:hover": {
        "backgroundColor": "#c4e3f3"
    },
    "table>tbody>trwarning>td": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tbody>trwarning>th": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tbody>tr>tdwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tbody>tr>thwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tfoot>trwarning>td": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tfoot>trwarning>th": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tfoot>tr>tdwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table>tfoot>tr>thwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table>thead>trwarning>td": {
        "backgroundColor": "#fcf8e3"
    },
    "table>thead>trwarning>th": {
        "backgroundColor": "#fcf8e3"
    },
    "table>thead>tr>tdwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table>thead>tr>thwarning": {
        "backgroundColor": "#fcf8e3"
    },
    "table-hover>tbody>trwarning:hover>td": {
        "backgroundColor": "#faf2cc"
    },
    "table-hover>tbody>trwarning:hover>th": {
        "backgroundColor": "#faf2cc"
    },
    "table-hover>tbody>tr:hover>warning": {
        "backgroundColor": "#faf2cc"
    },
    "table-hover>tbody>tr>tdwarning:hover": {
        "backgroundColor": "#faf2cc"
    },
    "table-hover>tbody>tr>thwarning:hover": {
        "backgroundColor": "#faf2cc"
    },
    "table>tbody>trdanger>td": {
        "backgroundColor": "#f2dede"
    },
    "table>tbody>trdanger>th": {
        "backgroundColor": "#f2dede"
    },
    "table>tbody>tr>tddanger": {
        "backgroundColor": "#f2dede"
    },
    "table>tbody>tr>thdanger": {
        "backgroundColor": "#f2dede"
    },
    "table>tfoot>trdanger>td": {
        "backgroundColor": "#f2dede"
    },
    "table>tfoot>trdanger>th": {
        "backgroundColor": "#f2dede"
    },
    "table>tfoot>tr>tddanger": {
        "backgroundColor": "#f2dede"
    },
    "table>tfoot>tr>thdanger": {
        "backgroundColor": "#f2dede"
    },
    "table>thead>trdanger>td": {
        "backgroundColor": "#f2dede"
    },
    "table>thead>trdanger>th": {
        "backgroundColor": "#f2dede"
    },
    "table>thead>tr>tddanger": {
        "backgroundColor": "#f2dede"
    },
    "table>thead>tr>thdanger": {
        "backgroundColor": "#f2dede"
    },
    "table-hover>tbody>trdanger:hover>td": {
        "backgroundColor": "#ebcccc"
    },
    "table-hover>tbody>trdanger:hover>th": {
        "backgroundColor": "#ebcccc"
    },
    "table-hover>tbody>tr:hover>danger": {
        "backgroundColor": "#ebcccc"
    },
    "table-hover>tbody>tr>tddanger:hover": {
        "backgroundColor": "#ebcccc"
    },
    "table-hover>tbody>tr>thdanger:hover": {
        "backgroundColor": "#ebcccc"
    },
    "table-responsive": {
        "overflowX": "auto",
        "minHeight": ".01%"
    },
    "fieldset": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "border": 0,
        "minWidth": 0
    },
    "legend": {
        "display": "block",
        "width": "100%",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginBottom": 20,
        "fontSize": 21,
        "lineHeight": "inherit",
        "color": "#333",
        "border": 0,
        "borderBottom": "1px solid #e5e5e5"
    },
    "label": {
        "display": "inline",
        "maxWidth": "100%",
        "marginBottom": 5,
        "fontWeight": "700",
        "paddingTop": 0.2,
        "paddingRight": 0.6,
        "paddingBottom": 0.3,
        "paddingLeft": 0.6,
        "fontSize": "75%",
        "lineHeight": 1,
        "color": "#fff",
        "textAlign": "center",
        "whiteSpace": "nowrap",
        "verticalAlign": "baseline",
        "borderRadius": 0.25
    },
    "input[type=search]": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box",
        "WebkitAppearance": "none",
        "MozAppearance": "none"
    },
    "input[type=file]": {
        "display": "block"
    },
    "input[type=range]": {
        "display": "block",
        "width": "100%"
    },
    "select[multiple]": {
        "height": "auto"
    },
    "select[size]": {
        "height": "auto"
    },
    "input[type=file]:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "input[type=checkbox]:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "textDecoration": "none"
    },
    "input[type=radio]:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "textDecoration": "none"
    },
    "output": {
        "display": "block",
        "paddingTop": 7,
        "fontSize": 14,
        "lineHeight": 1.42857143,
        "color": "#555"
    },
    "form-control": {
        "width": "100%",
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "lineHeight": 1.42857143,
        "backgroundColor": "#fff",
        "backgroundImage": "none",
        "border": "1px solid #ccc",
        "borderRadius": 4,
        "height": 42,
        "display": "inline-block",
        "WebkitBoxShadow": "none",
        "boxShadow": "none",
        "fontSize": 13,
        "color": "#000",
        "borderColor": "#e6e6e6",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "form-control::-ms-expand": {
        "border": 0,
        "backgroundColor": "transparent"
    },
    "form-control[disabled]": {
        "backgroundColor": "#eee",
        "opacity": 1,
        "cursor": "not-allowed"
    },
    "form-control[readonly]": {
        "backgroundColor": "#eee",
        "opacity": 1
    },
    "fieldset[disabled] form-control": {
        "backgroundColor": "#eee",
        "opacity": 1,
        "cursor": "not-allowed"
    },
    "textareaform-control": {
        "height": "auto",
        "resize": "vertical"
    },
    "form-group": {
        "marginBottom": 15
    },
    "checkbox": {
        "position": "relative",
        "display": "block",
        "marginTop": 10,
        "marginBottom": 10
    },
    "radio": {
        "position": "relative",
        "display": "block",
        "marginTop": 10,
        "marginBottom": 10
    },
    "checkbox label": {
        "minHeight": 20,
        "paddingLeft": 20,
        "marginBottom": 0,
        "fontWeight": "400",
        "cursor": "pointer"
    },
    "radio label": {
        "minHeight": 20,
        "paddingLeft": 20,
        "marginBottom": 0,
        "fontWeight": "400",
        "cursor": "pointer"
    },
    "checkbox input[type=checkbox]": {
        "position": "absolute",
        "marginLeft": -20,
        "marginTop": "4px \\9"
    },
    "checkbox-inline input[type=checkbox]": {
        "position": "absolute",
        "marginLeft": -20,
        "marginTop": "4px \\9"
    },
    "radio input[type=radio]": {
        "position": "absolute",
        "marginLeft": -20,
        "marginTop": "4px \\9"
    },
    "radio-inline input[type=radio]": {
        "position": "absolute",
        "marginLeft": -20,
        "marginTop": "4px \\9"
    },
    "checkbox+checkbox": {
        "marginTop": -5
    },
    "radio+radio": {
        "marginTop": -5
    },
    "checkbox-inline": {
        "position": "relative",
        "display": "inline-block",
        "paddingLeft": 20,
        "marginBottom": 0,
        "verticalAlign": "middle",
        "fontWeight": "400",
        "cursor": "pointer"
    },
    "radio-inline": {
        "position": "relative",
        "display": "inline-block",
        "paddingLeft": 20,
        "marginBottom": 0,
        "verticalAlign": "middle",
        "fontWeight": "400",
        "cursor": "pointer"
    },
    "checkbox-inline+checkbox-inline": {
        "marginTop": 0,
        "marginLeft": 10
    },
    "radio-inline+radio-inline": {
        "marginTop": 0,
        "marginLeft": 10
    },
    "checkbox-inlinedisabled": {
        "cursor": "not-allowed"
    },
    "checkboxdisabled label": {
        "cursor": "not-allowed"
    },
    "radio-inlinedisabled": {
        "cursor": "not-allowed"
    },
    "radiodisabled label": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] checkbox label": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] checkbox-inline": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] radio label": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] radio-inline": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] input[type=checkbox]": {
        "cursor": "not-allowed"
    },
    "fieldset[disabled] input[type=radio]": {
        "cursor": "not-allowed"
    },
    "input[type=checkbox]disabled": {
        "cursor": "not-allowed"
    },
    "input[type=checkbox][disabled]": {
        "cursor": "not-allowed"
    },
    "input[type=radio]disabled": {
        "cursor": "not-allowed"
    },
    "input[type=radio][disabled]": {
        "cursor": "not-allowed"
    },
    "form-control-static": {
        "paddingTop": 7,
        "paddingBottom": 7,
        "marginBottom": 0,
        "minHeight": 34
    },
    "form-control-staticinput-lg": {
        "paddingLeft": 0,
        "paddingRight": 0
    },
    "form-control-staticinput-sm": {
        "paddingLeft": 0,
        "paddingRight": 0
    },
    "input-sm": {
        "height": 30,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "selectinput-sm": {
        "height": 30,
        "lineHeight": 30
    },
    "select[multiple]input-sm": {
        "height": "auto"
    },
    "textareainput-sm": {
        "height": "auto"
    },
    "form-group-sm form-control": {
        "height": 30,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "form-group-sm selectform-control": {
        "height": 30,
        "lineHeight": 30
    },
    "form-group-sm select[multiple]form-control": {
        "height": "auto"
    },
    "form-group-sm textareaform-control": {
        "height": "auto"
    },
    "form-group-sm form-control-static": {
        "height": 30,
        "minHeight": 32,
        "paddingTop": 6,
        "paddingRight": 10,
        "paddingBottom": 6,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5
    },
    "input-lg": {
        "height": 46,
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "selectinput-lg": {
        "height": 46,
        "lineHeight": 46
    },
    "select[multiple]input-lg": {
        "height": "auto"
    },
    "textareainput-lg": {
        "height": "auto"
    },
    "form-group-lg form-control": {
        "height": 46,
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "form-group-lg selectform-control": {
        "height": 46,
        "lineHeight": 46
    },
    "form-group-lg select[multiple]form-control": {
        "height": "auto"
    },
    "form-group-lg textareaform-control": {
        "height": "auto"
    },
    "form-group-lg form-control-static": {
        "height": 46,
        "minHeight": 38,
        "paddingTop": 11,
        "paddingRight": 16,
        "paddingBottom": 11,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333
    },
    "has-feedback": {
        "position": "relative"
    },
    "has-feedback form-control": {
        "paddingRight": 42.5
    },
    "form-control-feedback": {
        "position": "absolute",
        "top": 0,
        "right": 0,
        "zIndex": 2,
        "display": "block",
        "width": 34,
        "height": 34,
        "lineHeight": 34,
        "textAlign": "center",
        "pointerEvents": "none"
    },
    "form-group-lg form-control+form-control-feedback": {
        "width": 46,
        "height": 46,
        "lineHeight": 46
    },
    "input-group-lg+form-control-feedback": {
        "width": 46,
        "height": 46,
        "lineHeight": 46
    },
    "input-lg+form-control-feedback": {
        "width": 46,
        "height": 46,
        "lineHeight": 46
    },
    "form-group-sm form-control+form-control-feedback": {
        "width": 30,
        "height": 30,
        "lineHeight": 30
    },
    "input-group-sm+form-control-feedback": {
        "width": 30,
        "height": 30,
        "lineHeight": 30
    },
    "input-sm+form-control-feedback": {
        "width": 30,
        "height": 30,
        "lineHeight": 30
    },
    "has-success checkbox": {
        "color": "#3c763d"
    },
    "has-success checkbox-inline": {
        "color": "#3c763d"
    },
    "has-success control-label": {
        "color": "#3c763d"
    },
    "has-success help-block": {
        "color": "#3c763d"
    },
    "has-success radio": {
        "color": "#3c763d"
    },
    "has-success radio-inline": {
        "color": "#3c763d"
    },
    "has-successcheckbox label": {
        "color": "#3c763d"
    },
    "has-successcheckbox-inline label": {
        "color": "#3c763d"
    },
    "has-successradio label": {
        "color": "#3c763d"
    },
    "has-successradio-inline label": {
        "color": "#3c763d"
    },
    "has-success form-control": {
        "borderColor": "#3c763d",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    },
    "has-success form-control:focus": {
        "borderColor": "#2b542c",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168"
    },
    "has-success input-group-addon": {
        "color": "#3c763d",
        "borderColor": "#3c763d",
        "backgroundColor": "#dff0d8"
    },
    "has-success form-control-feedback": {
        "color": "#3c763d"
    },
    "has-warning checkbox": {
        "color": "#8a6d3b"
    },
    "has-warning checkbox-inline": {
        "color": "#8a6d3b"
    },
    "has-warning control-label": {
        "color": "#8a6d3b"
    },
    "has-warning help-block": {
        "color": "#8a6d3b"
    },
    "has-warning radio": {
        "color": "#8a6d3b"
    },
    "has-warning radio-inline": {
        "color": "#8a6d3b"
    },
    "has-warningcheckbox label": {
        "color": "#8a6d3b"
    },
    "has-warningcheckbox-inline label": {
        "color": "#8a6d3b"
    },
    "has-warningradio label": {
        "color": "#8a6d3b"
    },
    "has-warningradio-inline label": {
        "color": "#8a6d3b"
    },
    "has-warning form-control": {
        "borderColor": "#8a6d3b",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    },
    "has-warning form-control:focus": {
        "borderColor": "#66512c",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b"
    },
    "has-warning input-group-addon": {
        "color": "#8a6d3b",
        "borderColor": "#8a6d3b",
        "backgroundColor": "#fcf8e3"
    },
    "has-warning form-control-feedback": {
        "color": "#8a6d3b"
    },
    "has-error checkbox": {
        "color": "#a94442"
    },
    "has-error checkbox-inline": {
        "color": "#a94442"
    },
    "has-error control-label": {
        "color": "#a94442"
    },
    "has-error help-block": {
        "color": "#a94442"
    },
    "has-error radio": {
        "color": "#a94442"
    },
    "has-error radio-inline": {
        "color": "#a94442"
    },
    "has-errorcheckbox label": {
        "color": "#a94442"
    },
    "has-errorcheckbox-inline label": {
        "color": "#a94442"
    },
    "has-errorradio label": {
        "color": "#a94442"
    },
    "has-errorradio-inline label": {
        "color": "#a94442"
    },
    "has-error form-control": {
        "borderColor": "#a94442",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    },
    "has-error form-control:focus": {
        "borderColor": "#843534",
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483"
    },
    "has-error input-group-addon": {
        "color": "#a94442",
        "borderColor": "#a94442",
        "backgroundColor": "#f2dede"
    },
    "has-error form-control-feedback": {
        "color": "#a94442"
    },
    "has-feedback label~form-control-feedback": {
        "top": 25
    },
    "has-feedback labelsr-only~form-control-feedback": {
        "top": 0
    },
    "help-block": {
        "display": "block",
        "marginTop": 5,
        "marginBottom": 10,
        "color": "#727474"
    },
    "form-horizontal checkbox": {
        "marginTop": 0,
        "marginBottom": 0,
        "paddingTop": 7,
        "minHeight": 27
    },
    "form-horizontal checkbox-inline": {
        "marginTop": 0,
        "marginBottom": 0,
        "paddingTop": 7
    },
    "form-horizontal radio": {
        "marginTop": 0,
        "marginBottom": 0,
        "paddingTop": 7,
        "minHeight": 27
    },
    "form-horizontal radio-inline": {
        "marginTop": 0,
        "marginBottom": 0,
        "paddingTop": 7
    },
    "form-horizontal form-group": {
        "marginLeft": -15,
        "marginRight": -15
    },
    "form-horizontal has-feedback form-control-feedback": {
        "right": 15
    },
    "btn": {
        "display": "inline-block",
        "marginBottom": 0,
        "fontWeight": "400",
        "textAlign": "center",
        "verticalAlign": "middle",
        "touchAction": "manipulation",
        "cursor": "pointer",
        "backgroundImage": "none",
        "whiteSpace": "nowrap",
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "lineHeight": 1.42857143,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "textTransform": "uppercase",
        "border": "none",
        "fontSize": 13,
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "btnactivefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "btnactive:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "btnfocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "btn:activefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "btn:active:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "btn:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "btn:hover": {
        "color": "#333",
        "textDecoration": "none",
        "outline": "0!important"
    },
    "btnactive": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "btn:active": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "btndisabled": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "btn[disabled]": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] btn": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "abtndisabled": {
        "pointerEvents": "none"
    },
    "fieldset[disabled] abtn": {
        "pointerEvents": "none"
    },
    "btn-default": {
        "color": "#333",
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-defaultfocus": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#8c8c8c"
    },
    "btn-default:focus": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#8c8c8c"
    },
    "btn-defaultactive": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#adadad",
        "backgroundImage": "none"
    },
    "btn-default:active": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#adadad",
        "backgroundImage": "none"
    },
    "btn-default:hover": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#adadad"
    },
    "open>dropdown-togglebtn-default": {
        "color": "#333",
        "backgroundColor": "#e6e6e6",
        "borderColor": "#adadad",
        "backgroundImage": "none"
    },
    "btn-defaultactivefocus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-defaultactive:focus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-defaultactive:hover": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-default:activefocus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-default:active:focus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-default:active:hover": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "open>dropdown-togglebtn-defaultfocus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "open>dropdown-togglebtn-default:focus": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "open>dropdown-togglebtn-default:hover": {
        "color": "#333",
        "backgroundColor": "#d4d4d4",
        "borderColor": "#8c8c8c"
    },
    "btn-defaultdisabledfocus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-defaultdisabled:focus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-defaultdisabled:hover": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-default[disabled]focus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-default[disabled]:focus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-default[disabled]:hover": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "fieldset[disabled] btn-defaultfocus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "fieldset[disabled] btn-default:focus": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "fieldset[disabled] btn-default:hover": {
        "backgroundColor": "#fff",
        "borderColor": "#ccc"
    },
    "btn-default badge": {
        "color": "#fff",
        "backgroundColor": "#333"
    },
    "btn-primary": {
        "color": "#fff",
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primaryfocus": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#122b40"
    },
    "btn-primary:focus": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#122b40"
    },
    "btn-primaryactive": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#204d74",
        "backgroundImage": "none"
    },
    "btn-primary:active": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#204d74",
        "backgroundImage": "none"
    },
    "btn-primary:hover": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#204d74"
    },
    "open>dropdown-togglebtn-primary": {
        "color": "#fff",
        "backgroundColor": "#286090",
        "borderColor": "#204d74",
        "backgroundImage": "none"
    },
    "btn-primaryactivefocus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primaryactive:focus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primaryactive:hover": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primary:activefocus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primary:active:focus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primary:active:hover": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "open>dropdown-togglebtn-primaryfocus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "open>dropdown-togglebtn-primary:focus": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "open>dropdown-togglebtn-primary:hover": {
        "color": "#fff",
        "backgroundColor": "#204d74",
        "borderColor": "#122b40"
    },
    "btn-primarydisabledfocus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primarydisabled:focus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primarydisabled:hover": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primary[disabled]focus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primary[disabled]:focus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primary[disabled]:hover": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "fieldset[disabled] btn-primaryfocus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "fieldset[disabled] btn-primary:focus": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "fieldset[disabled] btn-primary:hover": {
        "backgroundColor": "#337ab7",
        "borderColor": "#2e6da4"
    },
    "btn-primary badge": {
        "color": "#337ab7",
        "backgroundColor": "#fff"
    },
    "btn-success": {
        "color": "#fff",
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-successfocus": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#255625"
    },
    "btn-success:focus": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#255625"
    },
    "btn-successactive": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#398439",
        "backgroundImage": "none"
    },
    "btn-success:active": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#398439",
        "backgroundImage": "none"
    },
    "btn-success:hover": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#398439"
    },
    "open>dropdown-togglebtn-success": {
        "color": "#fff",
        "backgroundColor": "#449d44",
        "borderColor": "#398439",
        "backgroundImage": "none"
    },
    "btn-successactivefocus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-successactive:focus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-successactive:hover": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-success:activefocus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-success:active:focus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-success:active:hover": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "open>dropdown-togglebtn-successfocus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "open>dropdown-togglebtn-success:focus": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "open>dropdown-togglebtn-success:hover": {
        "color": "#fff",
        "backgroundColor": "#398439",
        "borderColor": "#255625"
    },
    "btn-successdisabledfocus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-successdisabled:focus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-successdisabled:hover": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-success[disabled]focus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-success[disabled]:focus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-success[disabled]:hover": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "fieldset[disabled] btn-successfocus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "fieldset[disabled] btn-success:focus": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "fieldset[disabled] btn-success:hover": {
        "backgroundColor": "#5cb85c",
        "borderColor": "#4cae4c"
    },
    "btn-success badge": {
        "color": "#5cb85c",
        "backgroundColor": "#fff"
    },
    "btn-info": {
        "color": "#fff",
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-infofocus": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#1b6d85"
    },
    "btn-info:focus": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#1b6d85"
    },
    "btn-infoactive": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#269abc",
        "backgroundImage": "none"
    },
    "btn-info:active": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#269abc",
        "backgroundImage": "none"
    },
    "btn-info:hover": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#269abc"
    },
    "open>dropdown-togglebtn-info": {
        "color": "#fff",
        "backgroundColor": "#31b0d5",
        "borderColor": "#269abc",
        "backgroundImage": "none"
    },
    "btn-infoactivefocus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-infoactive:focus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-infoactive:hover": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-info:activefocus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-info:active:focus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-info:active:hover": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "open>dropdown-togglebtn-infofocus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "open>dropdown-togglebtn-info:focus": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "open>dropdown-togglebtn-info:hover": {
        "color": "#fff",
        "backgroundColor": "#269abc",
        "borderColor": "#1b6d85"
    },
    "btn-infodisabledfocus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-infodisabled:focus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-infodisabled:hover": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-info[disabled]focus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-info[disabled]:focus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-info[disabled]:hover": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "fieldset[disabled] btn-infofocus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "fieldset[disabled] btn-info:focus": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "fieldset[disabled] btn-info:hover": {
        "backgroundColor": "#5bc0de",
        "borderColor": "#46b8da"
    },
    "btn-info badge": {
        "color": "#5bc0de",
        "backgroundColor": "#fff"
    },
    "btn-warning": {
        "color": "#fff",
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warningfocus": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#985f0d"
    },
    "btn-warning:focus": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#985f0d"
    },
    "btn-warningactive": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#d58512",
        "backgroundImage": "none"
    },
    "btn-warning:active": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#d58512",
        "backgroundImage": "none"
    },
    "btn-warning:hover": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#d58512"
    },
    "open>dropdown-togglebtn-warning": {
        "color": "#fff",
        "backgroundColor": "#ec971f",
        "borderColor": "#d58512",
        "backgroundImage": "none"
    },
    "btn-warningactivefocus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warningactive:focus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warningactive:hover": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warning:activefocus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warning:active:focus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warning:active:hover": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "open>dropdown-togglebtn-warningfocus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "open>dropdown-togglebtn-warning:focus": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "open>dropdown-togglebtn-warning:hover": {
        "color": "#fff",
        "backgroundColor": "#d58512",
        "borderColor": "#985f0d"
    },
    "btn-warningdisabledfocus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warningdisabled:focus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warningdisabled:hover": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warning[disabled]focus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warning[disabled]:focus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warning[disabled]:hover": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "fieldset[disabled] btn-warningfocus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "fieldset[disabled] btn-warning:focus": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "fieldset[disabled] btn-warning:hover": {
        "backgroundColor": "#f0ad4e",
        "borderColor": "#eea236"
    },
    "btn-warning badge": {
        "color": "#f0ad4e",
        "backgroundColor": "#fff"
    },
    "btn-danger": {
        "color": "#fff",
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-dangerfocus": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#761c19"
    },
    "btn-danger:focus": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#761c19"
    },
    "btn-dangeractive": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#ac2925",
        "backgroundImage": "none"
    },
    "btn-danger:active": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#ac2925",
        "backgroundImage": "none"
    },
    "btn-danger:hover": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#ac2925"
    },
    "open>dropdown-togglebtn-danger": {
        "color": "#fff",
        "backgroundColor": "#c9302c",
        "borderColor": "#ac2925",
        "backgroundImage": "none"
    },
    "btn-dangeractivefocus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-dangeractive:focus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-dangeractive:hover": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-danger:activefocus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-danger:active:focus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-danger:active:hover": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "open>dropdown-togglebtn-dangerfocus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "open>dropdown-togglebtn-danger:focus": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "open>dropdown-togglebtn-danger:hover": {
        "color": "#fff",
        "backgroundColor": "#ac2925",
        "borderColor": "#761c19"
    },
    "btn-dangerdisabledfocus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-dangerdisabled:focus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-dangerdisabled:hover": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-danger[disabled]focus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-danger[disabled]:focus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-danger[disabled]:hover": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "fieldset[disabled] btn-dangerfocus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "fieldset[disabled] btn-danger:focus": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "fieldset[disabled] btn-danger:hover": {
        "backgroundColor": "#d9534f",
        "borderColor": "#d43f3a"
    },
    "btn-danger badge": {
        "color": "#d9534f",
        "backgroundColor": "#fff"
    },
    "btn-link": {
        "color": "#000",
        "fontWeight": "400",
        "borderRadius": 0,
        "backgroundColor": "transparent",
        "WebkitBoxShadow": "none",
        "boxShadow": "none",
        "borderColor": "transparent"
    },
    "btn-linkactive": {
        "backgroundColor": "transparent",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "btn-link:active": {
        "backgroundColor": "transparent",
        "WebkitBoxShadow": "none",
        "boxShadow": "none",
        "borderColor": "transparent"
    },
    "btn-link[disabled]": {
        "backgroundColor": "transparent",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] btn-link": {
        "backgroundColor": "transparent",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "btn-link:focus": {
        "borderColor": "transparent",
        "color": "#000",
        "textDecoration": "underline",
        "backgroundColor": "transparent"
    },
    "btn-link:hover": {
        "borderColor": "transparent",
        "color": "#000",
        "textDecoration": "underline",
        "backgroundColor": "transparent"
    },
    "btn-link[disabled]:focus": {
        "color": "#777",
        "textDecoration": "none"
    },
    "btn-link[disabled]:hover": {
        "color": "#777",
        "textDecoration": "none"
    },
    "fieldset[disabled] btn-link:focus": {
        "color": "#777",
        "textDecoration": "none"
    },
    "fieldset[disabled] btn-link:hover": {
        "color": "#777",
        "textDecoration": "none"
    },
    "btn-group-lg>btn": {
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "btn-lg": {
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "btn-group-sm>btn": {
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "btn-sm": {
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "btn-group-xs>btn": {
        "paddingTop": 1,
        "paddingRight": 5,
        "paddingBottom": 1,
        "paddingLeft": 5,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "btn-xs": {
        "paddingTop": 1,
        "paddingRight": 5,
        "paddingBottom": 1,
        "paddingLeft": 5,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "btn-block": {
        "display": "block",
        "width": "100%"
    },
    "btn-block+btn-block": {
        "marginTop": 5
    },
    "input[type=button]btn-block": {
        "width": "100%"
    },
    "input[type=reset]btn-block": {
        "width": "100%"
    },
    "input[type=submit]btn-block": {
        "width": "100%"
    },
    "fade": {
        "opacity": 0,
        "WebkitTransition": "opacity .15s linear",
        "OTransition": "opacity .15s linear",
        "transition": "opacity .15s linear"
    },
    "fadein": {
        "opacity": 1
    },
    "collapse": {
        "display": "none"
    },
    "collapsein": {
        "display": "block"
    },
    "trcollapsein": {
        "display": "table-row"
    },
    "tbodycollapsein": {
        "display": "table-row-group"
    },
    "collapsing": {
        "position": "relative",
        "height": 0,
        "overflow": "hidden",
        "WebkitTransitionProperty": "height,visibility",
        "transitionProperty": "height,visibility",
        "WebkitTransitionDuration": ".35s",
        "transitionDuration": ".35s",
        "WebkitTransitionTimingFunction": "ease",
        "transitionTimingFunction": "ease"
    },
    "caret": {
        "display": "inline-block",
        "width": 0,
        "height": 0,
        "marginLeft": 2,
        "verticalAlign": "middle",
        "borderTop": "4px solid \\9",
        "borderRight": "4px solid transparent",
        "borderLeft": "4px solid transparent"
    },
    "dropdown": {
        "position": "relative"
    },
    "dropup": {
        "position": "relative"
    },
    "dropdown-toggle:focus": {
        "outline": 0
    },
    "dropdown-menu": {
        "position": "absolute",
        "top": "100%",
        "left": 0,
        "zIndex": 1000,
        "display": "none",
        "float": "left",
        "minWidth": 160,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "marginTop": 2,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "listStyle": "none",
        "fontSize": 14,
        "textAlign": "left",
        "backgroundColor": "#fff",
        "border": "1px solid rgba(0,0,0,.15)",
        "borderRadius": 4,
        "WebkitBoxShadow": "0 6px 12px rgba(0,0,0,.175)",
        "boxShadow": "0 6px 12px rgba(0,0,0,.175)",
        "backgroundClip": "padding-box"
    },
    "dropdown-menupull-right": {
        "right": 0,
        "left": "auto"
    },
    "dropdown-menu divider": {
        "height": 1,
        "marginTop": 9,
        "marginRight": 0,
        "marginBottom": 9,
        "marginLeft": 0,
        "overflow": "hidden",
        "backgroundColor": "#e5e5e5"
    },
    "dropdown-menu>li>a": {
        "display": "block",
        "paddingTop": 3,
        "paddingRight": 20,
        "paddingBottom": 3,
        "paddingLeft": 20,
        "clear": "both",
        "fontWeight": "400",
        "lineHeight": 1.42857143,
        "color": "#333",
        "whiteSpace": "nowrap"
    },
    "dropdown-menu>li>a:focus": {
        "textDecoration": "none",
        "color": "#262626",
        "backgroundColor": "#f5f5f5"
    },
    "dropdown-menu>li>a:hover": {
        "textDecoration": "none",
        "color": "#262626",
        "backgroundColor": "#f5f5f5"
    },
    "dropdown-menu>active>a": {
        "color": "#fff",
        "textDecoration": "none",
        "outline": 0,
        "backgroundColor": "#337ab7"
    },
    "dropdown-menu>active>a:focus": {
        "color": "#fff",
        "textDecoration": "none",
        "outline": 0,
        "backgroundColor": "#337ab7"
    },
    "dropdown-menu>active>a:hover": {
        "color": "#fff",
        "textDecoration": "none",
        "outline": 0,
        "backgroundColor": "#337ab7"
    },
    "dropdown-menu>disabled>a": {
        "color": "#777"
    },
    "dropdown-menu>disabled>a:focus": {
        "color": "#777",
        "textDecoration": "none",
        "backgroundColor": "transparent",
        "backgroundImage": "none",
        "filter": "progid:DXImageTransform.Microsoft.gradient(enabled=false)",
        "cursor": "not-allowed"
    },
    "dropdown-menu>disabled>a:hover": {
        "color": "#777",
        "textDecoration": "none",
        "backgroundColor": "transparent",
        "backgroundImage": "none",
        "filter": "progid:DXImageTransform.Microsoft.gradient(enabled=false)",
        "cursor": "not-allowed"
    },
    "open>dropdown-menu": {
        "display": "block"
    },
    "open>a": {
        "outline": 0
    },
    "dropdown-menu-right": {
        "left": "auto",
        "right": 0
    },
    "dropdown-menu-left": {
        "left": 0,
        "right": "auto"
    },
    "dropdown-header": {
        "display": "block",
        "paddingTop": 3,
        "paddingRight": 20,
        "paddingBottom": 3,
        "paddingLeft": 20,
        "fontSize": 12,
        "lineHeight": 1.42857143,
        "color": "#777",
        "whiteSpace": "nowrap"
    },
    "dropdown-backdrop": {
        "position": "fixed",
        "left": 0,
        "right": 0,
        "bottom": 0,
        "top": 0,
        "zIndex": 990
    },
    "pull-right>dropdown-menu": {
        "right": 0,
        "left": "auto"
    },
    "dropup caret": {
        "borderTop": 0,
        "borderBottom": "4px solid \\9",
        "content": ""
    },
    "navbar-fixed-bottom dropdown caret": {
        "borderTop": 0,
        "borderBottom": "4px solid \\9",
        "content": ""
    },
    "dropup dropdown-menu": {
        "top": "auto",
        "bottom": "100%",
        "marginBottom": 2
    },
    "navbar-fixed-bottom dropdown dropdown-menu": {
        "top": "auto",
        "bottom": "100%",
        "marginBottom": 2
    },
    "btn-group": {
        "position": "relative",
        "display": "inline-block",
        "verticalAlign": "middle"
    },
    "btn-group-vertical": {
        "position": "relative",
        "display": "inline-block",
        "verticalAlign": "middle"
    },
    "btn-group-vertical>btn": {
        "position": "relative",
        "float": "none",
        "display": "block",
        "width": "100%",
        "maxWidth": "100%"
    },
    "btn-group>btn": {
        "position": "relative",
        "float": "left"
    },
    "btn-group-vertical>btnactive": {
        "zIndex": 2
    },
    "btn-group-vertical>btn:active": {
        "zIndex": 2
    },
    "btn-group-vertical>btn:focus": {
        "zIndex": 2
    },
    "btn-group-vertical>btn:hover": {
        "zIndex": 2
    },
    "btn-group>btnactive": {
        "zIndex": 2
    },
    "btn-group>btn:active": {
        "zIndex": 2
    },
    "btn-group>btn:focus": {
        "zIndex": 2
    },
    "btn-group>btn:hover": {
        "zIndex": 2
    },
    "btn-group btn+btn": {
        "marginLeft": -1
    },
    "btn-group btn+btn-group": {
        "marginLeft": -1
    },
    "btn-group btn-group+btn": {
        "marginLeft": -1
    },
    "btn-group btn-group+btn-group": {
        "marginLeft": -1
    },
    "btn-toolbar": {
        "marginLeft": -5
    },
    "btn-toolbar btn": {
        "float": "left"
    },
    "btn-toolbar btn-group": {
        "float": "left"
    },
    "btn-toolbar input-group": {
        "float": "left"
    },
    "btn-toolbar>btn": {
        "marginLeft": 5
    },
    "btn-toolbar>btn-group": {
        "marginLeft": 5
    },
    "btn-toolbar>input-group": {
        "marginLeft": 5
    },
    "btn-group>btn:not(:first-child):not(:last-child):not(dropdown-toggle)": {
        "borderRadius": 0
    },
    "btn-group>btn:first-child": {
        "marginLeft": 0
    },
    "btn-group>btn:first-child:not(:last-child):not(dropdown-toggle)": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "btn-group>btn:last-child:not(:first-child)": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "btn-group>dropdown-toggle:not(:first-child)": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "btn-group>btn-group": {
        "float": "left"
    },
    "btn-group>btn-group:not(:first-child):not(:last-child)>btn": {
        "borderRadius": 0
    },
    "btn-group>btn-group:first-child:not(:last-child)>btn:last-child": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "btn-group>btn-group:first-child:not(:last-child)>dropdown-toggle": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "btn-group>btn-group:last-child:not(:first-child)>btn:first-child": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "btn-group dropdown-toggle:active": {
        "outline": 0
    },
    "btn-groupopen dropdown-toggle": {
        "outline": 0,
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "btn-group>btn+dropdown-toggle": {
        "paddingLeft": 8,
        "paddingRight": 8
    },
    "btn-group>btn-lg+dropdown-toggle": {
        "paddingLeft": 12,
        "paddingRight": 12
    },
    "btn-groupopen dropdown-togglebtn-link": {
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "btn caret": {
        "marginLeft": 0
    },
    "btn-lg caret": {
        "borderWidth": "5px 5px 0"
    },
    "dropup btn-lg caret": {
        "borderWidth": "0 5px 5px"
    },
    "btn-group-vertical>btn-group": {
        "display": "block",
        "float": "none",
        "width": "100%",
        "maxWidth": "100%"
    },
    "btn-group-vertical>btn-group>btn": {
        "display": "block",
        "float": "none",
        "width": "100%",
        "maxWidth": "100%"
    },
    "btn-group-vertical>btn+btn": {
        "marginTop": -1,
        "marginLeft": 0
    },
    "btn-group-vertical>btn+btn-group": {
        "marginTop": -1,
        "marginLeft": 0
    },
    "btn-group-vertical>btn-group+btn": {
        "marginTop": -1,
        "marginLeft": 0
    },
    "btn-group-vertical>btn-group+btn-group": {
        "marginTop": -1,
        "marginLeft": 0
    },
    "btn-group-vertical>btn:not(:first-child):not(:last-child)": {
        "borderRadius": 0
    },
    "btn-group-vertical>btn:first-child:not(:last-child)": {
        "borderRadius": "4px 4px 0 0"
    },
    "btn-group-vertical>btn:last-child:not(:first-child)": {
        "borderRadius": "0 0 4px 4px"
    },
    "btn-group-vertical>btn-group:not(:first-child):not(:last-child)>btn": {
        "borderRadius": 0
    },
    "btn-group-vertical>btn-group:first-child:not(:last-child)>btn:last-child": {
        "borderBottomRightRadius": 0,
        "borderBottomLeftRadius": 0
    },
    "btn-group-vertical>btn-group:first-child:not(:last-child)>dropdown-toggle": {
        "borderBottomRightRadius": 0,
        "borderBottomLeftRadius": 0
    },
    "btn-group-vertical>btn-group:last-child:not(:first-child)>btn:first-child": {
        "borderTopRightRadius": 0,
        "borderTopLeftRadius": 0
    },
    "btn-group-justified": {
        "display": "table",
        "width": "100%",
        "tableLayout": "fixed",
        "borderCollapse": "separate"
    },
    "btn-group-justified>btn": {
        "float": "none",
        "display": "table-cell",
        "width": "1%"
    },
    "btn-group-justified>btn-group": {
        "float": "none",
        "display": "table-cell",
        "width": "1%"
    },
    "btn-group-justified>btn-group btn": {
        "width": "100%"
    },
    "btn-group-justified>btn-group dropdown-menu": {
        "left": "auto"
    },
    "[data-toggle=buttons]>btn input[type=checkbox]": {
        "position": "absolute",
        "clip": "rect(0,0,0,0)",
        "pointerEvents": "none"
    },
    "[data-toggle=buttons]>btn input[type=radio]": {
        "position": "absolute",
        "clip": "rect(0,0,0,0)",
        "pointerEvents": "none"
    },
    "[data-toggle=buttons]>btn-group>btn input[type=checkbox]": {
        "position": "absolute",
        "clip": "rect(0,0,0,0)",
        "pointerEvents": "none"
    },
    "[data-toggle=buttons]>btn-group>btn input[type=radio]": {
        "position": "absolute",
        "clip": "rect(0,0,0,0)",
        "pointerEvents": "none"
    },
    "input-group": {
        "position": "relative",
        "display": "table",
        "borderCollapse": "separate"
    },
    "input-group[class*=col-]": {
        "float": "none",
        "paddingLeft": 0,
        "paddingRight": 0
    },
    "input-group form-control": {
        "position": "relative",
        "zIndex": 2,
        "float": "left",
        "width": "100%",
        "marginBottom": 0,
        "display": "table-cell"
    },
    "input-group form-control:focus": {
        "zIndex": 3
    },
    "input-group-lg>form-control": {
        "height": 46,
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "input-group-lg>input-group-addon": {
        "height": 46,
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "input-group-lg>input-group-btn>btn": {
        "height": 46,
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333,
        "borderRadius": 6
    },
    "selectinput-group-lg>form-control": {
        "height": 46,
        "lineHeight": 46
    },
    "selectinput-group-lg>input-group-addon": {
        "height": 46,
        "lineHeight": 46
    },
    "selectinput-group-lg>input-group-btn>btn": {
        "height": 46,
        "lineHeight": 46
    },
    "select[multiple]input-group-lg>form-control": {
        "height": "auto"
    },
    "select[multiple]input-group-lg>input-group-addon": {
        "height": "auto"
    },
    "select[multiple]input-group-lg>input-group-btn>btn": {
        "height": "auto"
    },
    "textareainput-group-lg>form-control": {
        "height": "auto"
    },
    "textareainput-group-lg>input-group-addon": {
        "height": "auto"
    },
    "textareainput-group-lg>input-group-btn>btn": {
        "height": "auto"
    },
    "input-group-sm>form-control": {
        "height": 30,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "input-group-sm>input-group-addon": {
        "height": 30,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "input-group-sm>input-group-btn>btn": {
        "height": 30,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5,
        "borderRadius": 3
    },
    "selectinput-group-sm>form-control": {
        "height": 30,
        "lineHeight": 30
    },
    "selectinput-group-sm>input-group-addon": {
        "height": 30,
        "lineHeight": 30
    },
    "selectinput-group-sm>input-group-btn>btn": {
        "height": 30,
        "lineHeight": 30
    },
    "select[multiple]input-group-sm>form-control": {
        "height": "auto"
    },
    "select[multiple]input-group-sm>input-group-addon": {
        "height": "auto"
    },
    "select[multiple]input-group-sm>input-group-btn>btn": {
        "height": "auto"
    },
    "textareainput-group-sm>form-control": {
        "height": "auto"
    },
    "textareainput-group-sm>input-group-addon": {
        "height": "auto"
    },
    "textareainput-group-sm>input-group-btn>btn": {
        "height": "auto"
    },
    "input-group-addon": {
        "display": "table-cell",
        "width": "1%",
        "whiteSpace": "nowrap",
        "verticalAlign": "middle",
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "fontSize": 14,
        "fontWeight": "400",
        "lineHeight": 1,
        "color": "#555",
        "textAlign": "center",
        "backgroundColor": "#eee",
        "border": "1px solid #ccc",
        "borderRadius": 4
    },
    "input-group-btn": {
        "display": "table-cell",
        "width": "1%",
        "whiteSpace": "nowrap",
        "verticalAlign": "middle",
        "position": "relative",
        "fontSize": 0
    },
    "input-group form-control:not(:first-child):not(:last-child)": {
        "borderRadius": 0
    },
    "input-group-addon:not(:first-child):not(:last-child)": {
        "borderRadius": 0
    },
    "input-group-btn:not(:first-child):not(:last-child)": {
        "borderRadius": 0
    },
    "input-group-addoninput-sm": {
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "borderRadius": 3
    },
    "input-group-addoninput-lg": {
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "borderRadius": 6
    },
    "input-group-addon input[type=checkbox]": {
        "marginTop": 0
    },
    "input-group-addon input[type=radio]": {
        "marginTop": 0
    },
    "input-group form-control:first-child": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "input-group-addon:first-child": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0,
        "borderRight": 0
    },
    "input-group-btn:first-child>btn": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0,
        "marginRight": -1
    },
    "input-group-btn:first-child>btn-group>btn": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "input-group-btn:first-child>dropdown-toggle": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "input-group-btn:last-child>btn-group:not(:last-child)>btn": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "input-group-btn:last-child>btn:not(:last-child):not(dropdown-toggle)": {
        "borderBottomRightRadius": 0,
        "borderTopRightRadius": 0
    },
    "input-group form-control:last-child": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "input-group-addon:last-child": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0,
        "borderLeft": 0
    },
    "input-group-btn:first-child>btn-group:not(:first-child)>btn": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "input-group-btn:first-child>btn:not(:first-child)": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "input-group-btn:last-child>btn": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0,
        "zIndex": 2,
        "marginLeft": -1
    },
    "input-group-btn:last-child>btn-group>btn": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "input-group-btn:last-child>dropdown-toggle": {
        "borderBottomLeftRadius": 0,
        "borderTopLeftRadius": 0
    },
    "input-group-btn>btn": {
        "position": "relative"
    },
    "input-group-btn>btn+btn": {
        "marginLeft": -1
    },
    "input-group-btn>btn:active": {
        "zIndex": 2
    },
    "input-group-btn>btn:focus": {
        "zIndex": 2
    },
    "input-group-btn>btn:hover": {
        "zIndex": 2
    },
    "input-group-btn:first-child>btn-group": {
        "marginRight": -1
    },
    "input-group-btn:last-child>btn-group": {
        "zIndex": 2,
        "marginLeft": -1
    },
    "nav>li": {
        "position": "relative",
        "display": "block"
    },
    "nav>li>a": {
        "position": "relative",
        "display": "block",
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15
    },
    "nav>li>a:focus": {
        "textDecoration": "none",
        "backgroundColor": "#eee"
    },
    "nav>li>a:hover": {
        "textDecoration": "none",
        "backgroundColor": "#eee"
    },
    "nav>lidisabled>a": {
        "color": "#777"
    },
    "nav>lidisabled>a:focus": {
        "color": "#777",
        "textDecoration": "none",
        "backgroundColor": "transparent",
        "cursor": "not-allowed"
    },
    "nav>lidisabled>a:hover": {
        "color": "#777",
        "textDecoration": "none",
        "backgroundColor": "transparent",
        "cursor": "not-allowed"
    },
    "nav open>a": {
        "backgroundColor": "#eee",
        "borderColor": "#000"
    },
    "nav open>a:focus": {
        "backgroundColor": "#eee",
        "borderColor": "#000"
    },
    "nav open>a:hover": {
        "backgroundColor": "#eee",
        "borderColor": "#000"
    },
    "nav nav-divider": {
        "height": 1,
        "marginTop": 9,
        "marginRight": 0,
        "marginBottom": 9,
        "marginLeft": 0,
        "overflow": "hidden",
        "backgroundColor": "#e5e5e5"
    },
    "nav>li>a>img": {
        "maxWidth": "none"
    },
    "nav-tabs": {
        "borderBottom": "1px solid #ddd"
    },
    "nav-tabs>li": {
        "float": "left",
        "marginBottom": -1
    },
    "nav-tabs>li>a": {
        "marginRight": 2,
        "lineHeight": 1.42857143,
        "border": "1px solid transparent",
        "borderRadius": "4px 4px 0 0"
    },
    "nav-tabs>li>a:hover": {
        "borderColor": "#eee #eee #ddd"
    },
    "nav-tabs>liactive>a": {
        "color": "#555",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderBottomColor": "transparent",
        "cursor": "default"
    },
    "nav-tabs>liactive>a:focus": {
        "color": "#555",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderBottomColor": "transparent",
        "cursor": "default"
    },
    "nav-tabs>liactive>a:hover": {
        "color": "#555",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderBottomColor": "transparent",
        "cursor": "default"
    },
    "nav-tabsnav-justified": {
        "width": "100%",
        "borderBottom": 0
    },
    "nav-tabsnav-justified>li": {
        "float": "none"
    },
    "nav-tabsnav-justified>li>a": {
        "textAlign": "center",
        "marginBottom": 5,
        "marginRight": 0,
        "borderRadius": 4
    },
    "nav-tabsnav-justified>dropdown dropdown-menu": {
        "top": "auto",
        "left": "auto"
    },
    "nav-tabsnav-justified>active>a": {
        "border": "1px solid #ddd"
    },
    "nav-tabsnav-justified>active>a:focus": {
        "border": "1px solid #ddd"
    },
    "nav-tabsnav-justified>active>a:hover": {
        "border": "1px solid #ddd"
    },
    "nav-pills>li": {
        "float": "left"
    },
    "nav-pills>li>a": {
        "borderRadius": 4
    },
    "nav-pills>li+li": {
        "marginLeft": 2
    },
    "nav-pills>liactive>a": {
        "color": "#fff",
        "backgroundColor": "#337ab7"
    },
    "nav-pills>liactive>a:focus": {
        "color": "#fff",
        "backgroundColor": "#337ab7"
    },
    "nav-pills>liactive>a:hover": {
        "color": "#fff",
        "backgroundColor": "#337ab7"
    },
    "nav-stacked>li": {
        "float": "none"
    },
    "nav-stacked>li+li": {
        "marginTop": 2,
        "marginLeft": 0
    },
    "nav-justified": {
        "width": "100%"
    },
    "nav-justified>li": {
        "float": "none"
    },
    "nav-justified>li>a": {
        "textAlign": "center",
        "marginBottom": 5
    },
    "nav-justified>dropdown dropdown-menu": {
        "top": "auto",
        "left": "auto"
    },
    "nav-tabs-justified": {
        "borderBottom": 0
    },
    "nav-tabs-justified>li>a": {
        "marginRight": 0,
        "borderRadius": 4
    },
    "nav-tabs-justified>active>a": {
        "border": "1px solid #ddd"
    },
    "nav-tabs-justified>active>a:focus": {
        "border": "1px solid #ddd"
    },
    "nav-tabs-justified>active>a:hover": {
        "border": "1px solid #ddd"
    },
    "tab-content>tab-pane": {
        "display": "none"
    },
    "tab-content>active": {
        "display": "block"
    },
    "nav-tabs dropdown-menu": {
        "marginTop": -1,
        "borderTopRightRadius": 0,
        "borderTopLeftRadius": 0
    },
    "navbar": {
        "position": "relative",
        "minHeight": 50,
        "marginBottom": 20,
        "border": "1px solid transparent"
    },
    "navbar-collapse": {
        "overflowX": "visible",
        "paddingRight": 15,
        "paddingLeft": 15,
        "borderTop": "1px solid transparent",
        "boxShadow": "inset 0 1px 0 rgba(255,255,255,.1)",
        "WebkitOverflowScrolling": "touch"
    },
    "navbar-collapsein": {
        "overflowY": "auto"
    },
    "navbar-fixed-bottom navbar-collapse": {
        "maxHeight": 340
    },
    "navbar-fixed-top navbar-collapse": {
        "maxHeight": 340
    },
    "container-fluid>navbar-collapse": {
        "marginRight": -15,
        "marginLeft": -15
    },
    "container-fluid>navbar-header": {
        "marginRight": -15,
        "marginLeft": -15
    },
    "container>navbar-collapse": {
        "marginRight": -15,
        "marginLeft": -15
    },
    "container>navbar-header": {
        "marginRight": -15,
        "marginLeft": -15
    },
    "navbar-static-top": {
        "zIndex": 1000,
        "borderWidth": "0 0 1px"
    },
    "navbar-fixed-bottom": {
        "position": "fixed",
        "right": 0,
        "left": 0,
        "zIndex": 1030,
        "bottom": 0,
        "marginBottom": 0,
        "borderWidth": "1px 0 0"
    },
    "navbar-fixed-top": {
        "position": "fixed",
        "right": 0,
        "left": 0,
        "zIndex": 1030,
        "top": 0,
        "borderWidth": "0 0 1px"
    },
    "navbar-brand": {
        "float": "left",
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "fontSize": 18,
        "lineHeight": 20,
        "height": 50
    },
    "navbar-brand:focus": {
        "textDecoration": "none"
    },
    "navbar-brand:hover": {
        "textDecoration": "none"
    },
    "navbar-brand>img": {
        "display": "block"
    },
    "navbar-toggle": {
        "position": "relative",
        "float": "right",
        "marginRight": 15,
        "paddingTop": 9,
        "paddingRight": 10,
        "paddingBottom": 9,
        "paddingLeft": 10,
        "marginTop": 8,
        "marginBottom": 8,
        "backgroundColor": "transparent",
        "backgroundImage": "none",
        "border": "1px solid transparent",
        "borderRadius": 4
    },
    "navbar-toggle:focus": {
        "outline": 0
    },
    "navbar-toggle icon-bar": {
        "display": "block",
        "width": 22,
        "height": 2,
        "borderRadius": 1
    },
    "navbar-toggle icon-bar+icon-bar": {
        "marginTop": 4
    },
    "navbar-nav": {
        "marginTop": 7.5,
        "marginRight": -15,
        "marginBottom": 7.5,
        "marginLeft": -15
    },
    "navbar-nav>li>a": {
        "paddingTop": 10,
        "paddingBottom": 10,
        "lineHeight": 20
    },
    "navbar-form": {
        "marginTop": 8,
        "marginRight": -15,
        "marginBottom": 8,
        "marginLeft": -15,
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "borderTop": "1px solid transparent",
        "borderBottom": "1px solid transparent",
        "WebkitBoxShadow": "inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1)",
        "boxShadow": "inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1)"
    },
    "navbar-nav>li>dropdown-menu": {
        "marginTop": 0,
        "borderTopRightRadius": 0,
        "borderTopLeftRadius": 0
    },
    "navbar-fixed-bottom navbar-nav>li>dropdown-menu": {
        "marginBottom": 0,
        "borderRadius": "4px 4px 0 0"
    },
    "navbar-btn": {
        "marginTop": 8,
        "marginBottom": 8
    },
    "navbar-btnbtn-sm": {
        "marginTop": 10,
        "marginBottom": 10
    },
    "navbar-btnbtn-xs": {
        "marginTop": 14,
        "marginBottom": 14
    },
    "navbar-text": {
        "marginTop": 15,
        "marginBottom": 15
    },
    "navbar-default": {
        "backgroundColor": "#f8f8f8",
        "borderColor": "#e7e7e7"
    },
    "navbar-default navbar-brand": {
        "color": "#777"
    },
    "navbar-default navbar-brand:focus": {
        "color": "#5e5e5e",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-brand:hover": {
        "color": "#5e5e5e",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-nav>li>a": {
        "color": "#777"
    },
    "navbar-default navbar-text": {
        "color": "#777"
    },
    "navbar-default navbar-nav>li>a:focus": {
        "color": "#333",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-nav>li>a:hover": {
        "color": "#333",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-nav>active>a": {
        "color": "#555",
        "backgroundColor": "#e7e7e7"
    },
    "navbar-default navbar-nav>active>a:focus": {
        "color": "#555",
        "backgroundColor": "#e7e7e7"
    },
    "navbar-default navbar-nav>active>a:hover": {
        "color": "#555",
        "backgroundColor": "#e7e7e7"
    },
    "navbar-default navbar-nav>disabled>a": {
        "color": "#ccc",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-nav>disabled>a:focus": {
        "color": "#ccc",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-nav>disabled>a:hover": {
        "color": "#ccc",
        "backgroundColor": "transparent"
    },
    "navbar-default navbar-toggle": {
        "borderColor": "#ddd"
    },
    "navbar-default navbar-toggle:focus": {
        "backgroundColor": "#ddd"
    },
    "navbar-default navbar-toggle:hover": {
        "backgroundColor": "#ddd"
    },
    "navbar-default navbar-toggle icon-bar": {
        "backgroundColor": "#888"
    },
    "navbar-default navbar-collapse": {
        "borderColor": "#e7e7e7"
    },
    "navbar-default navbar-form": {
        "borderColor": "#e7e7e7"
    },
    "navbar-default navbar-nav>open>a": {
        "backgroundColor": "#e7e7e7",
        "color": "#555"
    },
    "navbar-default navbar-nav>open>a:focus": {
        "backgroundColor": "#e7e7e7",
        "color": "#555"
    },
    "navbar-default navbar-nav>open>a:hover": {
        "backgroundColor": "#e7e7e7",
        "color": "#555"
    },
    "navbar-default navbar-link": {
        "color": "#777"
    },
    "navbar-default navbar-link:hover": {
        "color": "#333"
    },
    "navbar-default btn-link": {
        "color": "#777"
    },
    "navbar-default btn-link:focus": {
        "color": "#333"
    },
    "navbar-default btn-link:hover": {
        "color": "#333"
    },
    "navbar-default btn-link[disabled]:focus": {
        "color": "#ccc"
    },
    "navbar-default btn-link[disabled]:hover": {
        "color": "#ccc"
    },
    "fieldset[disabled] navbar-default btn-link:focus": {
        "color": "#ccc"
    },
    "fieldset[disabled] navbar-default btn-link:hover": {
        "color": "#ccc"
    },
    "navbar-inverse": {
        "backgroundColor": "#222",
        "borderColor": "#080808"
    },
    "navbar-inverse navbar-brand": {
        "color": "#9d9d9d"
    },
    "navbar-inverse navbar-brand:focus": {
        "color": "#fff",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-brand:hover": {
        "color": "#fff",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-nav>li>a": {
        "color": "#9d9d9d"
    },
    "navbar-inverse navbar-text": {
        "color": "#9d9d9d"
    },
    "navbar-inverse navbar-nav>li>a:focus": {
        "color": "#fff",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-nav>li>a:hover": {
        "color": "#fff",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-nav>active>a": {
        "color": "#fff",
        "backgroundColor": "#080808"
    },
    "navbar-inverse navbar-nav>active>a:focus": {
        "color": "#fff",
        "backgroundColor": "#080808"
    },
    "navbar-inverse navbar-nav>active>a:hover": {
        "color": "#fff",
        "backgroundColor": "#080808"
    },
    "navbar-inverse navbar-nav>disabled>a": {
        "color": "#444",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-nav>disabled>a:focus": {
        "color": "#444",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-nav>disabled>a:hover": {
        "color": "#444",
        "backgroundColor": "transparent"
    },
    "navbar-inverse navbar-toggle": {
        "borderColor": "#333"
    },
    "navbar-inverse navbar-toggle:focus": {
        "backgroundColor": "#333"
    },
    "navbar-inverse navbar-toggle:hover": {
        "backgroundColor": "#333"
    },
    "navbar-inverse navbar-toggle icon-bar": {
        "backgroundColor": "#fff"
    },
    "navbar-inverse navbar-collapse": {
        "borderColor": "#101010"
    },
    "navbar-inverse navbar-form": {
        "borderColor": "#101010"
    },
    "navbar-inverse navbar-nav>open>a": {
        "backgroundColor": "#080808",
        "color": "#fff"
    },
    "navbar-inverse navbar-nav>open>a:focus": {
        "backgroundColor": "#080808",
        "color": "#fff"
    },
    "navbar-inverse navbar-nav>open>a:hover": {
        "backgroundColor": "#080808",
        "color": "#fff"
    },
    "navbar-inverse navbar-link": {
        "color": "#9d9d9d"
    },
    "navbar-inverse navbar-link:hover": {
        "color": "#fff"
    },
    "navbar-inverse btn-link": {
        "color": "#9d9d9d"
    },
    "navbar-inverse btn-link:focus": {
        "color": "#fff"
    },
    "navbar-inverse btn-link:hover": {
        "color": "#fff"
    },
    "navbar-inverse btn-link[disabled]:focus": {
        "color": "#444"
    },
    "navbar-inverse btn-link[disabled]:hover": {
        "color": "#444"
    },
    "fieldset[disabled] navbar-inverse btn-link:focus": {
        "color": "#444"
    },
    "fieldset[disabled] navbar-inverse btn-link:hover": {
        "color": "#444"
    },
    "breadcrumb": {
        "paddingTop": 8,
        "paddingRight": 15,
        "paddingBottom": 8,
        "paddingLeft": 15,
        "marginBottom": 20,
        "listStyle": "none",
        "backgroundColor": "#f5f5f5",
        "borderRadius": 4
    },
    "breadcrumb>li": {
        "display": "inline-block"
    },
    "breadcrumb>li+li:before": {
        "content": "/\\00a0",
        "paddingTop": 0,
        "paddingRight": 5,
        "paddingBottom": 0,
        "paddingLeft": 5,
        "color": "#ccc"
    },
    "breadcrumb>active": {
        "color": "#777"
    },
    "pagination": {
        "display": "inline-block",
        "paddingLeft": 0,
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "borderRadius": 4
    },
    "pagination>li": {
        "display": "inline"
    },
    "pagination>li>a": {
        "position": "relative",
        "float": "left",
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "lineHeight": 1.42857143,
        "textDecoration": "none",
        "color": "#000",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "marginLeft": -1
    },
    "pagination>li>span": {
        "position": "relative",
        "float": "left",
        "paddingTop": 6,
        "paddingRight": 12,
        "paddingBottom": 6,
        "paddingLeft": 12,
        "lineHeight": 1.42857143,
        "textDecoration": "none",
        "color": "#000",
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "marginLeft": -1
    },
    "pagination>li:first-child>a": {
        "marginLeft": 0,
        "borderBottomLeftRadius": 4,
        "borderTopLeftRadius": 4
    },
    "pagination>li:first-child>span": {
        "marginLeft": 0,
        "borderBottomLeftRadius": 4,
        "borderTopLeftRadius": 4
    },
    "pagination>li:last-child>a": {
        "borderBottomRightRadius": 4,
        "borderTopRightRadius": 4
    },
    "pagination>li:last-child>span": {
        "borderBottomRightRadius": 4,
        "borderTopRightRadius": 4
    },
    "pagination>li>a:focus": {
        "zIndex": 2,
        "color": "#000",
        "backgroundColor": "#eee",
        "borderColor": "#ddd"
    },
    "pagination>li>a:hover": {
        "zIndex": 2,
        "color": "#000",
        "backgroundColor": "#eee",
        "borderColor": "#ddd"
    },
    "pagination>li>span:focus": {
        "zIndex": 2,
        "color": "#000",
        "backgroundColor": "#eee",
        "borderColor": "#ddd"
    },
    "pagination>li>span:hover": {
        "zIndex": 2,
        "color": "#000",
        "backgroundColor": "#eee",
        "borderColor": "#ddd"
    },
    "pagination>active>a": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>active>a:focus": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>active>a:hover": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>active>span": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>active>span:focus": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>active>span:hover": {
        "zIndex": 3,
        "color": "#fff",
        "cursor": "default",
        "backgroundColor": "#f3291b",
        "borderColor": "#da190b"
    },
    "pagination>disabled>a": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination>disabled>a:focus": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination>disabled>a:hover": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination>disabled>span": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination>disabled>span:focus": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination>disabled>span:hover": {
        "color": "#777",
        "backgroundColor": "#fff",
        "borderColor": "#ddd",
        "cursor": "not-allowed"
    },
    "pagination-lg>li>a": {
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333
    },
    "pagination-lg>li>span": {
        "paddingTop": 10,
        "paddingRight": 16,
        "paddingBottom": 10,
        "paddingLeft": 16,
        "fontSize": 18,
        "lineHeight": 1.3333333
    },
    "pagination-lg>li:first-child>a": {
        "borderBottomLeftRadius": 6,
        "borderTopLeftRadius": 6
    },
    "pagination-lg>li:first-child>span": {
        "borderBottomLeftRadius": 6,
        "borderTopLeftRadius": 6
    },
    "pagination-lg>li:last-child>a": {
        "borderBottomRightRadius": 6,
        "borderTopRightRadius": 6
    },
    "pagination-lg>li:last-child>span": {
        "borderBottomRightRadius": 6,
        "borderTopRightRadius": 6
    },
    "pagination-sm>li>a": {
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5
    },
    "pagination-sm>li>span": {
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 5,
        "paddingLeft": 10,
        "fontSize": 12,
        "lineHeight": 1.5
    },
    "pagination-sm>li:first-child>a": {
        "borderBottomLeftRadius": 3,
        "borderTopLeftRadius": 3
    },
    "pagination-sm>li:first-child>span": {
        "borderBottomLeftRadius": 3,
        "borderTopLeftRadius": 3
    },
    "pagination-sm>li:last-child>a": {
        "borderBottomRightRadius": 3,
        "borderTopRightRadius": 3
    },
    "pagination-sm>li:last-child>span": {
        "borderBottomRightRadius": 3,
        "borderTopRightRadius": 3
    },
    "pager": {
        "paddingLeft": 0,
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "listStyle": "none",
        "textAlign": "center"
    },
    "pager li": {
        "display": "inline"
    },
    "pager li>a": {
        "display": "inline-block",
        "paddingTop": 5,
        "paddingRight": 14,
        "paddingBottom": 5,
        "paddingLeft": 14,
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderRadius": 15
    },
    "pager li>span": {
        "display": "inline-block",
        "paddingTop": 5,
        "paddingRight": 14,
        "paddingBottom": 5,
        "paddingLeft": 14,
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderRadius": 15
    },
    "pager li>a:focus": {
        "textDecoration": "none",
        "backgroundColor": "#eee"
    },
    "pager li>a:hover": {
        "textDecoration": "none",
        "backgroundColor": "#eee"
    },
    "pager next>a": {
        "float": "right"
    },
    "pager next>span": {
        "float": "right"
    },
    "pager previous>a": {
        "float": "left"
    },
    "pager previous>span": {
        "float": "left"
    },
    "pager disabled>a": {
        "color": "#777",
        "backgroundColor": "#fff",
        "cursor": "not-allowed"
    },
    "pager disabled>a:focus": {
        "color": "#777",
        "backgroundColor": "#fff",
        "cursor": "not-allowed"
    },
    "pager disabled>a:hover": {
        "color": "#777",
        "backgroundColor": "#fff",
        "cursor": "not-allowed"
    },
    "pager disabled>span": {
        "color": "#777",
        "backgroundColor": "#fff",
        "cursor": "not-allowed"
    },
    "alabel:focus": {
        "color": "#fff",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "alabel:hover": {
        "color": "#fff",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "label:empty": {
        "display": "none"
    },
    "btn label": {
        "position": "relative",
        "top": -1
    },
    "label-default": {
        "backgroundColor": "#777"
    },
    "label-default[href]:focus": {
        "backgroundColor": "#5e5e5e"
    },
    "label-default[href]:hover": {
        "backgroundColor": "#5e5e5e"
    },
    "label-primary": {
        "backgroundColor": "#337ab7"
    },
    "label-primary[href]:focus": {
        "backgroundColor": "#286090"
    },
    "label-primary[href]:hover": {
        "backgroundColor": "#286090"
    },
    "label-success": {
        "backgroundColor": "#5cb85c"
    },
    "label-success[href]:focus": {
        "backgroundColor": "#449d44"
    },
    "label-success[href]:hover": {
        "backgroundColor": "#449d44"
    },
    "label-info": {
        "backgroundColor": "#5bc0de"
    },
    "label-info[href]:focus": {
        "backgroundColor": "#31b0d5"
    },
    "label-info[href]:hover": {
        "backgroundColor": "#31b0d5"
    },
    "label-warning": {
        "backgroundColor": "#f0ad4e"
    },
    "label-warning[href]:focus": {
        "backgroundColor": "#ec971f"
    },
    "label-warning[href]:hover": {
        "backgroundColor": "#ec971f"
    },
    "label-danger": {
        "backgroundColor": "#d9534f"
    },
    "label-danger[href]:focus": {
        "backgroundColor": "#c9302c"
    },
    "label-danger[href]:hover": {
        "backgroundColor": "#c9302c"
    },
    "badge": {
        "display": "inline-block",
        "minWidth": 10,
        "paddingTop": 3,
        "paddingRight": 7,
        "paddingBottom": 3,
        "paddingLeft": 7,
        "fontSize": 12,
        "fontWeight": "700",
        "color": "#fff",
        "lineHeight": 1,
        "verticalAlign": "middle",
        "whiteSpace": "nowrap",
        "textAlign": "center",
        "backgroundColor": "#777",
        "borderRadius": 10
    },
    "badge:empty": {
        "display": "none"
    },
    "btn badge": {
        "position": "relative",
        "top": -1
    },
    "btn-group-xs>btn badge": {
        "top": 0,
        "paddingTop": 1,
        "paddingRight": 5,
        "paddingBottom": 1,
        "paddingLeft": 5
    },
    "btn-xs badge": {
        "top": 0,
        "paddingTop": 1,
        "paddingRight": 5,
        "paddingBottom": 1,
        "paddingLeft": 5
    },
    "abadge:focus": {
        "color": "#fff",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "abadge:hover": {
        "color": "#fff",
        "textDecoration": "none",
        "cursor": "pointer"
    },
    "list-group-itemactive>badge": {
        "color": "#000",
        "backgroundColor": "#fff"
    },
    "nav-pills>active>a>badge": {
        "color": "#000",
        "backgroundColor": "#fff"
    },
    "list-group-item>badge": {
        "float": "right"
    },
    "list-group-item>badge+badge": {
        "marginRight": 5
    },
    "nav-pills>li>a>badge": {
        "marginLeft": 3
    },
    "jumbotron": {
        "paddingTop": 30,
        "paddingBottom": 30,
        "marginBottom": 30,
        "color": "inherit",
        "backgroundColor": "#eee"
    },
    "jumbotron h1": {
        "color": "inherit"
    },
    "jumbotron p": {
        "marginBottom": 15,
        "fontSize": 21,
        "fontWeight": "200"
    },
    "jumbotron>hr": {
        "borderTopColor": "#d5d5d5"
    },
    "container jumbotron": {
        "borderRadius": 6,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "container-fluid jumbotron": {
        "borderRadius": 6,
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "jumbotron container": {
        "maxWidth": "100%"
    },
    "thumbnail": {
        "display": "block",
        "paddingTop": 4,
        "paddingRight": 4,
        "paddingBottom": 4,
        "paddingLeft": 4,
        "marginBottom": 20,
        "lineHeight": 1.42857143,
        "backgroundColor": "#fff",
        "border": "1px solid #ddd",
        "borderRadius": 4,
        "WebkitTransition": "border .2s ease-in-out",
        "OTransition": "border .2s ease-in-out",
        "transition": "border .2s ease-in-out"
    },
    "athumbnailactive": {
        "borderColor": "#000"
    },
    "athumbnail:focus": {
        "borderColor": "#000"
    },
    "athumbnail:hover": {
        "borderColor": "#000"
    },
    "thumbnail caption": {
        "paddingTop": 9,
        "paddingRight": 9,
        "paddingBottom": 9,
        "paddingLeft": 9,
        "color": "#333434"
    },
    "alert": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "marginBottom": 20,
        "border": "1px solid transparent",
        "borderRadius": 4
    },
    "alert h4": {
        "marginTop": 0,
        "color": "inherit"
    },
    "alert alert-link": {
        "fontWeight": "700"
    },
    "alert>p": {
        "marginBottom": 0
    },
    "alert>ul": {
        "marginBottom": 0
    },
    "alert>p+p": {
        "marginTop": 5
    },
    "alert-dismissable": {
        "paddingRight": 35
    },
    "alert-dismissible": {
        "paddingRight": 35
    },
    "alert-dismissable close": {
        "position": "relative",
        "top": -2,
        "right": -21,
        "color": "inherit"
    },
    "alert-dismissible close": {
        "position": "relative",
        "top": -2,
        "right": -21,
        "color": "inherit"
    },
    "alert-success": {
        "backgroundColor": "#dff0d8",
        "borderColor": "#d6e9c6",
        "color": "#3c763d"
    },
    "alert-success hr": {
        "borderTopColor": "#c9e2b3"
    },
    "alert-success alert-link": {
        "color": "#2b542c"
    },
    "alert-info": {
        "backgroundColor": "#d9edf7",
        "borderColor": "#bce8f1",
        "color": "#31708f"
    },
    "alert-info hr": {
        "borderTopColor": "#a6e1ec"
    },
    "alert-info alert-link": {
        "color": "#245269"
    },
    "alert-warning": {
        "backgroundColor": "#fcf8e3",
        "borderColor": "#faebcc",
        "color": "#8a6d3b"
    },
    "alert-warning hr": {
        "borderTopColor": "#f7e1b5"
    },
    "alert-warning alert-link": {
        "color": "#66512c"
    },
    "alert-danger": {
        "backgroundColor": "#f2dede",
        "borderColor": "#ebccd1",
        "color": "#a94442"
    },
    "alert-danger hr": {
        "borderTopColor": "#e4b9c0"
    },
    "alert-danger alert-link": {
        "color": "#843534"
    },
    "progress-bar": {
        "float": "left",
        "width": 0,
        "height": "100%",
        "fontSize": 12,
        "lineHeight": 20,
        "color": "#fff",
        "textAlign": "center",
        "backgroundColor": "#337ab7",
        "WebkitBoxShadow": "inset 0 -1px 0 rgba(0,0,0,.15)",
        "boxShadow": "inset 0 -1px 0 rgba(0,0,0,.15)",
        "WebkitTransition": "width .6s ease",
        "OTransition": "width .6s ease",
        "transition": "width .6s ease"
    },
    "progress-bar-striped": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
        "backgroundSize": "40px 40px"
    },
    "progress-striped progress-bar": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
        "backgroundSize": "40px 40px"
    },
    "progress-baractive": {
        "WebkitAnimation": "progress-bar-stripes 2s linear infinite",
        "OAnimation": "progress-bar-stripes 2s linear infinite",
        "animation": "progress-bar-stripes 2s linear infinite"
    },
    "progressactive progress-bar": {
        "WebkitAnimation": "progress-bar-stripes 2s linear infinite",
        "OAnimation": "progress-bar-stripes 2s linear infinite",
        "animation": "progress-bar-stripes 2s linear infinite"
    },
    "progress-bar-success": {
        "backgroundColor": "#5cb85c"
    },
    "progress-striped progress-bar-success": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)"
    },
    "progress-bar-info": {
        "backgroundColor": "#5bc0de"
    },
    "progress-striped progress-bar-info": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)"
    },
    "progress-bar-warning": {
        "backgroundColor": "#f0ad4e"
    },
    "progress-striped progress-bar-warning": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)"
    },
    "progress-bar-danger": {
        "backgroundColor": "#d9534f"
    },
    "progress-striped progress-bar-danger": {
        "backgroundImage": "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)"
    },
    "media": {
        "marginTop": 15,
        "zoom": 1,
        "overflow": "hidden"
    },
    "media:first-child": {
        "marginTop": 0
    },
    "media-body": {
        "zoom": 1,
        "overflow": "hidden",
        "width": 10000,
        "display": "table-cell",
        "verticalAlign": "top"
    },
    "media-object": {
        "display": "block"
    },
    "media-objectimg-thumbnail": {
        "maxWidth": "none"
    },
    "media-right": {
        "paddingLeft": 10,
        "display": "table-cell",
        "verticalAlign": "top"
    },
    "media>pull-right": {
        "paddingLeft": 10
    },
    "media-left": {
        "paddingRight": 10,
        "display": "table-cell",
        "verticalAlign": "top"
    },
    "media>pull-left": {
        "paddingRight": 10
    },
    "media-middle": {
        "verticalAlign": "middle"
    },
    "media-bottom": {
        "verticalAlign": "bottom"
    },
    "media-heading": {
        "marginTop": 0,
        "marginBottom": 5
    },
    "media-list": {
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "list-group": {
        "marginBottom": 20,
        "paddingLeft": 0
    },
    "list-group-item": {
        "position": "relative",
        "display": "block",
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "marginBottom": -1,
        "backgroundColor": "#fff",
        "border": "1px solid #ddd"
    },
    "list-group-item:first-child": {
        "borderTopRightRadius": 4,
        "borderTopLeftRadius": 4
    },
    "list-group-item:last-child": {
        "marginBottom": 0,
        "borderBottomRightRadius": 4,
        "borderBottomLeftRadius": 4
    },
    "alist-group-item": {
        "color": "#555"
    },
    "buttonlist-group-item": {
        "color": "#555",
        "width": "100%",
        "textAlign": "left"
    },
    "alist-group-item list-group-item-heading": {
        "color": "#333"
    },
    "buttonlist-group-item list-group-item-heading": {
        "color": "#333"
    },
    "alist-group-item:focus": {
        "textDecoration": "none",
        "color": "#555",
        "backgroundColor": "#f5f5f5"
    },
    "alist-group-item:hover": {
        "textDecoration": "none",
        "color": "#555",
        "backgroundColor": "#f5f5f5"
    },
    "buttonlist-group-item:focus": {
        "textDecoration": "none",
        "color": "#555",
        "backgroundColor": "#f5f5f5"
    },
    "buttonlist-group-item:hover": {
        "textDecoration": "none",
        "color": "#555",
        "backgroundColor": "#f5f5f5"
    },
    "list-group-itemdisabled": {
        "backgroundColor": "#eee",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "list-group-itemdisabled:focus": {
        "backgroundColor": "#eee",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "list-group-itemdisabled:hover": {
        "backgroundColor": "#eee",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "list-group-itemdisabled list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemdisabled:focus list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemdisabled:hover list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemdisabled list-group-item-text": {
        "color": "#777"
    },
    "list-group-itemdisabled:focus list-group-item-text": {
        "color": "#777"
    },
    "list-group-itemdisabled:hover list-group-item-text": {
        "color": "#777"
    },
    "list-group-itemactive": {
        "zIndex": 2,
        "color": "#fff",
        "backgroundColor": "#337ab7",
        "borderColor": "#337ab7"
    },
    "list-group-itemactive:focus": {
        "zIndex": 2,
        "color": "#fff",
        "backgroundColor": "#337ab7",
        "borderColor": "#337ab7"
    },
    "list-group-itemactive:hover": {
        "zIndex": 2,
        "color": "#fff",
        "backgroundColor": "#337ab7",
        "borderColor": "#337ab7"
    },
    "list-group-itemactive list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemactive list-group-item-heading>small": {
        "color": "inherit"
    },
    "list-group-itemactive:focus list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemactive:focus list-group-item-heading>small": {
        "color": "inherit"
    },
    "list-group-itemactive:hover list-group-item-heading": {
        "color": "inherit"
    },
    "list-group-itemactive:hover list-group-item-heading>small": {
        "color": "inherit"
    },
    "list-group-itemactive list-group-item-text": {
        "color": "#c7ddef"
    },
    "list-group-itemactive:focus list-group-item-text": {
        "color": "#c7ddef"
    },
    "list-group-itemactive:hover list-group-item-text": {
        "color": "#c7ddef"
    },
    "list-group-item-success": {
        "color": "#3c763d",
        "backgroundColor": "#dff0d8"
    },
    "alist-group-item-success": {
        "color": "#3c763d"
    },
    "buttonlist-group-item-success": {
        "color": "#3c763d"
    },
    "alist-group-item-success list-group-item-heading": {
        "color": "inherit"
    },
    "buttonlist-group-item-success list-group-item-heading": {
        "color": "inherit"
    },
    "alist-group-item-success:focus": {
        "color": "#3c763d",
        "backgroundColor": "#d0e9c6"
    },
    "alist-group-item-success:hover": {
        "color": "#3c763d",
        "backgroundColor": "#d0e9c6"
    },
    "buttonlist-group-item-success:focus": {
        "color": "#3c763d",
        "backgroundColor": "#d0e9c6"
    },
    "buttonlist-group-item-success:hover": {
        "color": "#3c763d",
        "backgroundColor": "#d0e9c6"
    },
    "alist-group-item-successactive": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "alist-group-item-successactive:focus": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "alist-group-item-successactive:hover": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "buttonlist-group-item-successactive": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "buttonlist-group-item-successactive:focus": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "buttonlist-group-item-successactive:hover": {
        "color": "#fff",
        "backgroundColor": "#3c763d",
        "borderColor": "#3c763d"
    },
    "list-group-item-info": {
        "color": "#31708f",
        "backgroundColor": "#d9edf7"
    },
    "alist-group-item-info": {
        "color": "#31708f"
    },
    "buttonlist-group-item-info": {
        "color": "#31708f"
    },
    "alist-group-item-info list-group-item-heading": {
        "color": "inherit"
    },
    "buttonlist-group-item-info list-group-item-heading": {
        "color": "inherit"
    },
    "alist-group-item-info:focus": {
        "color": "#31708f",
        "backgroundColor": "#c4e3f3"
    },
    "alist-group-item-info:hover": {
        "color": "#31708f",
        "backgroundColor": "#c4e3f3"
    },
    "buttonlist-group-item-info:focus": {
        "color": "#31708f",
        "backgroundColor": "#c4e3f3"
    },
    "buttonlist-group-item-info:hover": {
        "color": "#31708f",
        "backgroundColor": "#c4e3f3"
    },
    "alist-group-item-infoactive": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "alist-group-item-infoactive:focus": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "alist-group-item-infoactive:hover": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "buttonlist-group-item-infoactive": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "buttonlist-group-item-infoactive:focus": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "buttonlist-group-item-infoactive:hover": {
        "color": "#fff",
        "backgroundColor": "#31708f",
        "borderColor": "#31708f"
    },
    "list-group-item-warning": {
        "color": "#8a6d3b",
        "backgroundColor": "#fcf8e3"
    },
    "alist-group-item-warning": {
        "color": "#8a6d3b"
    },
    "buttonlist-group-item-warning": {
        "color": "#8a6d3b"
    },
    "alist-group-item-warning list-group-item-heading": {
        "color": "inherit"
    },
    "buttonlist-group-item-warning list-group-item-heading": {
        "color": "inherit"
    },
    "alist-group-item-warning:focus": {
        "color": "#8a6d3b",
        "backgroundColor": "#faf2cc"
    },
    "alist-group-item-warning:hover": {
        "color": "#8a6d3b",
        "backgroundColor": "#faf2cc"
    },
    "buttonlist-group-item-warning:focus": {
        "color": "#8a6d3b",
        "backgroundColor": "#faf2cc"
    },
    "buttonlist-group-item-warning:hover": {
        "color": "#8a6d3b",
        "backgroundColor": "#faf2cc"
    },
    "alist-group-item-warningactive": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "alist-group-item-warningactive:focus": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "alist-group-item-warningactive:hover": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "buttonlist-group-item-warningactive": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "buttonlist-group-item-warningactive:focus": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "buttonlist-group-item-warningactive:hover": {
        "color": "#fff",
        "backgroundColor": "#8a6d3b",
        "borderColor": "#8a6d3b"
    },
    "list-group-item-danger": {
        "color": "#a94442",
        "backgroundColor": "#f2dede"
    },
    "alist-group-item-danger": {
        "color": "#a94442"
    },
    "buttonlist-group-item-danger": {
        "color": "#a94442"
    },
    "alist-group-item-danger list-group-item-heading": {
        "color": "inherit"
    },
    "buttonlist-group-item-danger list-group-item-heading": {
        "color": "inherit"
    },
    "alist-group-item-danger:focus": {
        "color": "#a94442",
        "backgroundColor": "#ebcccc"
    },
    "alist-group-item-danger:hover": {
        "color": "#a94442",
        "backgroundColor": "#ebcccc"
    },
    "buttonlist-group-item-danger:focus": {
        "color": "#a94442",
        "backgroundColor": "#ebcccc"
    },
    "buttonlist-group-item-danger:hover": {
        "color": "#a94442",
        "backgroundColor": "#ebcccc"
    },
    "alist-group-item-dangeractive": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "alist-group-item-dangeractive:focus": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "alist-group-item-dangeractive:hover": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "buttonlist-group-item-dangeractive": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "buttonlist-group-item-dangeractive:focus": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "buttonlist-group-item-dangeractive:hover": {
        "color": "#fff",
        "backgroundColor": "#a94442",
        "borderColor": "#a94442"
    },
    "list-group-item-heading": {
        "marginTop": 0,
        "marginBottom": 5
    },
    "list-group-item-text": {
        "marginBottom": 0,
        "lineHeight": 1.3
    },
    "panel": {
        "marginBottom": 20,
        "backgroundColor": "#fff",
        "border": "1px solid transparent",
        "borderRadius": 4,
        "WebkitBoxShadow": "0 1px 1px rgba(0,0,0,.05)",
        "boxShadow": "0 1px 1px rgba(0,0,0,.05)"
    },
    "panel-body": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "panel-heading": {
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "borderBottom": "1px solid transparent",
        "borderTopRightRadius": 3,
        "borderTopLeftRadius": 3
    },
    "panel-heading>dropdown dropdown-toggle": {
        "color": "inherit"
    },
    "panel-title": {
        "marginTop": 0,
        "marginBottom": 0,
        "fontSize": 16,
        "color": "inherit"
    },
    "panel-title>small": {
        "color": "inherit"
    },
    "panel-title>small>a": {
        "color": "inherit"
    },
    "panel-title>a": {
        "color": "inherit"
    },
    "panel-footer": {
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "backgroundColor": "#f5f5f5",
        "borderTop": "1px solid #ddd",
        "borderBottomRightRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "panel>list-group": {
        "marginBottom": 0
    },
    "panel>panel-collapse>list-group": {
        "marginBottom": 0
    },
    "panel>list-group list-group-item": {
        "borderWidth": "1px 0",
        "borderRadius": 0
    },
    "panel>panel-collapse>list-group list-group-item": {
        "borderWidth": "1px 0",
        "borderRadius": 0
    },
    "panel>list-group:first-child list-group-item:first-child": {
        "borderTop": 0,
        "borderTopRightRadius": 3,
        "borderTopLeftRadius": 3
    },
    "panel>panel-collapse>list-group:first-child list-group-item:first-child": {
        "borderTop": 0,
        "borderTopRightRadius": 3,
        "borderTopLeftRadius": 3
    },
    "panel>list-group:last-child list-group-item:last-child": {
        "borderBottom": 0,
        "borderBottomRightRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "panel>panel-collapse>list-group:last-child list-group-item:last-child": {
        "borderBottom": 0,
        "borderBottomRightRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "panel>panel-heading+panel-collapse>list-group list-group-item:first-child": {
        "borderTopRightRadius": 0,
        "borderTopLeftRadius": 0
    },
    "list-group+panel-footer": {
        "borderTopWidth": 0
    },
    "panel-heading+list-group list-group-item:first-child": {
        "borderTopWidth": 0
    },
    "panel>panel-collapse>table": {
        "marginBottom": 0
    },
    "panel>table": {
        "marginBottom": 0
    },
    "panel>table-responsive>table": {
        "marginBottom": 0
    },
    "panel>panel-collapse>table caption": {
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "panel>table caption": {
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "panel>table-responsive>table caption": {
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "panel>table-responsive:first-child>table:first-child": {
        "borderTopRightRadius": 3,
        "borderTopLeftRadius": 3
    },
    "panel>table:first-child": {
        "borderTopRightRadius": 3,
        "borderTopLeftRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>tbody:first-child>tr:first-child": {
        "borderTopLeftRadius": 3,
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>thead:first-child>tr:first-child": {
        "borderTopLeftRadius": 3,
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>tbody:first-child>tr:first-child": {
        "borderTopLeftRadius": 3,
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>thead:first-child>tr:first-child": {
        "borderTopLeftRadius": 3,
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>tbody:first-child>tr:first-child td:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>tbody:first-child>tr:first-child th:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>thead:first-child>tr:first-child td:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>thead:first-child>tr:first-child th:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table:first-child>tbody:first-child>tr:first-child td:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table:first-child>tbody:first-child>tr:first-child th:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table:first-child>thead:first-child>tr:first-child td:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table:first-child>thead:first-child>tr:first-child th:first-child": {
        "borderTopLeftRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>tbody:first-child>tr:first-child td:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>tbody:first-child>tr:first-child th:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>thead:first-child>tr:first-child td:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:first-child>table:first-child>thead:first-child>tr:first-child th:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>tbody:first-child>tr:first-child td:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>tbody:first-child>tr:first-child th:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>thead:first-child>tr:first-child td:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table:first-child>thead:first-child>tr:first-child th:last-child": {
        "borderTopRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child": {
        "borderBottomRightRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "panel>table:last-child": {
        "borderBottomRightRadius": 3,
        "borderBottomLeftRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tbody:last-child>tr:last-child": {
        "borderBottomLeftRadius": 3,
        "borderBottomRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tfoot:last-child>tr:last-child": {
        "borderBottomLeftRadius": 3,
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tbody:last-child>tr:last-child": {
        "borderBottomLeftRadius": 3,
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tfoot:last-child>tr:last-child": {
        "borderBottomLeftRadius": 3,
        "borderBottomRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tbody:last-child>tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tbody:last-child>tr:last-child th:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tfoot:last-child>tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tfoot:last-child>tr:last-child th:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table:last-child>tbody:last-child>tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table:last-child>tbody:last-child>tr:last-child th:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table:last-child>tfoot:last-child>tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table:last-child>tfoot:last-child>tr:last-child th:first-child": {
        "borderBottomLeftRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tbody:last-child>tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tbody:last-child>tr:last-child th:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tfoot:last-child>tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table-responsive:last-child>table:last-child>tfoot:last-child>tr:last-child th:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tbody:last-child>tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tbody:last-child>tr:last-child th:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tfoot:last-child>tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>table:last-child>tfoot:last-child>tr:last-child th:last-child": {
        "borderBottomRightRadius": 3
    },
    "panel>panel-body+table": {
        "borderTop": "1px solid #ddd"
    },
    "panel>panel-body+table-responsive": {
        "borderTop": "1px solid #ddd"
    },
    "panel>table+panel-body": {
        "borderTop": "1px solid #ddd"
    },
    "panel>table-responsive+panel-body": {
        "borderTop": "1px solid #ddd"
    },
    "panel>table>tbody:first-child>tr:first-child td": {
        "borderTop": 0
    },
    "panel>table>tbody:first-child>tr:first-child th": {
        "borderTop": 0
    },
    "panel>table-bordered": {
        "border": 0
    },
    "panel>table-responsive>table-bordered": {
        "border": 0
    },
    "panel>table-bordered>tbody>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>tbody>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>tfoot>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>tfoot>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>thead>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>thead>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>thead>tr>td:first-child": {
        "borderLeft": 0
    },
    "panel>table-responsive>table-bordered>thead>tr>th:first-child": {
        "borderLeft": 0
    },
    "panel>table-bordered>tbody>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>tbody>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>tfoot>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>tfoot>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>thead>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>thead>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>thead>tr>td:last-child": {
        "borderRight": 0
    },
    "panel>table-responsive>table-bordered>thead>tr>th:last-child": {
        "borderRight": 0
    },
    "panel>table-bordered>tbody>tr:first-child>td": {
        "borderBottom": 0
    },
    "panel>table-bordered>tbody>tr:first-child>th": {
        "borderBottom": 0
    },
    "panel>table-bordered>thead>tr:first-child>td": {
        "borderBottom": 0
    },
    "panel>table-bordered>thead>tr:first-child>th": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr:first-child>td": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr:first-child>th": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>thead>tr:first-child>td": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>thead>tr:first-child>th": {
        "borderBottom": 0
    },
    "panel>table-bordered>tbody>tr:last-child>td": {
        "borderBottom": 0
    },
    "panel>table-bordered>tbody>tr:last-child>th": {
        "borderBottom": 0
    },
    "panel>table-bordered>tfoot>tr:last-child>td": {
        "borderBottom": 0
    },
    "panel>table-bordered>tfoot>tr:last-child>th": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr:last-child>td": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tbody>tr:last-child>th": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr:last-child>td": {
        "borderBottom": 0
    },
    "panel>table-responsive>table-bordered>tfoot>tr:last-child>th": {
        "borderBottom": 0
    },
    "panel>table-responsive": {
        "border": 0,
        "marginBottom": 0
    },
    "panel-group": {
        "marginBottom": 20
    },
    "panel-group panel": {
        "marginBottom": 0,
        "borderRadius": 4
    },
    "panel-group panel+panel": {
        "marginTop": 5
    },
    "panel-group panel-heading": {
        "borderBottom": 0
    },
    "panel-group panel-heading+panel-collapse>list-group": {
        "borderTop": "1px solid #ddd"
    },
    "panel-group panel-heading+panel-collapse>panel-body": {
        "borderTop": "1px solid #ddd"
    },
    "panel-group panel-footer": {
        "borderTop": 0
    },
    "panel-group panel-footer+panel-collapse panel-body": {
        "borderBottom": "1px solid #ddd"
    },
    "panel-default": {
        "borderColor": "#ddd"
    },
    "panel-default>panel-heading": {
        "color": "#333",
        "backgroundColor": "#f5f5f5",
        "borderColor": "#ddd"
    },
    "panel-default>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#ddd"
    },
    "panel-default>panel-heading badge": {
        "color": "#f5f5f5",
        "backgroundColor": "#333"
    },
    "panel-default>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#ddd"
    },
    "panel-primary": {
        "borderColor": "#337ab7"
    },
    "panel-primary>panel-heading": {
        "color": "#fff",
        "backgroundColor": "#337ab7",
        "borderColor": "#337ab7"
    },
    "panel-primary>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#337ab7"
    },
    "panel-primary>panel-heading badge": {
        "color": "#337ab7",
        "backgroundColor": "#fff"
    },
    "panel-primary>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#337ab7"
    },
    "panel-success": {
        "borderColor": "#d6e9c6"
    },
    "panel-success>panel-heading": {
        "color": "#3c763d",
        "backgroundColor": "#dff0d8",
        "borderColor": "#d6e9c6"
    },
    "panel-success>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#d6e9c6"
    },
    "panel-success>panel-heading badge": {
        "color": "#dff0d8",
        "backgroundColor": "#3c763d"
    },
    "panel-success>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#d6e9c6"
    },
    "panel-info": {
        "borderColor": "#bce8f1"
    },
    "panel-info>panel-heading": {
        "color": "#31708f",
        "backgroundColor": "#d9edf7",
        "borderColor": "#bce8f1"
    },
    "panel-info>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#bce8f1"
    },
    "panel-info>panel-heading badge": {
        "color": "#d9edf7",
        "backgroundColor": "#31708f"
    },
    "panel-info>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#bce8f1"
    },
    "panel-warning": {
        "borderColor": "#faebcc"
    },
    "panel-warning>panel-heading": {
        "color": "#8a6d3b",
        "backgroundColor": "#fcf8e3",
        "borderColor": "#faebcc"
    },
    "panel-warning>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#faebcc"
    },
    "panel-warning>panel-heading badge": {
        "color": "#fcf8e3",
        "backgroundColor": "#8a6d3b"
    },
    "panel-warning>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#faebcc"
    },
    "panel-danger": {
        "borderColor": "#ebccd1"
    },
    "panel-danger>panel-heading": {
        "color": "#a94442",
        "backgroundColor": "#f2dede",
        "borderColor": "#ebccd1"
    },
    "panel-danger>panel-heading+panel-collapse>panel-body": {
        "borderTopColor": "#ebccd1"
    },
    "panel-danger>panel-heading badge": {
        "color": "#f2dede",
        "backgroundColor": "#a94442"
    },
    "panel-danger>panel-footer+panel-collapse>panel-body": {
        "borderBottomColor": "#ebccd1"
    },
    "embed-responsive": {
        "position": "relative",
        "display": "block",
        "height": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden"
    },
    "embed-responsive embed-responsive-item": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "height": "100%",
        "width": "100%",
        "border": 0
    },
    "embed-responsive embed": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "height": "100%",
        "width": "100%",
        "border": 0
    },
    "embed-responsive iframe": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "height": "100%",
        "width": "100%",
        "border": 0
    },
    "embed-responsive object": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "height": "100%",
        "width": "100%",
        "border": 0
    },
    "embed-responsive video": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "height": "100%",
        "width": "100%",
        "border": 0
    },
    "embed-responsive-16by9": {
        "paddingBottom": "56.25%"
    },
    "embed-responsive-4by3": {
        "paddingBottom": "75%"
    },
    "well": {
        "minHeight": 20,
        "paddingTop": 19,
        "paddingRight": 19,
        "paddingBottom": 19,
        "paddingLeft": 19,
        "marginBottom": 20,
        "backgroundColor": "#f5f5f5",
        "border": "1px solid #e3e3e3",
        "borderRadius": 4,
        "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.05)",
        "boxShadow": "inset 0 1px 1px rgba(0,0,0,.05)"
    },
    "well blockquote": {
        "borderColor": "rgba(0,0,0,.15)"
    },
    "well-lg": {
        "paddingTop": 24,
        "paddingRight": 24,
        "paddingBottom": 24,
        "paddingLeft": 24,
        "borderRadius": 6
    },
    "well-sm": {
        "paddingTop": 9,
        "paddingRight": 9,
        "paddingBottom": 9,
        "paddingLeft": 9,
        "borderRadius": 3
    },
    "close": {
        "float": "right",
        "fontSize": 21,
        "fontWeight": "700",
        "lineHeight": 1,
        "color": "#000",
        "textShadow": "0 1px 0 #fff",
        "opacity": 0.2,
        "filter": "alpha(opacity=20)"
    },
    "close:focus": {
        "color": "#000",
        "textDecoration": "none",
        "cursor": "pointer",
        "opacity": 0.5,
        "filter": "alpha(opacity=50)"
    },
    "close:hover": {
        "color": "#000",
        "textDecoration": "none",
        "cursor": "pointer",
        "opacity": 0.5,
        "filter": "alpha(opacity=50)"
    },
    "buttonclose": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "cursor": "pointer",
        "background": "0 0",
        "border": 0,
        "WebkitAppearance": "none"
    },
    "modal-open": {
        "overflow": "hidden"
    },
    "modal": {
        "display": "none",
        "overflow": "hidden",
        "position": "fixed",
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "zIndex": 1050,
        "WebkitOverflowScrolling": "touch",
        "outline": 0
    },
    "modalfade modal-dialog": {
        "WebkitTransform": "translate(0,-25%)",
        "MsTransform": "translate(0,-25%)",
        "OTransform": "translate(0,-25%)",
        "transform": "translate(0,-25%)",
        "WebkitTransition": "-webkit-transform .3s ease-out",
        "MozTransition": "-moz-transform .3s ease-out",
        "OTransition": "-o-transform .3s ease-out",
        "transition": "transform .3s ease-out"
    },
    "modalin modal-dialog": {
        "WebkitTransform": "translate(0,0)",
        "MsTransform": "translate(0,0)",
        "OTransform": "translate(0,0)",
        "transform": "translate(0,0)"
    },
    "modal-open modal": {
        "overflowX": "hidden",
        "overflowY": "auto"
    },
    "modal-dialog": {
        "position": "relative",
        "width": "auto",
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10
    },
    "modal-content": {
        "position": "relative",
        "backgroundColor": "#fff",
        "border": "1px solid rgba(0,0,0,.2)",
        "borderRadius": 6,
        "WebkitBoxShadow": "0 3px 9px rgba(0,0,0,.5)",
        "boxShadow": "0 3px 9px rgba(0,0,0,.5)",
        "backgroundClip": "padding-box",
        "outline": 0
    },
    "modal-backdrop": {
        "position": "fixed",
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "zIndex": 1040,
        "backgroundColor": "#000"
    },
    "modal-backdropfade": {
        "opacity": 0,
        "filter": "alpha(opacity=0)"
    },
    "modal-backdropin": {
        "opacity": 0.5,
        "filter": "alpha(opacity=50)"
    },
    "modal-header": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "borderBottom": "1px solid #e5e5e5"
    },
    "modal-header close": {
        "marginTop": -2
    },
    "modal-title": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": 1.42857143
    },
    "modal-body": {
        "position": "relative",
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "modal-footer": {
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "textAlign": "right",
        "borderTop": "1px solid #e5e5e5"
    },
    "modal-footer btn+btn": {
        "marginLeft": 5,
        "marginBottom": 0
    },
    "modal-footer btn-group btn+btn": {
        "marginLeft": -1
    },
    "modal-footer btn-block+btn-block": {
        "marginLeft": 0
    },
    "modal-scrollbar-measure": {
        "position": "absolute",
        "top": -9999,
        "width": 50,
        "height": 50,
        "overflow": "scroll"
    },
    "tooltip": {
        "position": "absolute",
        "zIndex": 1070,
        "display": "block",
        "fontFamily": "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontStyle": "normal",
        "fontWeight": "400",
        "letterSpacing": "normal",
        "lineBreak": "auto",
        "lineHeight": 1.42857143,
        "textAlign": "start",
        "textDecoration": "none",
        "textShadow": "none",
        "textTransform": "none",
        "whiteSpace": "normal",
        "wordBreak": "normal",
        "wordSpacing": "normal",
        "wordWrap": "normal",
        "fontSize": 12,
        "opacity": 0,
        "filter": "alpha(opacity=0)"
    },
    "tooltipin": {
        "opacity": 0.9,
        "filter": "alpha(opacity=90)"
    },
    "tooltiptop": {
        "marginTop": -3,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0
    },
    "tooltipright": {
        "marginLeft": 3,
        "paddingTop": 0,
        "paddingRight": 5,
        "paddingBottom": 0,
        "paddingLeft": 5
    },
    "tooltipbottom": {
        "marginTop": 3,
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0
    },
    "tooltipleft": {
        "marginLeft": -3,
        "paddingTop": 0,
        "paddingRight": 5,
        "paddingBottom": 0,
        "paddingLeft": 5
    },
    "tooltip-inner": {
        "maxWidth": 200,
        "paddingTop": 3,
        "paddingRight": 8,
        "paddingBottom": 3,
        "paddingLeft": 8,
        "color": "#fff",
        "textAlign": "center",
        "backgroundColor": "#000",
        "borderRadius": 4
    },
    "tooltip-arrow": {
        "position": "absolute",
        "width": 0,
        "height": 0,
        "borderColor": "transparent",
        "borderStyle": "solid"
    },
    "tooltiptop tooltip-arrow": {
        "bottom": 0,
        "left": "50%",
        "marginLeft": -5,
        "borderWidth": "5px 5px 0",
        "borderTopColor": "#000"
    },
    "tooltiptop-left tooltip-arrow": {
        "bottom": 0,
        "right": 5,
        "marginBottom": -5,
        "borderWidth": "5px 5px 0",
        "borderTopColor": "#000"
    },
    "tooltiptop-right tooltip-arrow": {
        "bottom": 0,
        "left": 5,
        "marginBottom": -5,
        "borderWidth": "5px 5px 0",
        "borderTopColor": "#000"
    },
    "tooltipright tooltip-arrow": {
        "top": "50%",
        "left": 0,
        "marginTop": -5,
        "borderWidth": "5px 5px 5px 0",
        "borderRightColor": "#000"
    },
    "tooltipleft tooltip-arrow": {
        "top": "50%",
        "right": 0,
        "marginTop": -5,
        "borderWidth": "5px 0 5px 5px",
        "borderLeftColor": "#000"
    },
    "tooltipbottom tooltip-arrow": {
        "top": 0,
        "left": "50%",
        "marginLeft": -5,
        "borderWidth": "0 5px 5px",
        "borderBottomColor": "#000"
    },
    "tooltipbottom-left tooltip-arrow": {
        "top": 0,
        "right": 5,
        "marginTop": -5,
        "borderWidth": "0 5px 5px",
        "borderBottomColor": "#000"
    },
    "tooltipbottom-right tooltip-arrow": {
        "top": 0,
        "left": 5,
        "marginTop": -5,
        "borderWidth": "0 5px 5px",
        "borderBottomColor": "#000"
    },
    "popover": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "zIndex": 1060,
        "display": "none",
        "maxWidth": 276,
        "paddingTop": 1,
        "paddingRight": 1,
        "paddingBottom": 1,
        "paddingLeft": 1,
        "fontFamily": "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontStyle": "normal",
        "fontWeight": "400",
        "letterSpacing": "normal",
        "lineBreak": "auto",
        "lineHeight": 1.42857143,
        "textAlign": "start",
        "textDecoration": "none",
        "textShadow": "none",
        "textTransform": "none",
        "whiteSpace": "normal",
        "wordBreak": "normal",
        "wordSpacing": "normal",
        "wordWrap": "normal",
        "fontSize": 14,
        "backgroundColor": "#fff",
        "backgroundClip": "padding-box",
        "border": "1px solid rgba(0,0,0,.2)",
        "borderRadius": 6,
        "WebkitBoxShadow": "0 5px 10px rgba(0,0,0,.2)",
        "boxShadow": "0 5px 10px rgba(0,0,0,.2)"
    },
    "popovertop": {
        "marginTop": -10
    },
    "popoverright": {
        "marginLeft": 10
    },
    "popoverbottom": {
        "marginTop": 10
    },
    "popoverleft": {
        "marginLeft": -10
    },
    "popover-title": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 8,
        "paddingRight": 14,
        "paddingBottom": 8,
        "paddingLeft": 14,
        "fontSize": 14,
        "backgroundColor": "#f7f7f7",
        "borderBottom": "1px solid #ebebeb",
        "borderRadius": "5px 5px 0 0"
    },
    "popover-content": {
        "paddingTop": 9,
        "paddingRight": 14,
        "paddingBottom": 9,
        "paddingLeft": 14
    },
    "popover>arrow": {
        "position": "absolute",
        "display": "block",
        "width": 0,
        "height": 0,
        "borderColor": "transparent",
        "borderStyle": "solid",
        "borderWidth": 11
    },
    "popover>arrow:after": {
        "position": "absolute",
        "display": "block",
        "width": 0,
        "height": 0,
        "borderColor": "transparent",
        "borderStyle": "solid",
        "borderWidth": 10,
        "content": ""
    },
    "popovertop>arrow": {
        "left": "50%",
        "marginLeft": -11,
        "borderBottomWidth": 0,
        "borderTopColor": "rgba(0,0,0,.25)",
        "bottom": -11
    },
    "popovertop>arrow:after": {
        "content": " ",
        "bottom": 1,
        "marginLeft": -10,
        "borderBottomWidth": 0,
        "borderTopColor": "#fff"
    },
    "popoverright>arrow": {
        "top": "50%",
        "left": -11,
        "marginTop": -11,
        "borderLeftWidth": 0,
        "borderRightColor": "rgba(0,0,0,.25)"
    },
    "popoverright>arrow:after": {
        "content": " ",
        "left": 1,
        "bottom": -10,
        "borderLeftWidth": 0,
        "borderRightColor": "#fff"
    },
    "popoverbottom>arrow": {
        "left": "50%",
        "marginLeft": -11,
        "borderTopWidth": 0,
        "borderBottomColor": "rgba(0,0,0,.25)",
        "top": -11
    },
    "popoverbottom>arrow:after": {
        "content": " ",
        "top": 1,
        "marginLeft": -10,
        "borderTopWidth": 0,
        "borderBottomColor": "#fff"
    },
    "popoverleft>arrow": {
        "top": "50%",
        "right": -11,
        "marginTop": -11,
        "borderRightWidth": 0,
        "borderLeftColor": "rgba(0,0,0,.25)"
    },
    "popoverleft>arrow:after": {
        "content": " ",
        "right": 1,
        "borderRightWidth": 0,
        "borderLeftColor": "#fff",
        "bottom": -10
    },
    "carousel": {
        "position": "relative"
    },
    "carousel-inner": {
        "position": "relative",
        "overflow": "hidden",
        "width": "100%"
    },
    "carousel-inner>item": {
        "display": "none",
        "position": "relative",
        "WebkitTransition": ".6s ease-in-out left",
        "OTransition": ".6s ease-in-out left",
        "transition": ".6s ease-in-out left"
    },
    "carousel-inner>active": {
        "display": "block",
        "left": 0
    },
    "carousel-inner>next": {
        "display": "block",
        "position": "absolute",
        "top": 0,
        "width": "100%",
        "left": "100%"
    },
    "carousel-inner>prev": {
        "display": "block",
        "position": "absolute",
        "top": 0,
        "width": "100%",
        "left": "-100%"
    },
    "carousel-inner>nextleft": {
        "left": 0
    },
    "carousel-inner>prevright": {
        "left": 0
    },
    "carousel-inner>activeleft": {
        "left": "-100%"
    },
    "carousel-inner>activeright": {
        "left": "100%"
    },
    "carousel-control": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "bottom": 0,
        "width": "15%",
        "opacity": 0.5,
        "filter": "alpha(opacity=50)",
        "fontSize": 20,
        "color": "#fff",
        "textAlign": "center",
        "textShadow": "0 1px 2px rgba(0,0,0,.6)",
        "backgroundColor": "rgba(0,0,0,0)"
    },
    "carousel-controlleft": {
        "backgroundImage": "linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%)",
        "backgroundRepeat": "repeat-x",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)"
    },
    "carousel-controlright": {
        "left": "auto",
        "right": 0,
        "backgroundImage": "linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%)",
        "backgroundRepeat": "repeat-x",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)"
    },
    "carousel-control:focus": {
        "outline": 0,
        "color": "#fff",
        "textDecoration": "none",
        "opacity": 0.9,
        "filter": "alpha(opacity=90)"
    },
    "carousel-control:hover": {
        "outline": 0,
        "color": "#fff",
        "textDecoration": "none",
        "opacity": 0.9,
        "filter": "alpha(opacity=90)"
    },
    "carousel-control glyphicon-chevron-left": {
        "position": "absolute",
        "top": "50%",
        "marginTop": -10,
        "zIndex": 5,
        "display": "inline-block",
        "left": "50%",
        "marginLeft": -10
    },
    "carousel-control glyphicon-chevron-right": {
        "position": "absolute",
        "top": "50%",
        "marginTop": -10,
        "zIndex": 5,
        "display": "inline-block",
        "right": "50%",
        "marginRight": -10
    },
    "carousel-control icon-next": {
        "position": "absolute",
        "top": "50%",
        "marginTop": -10,
        "zIndex": 5,
        "display": "inline-block",
        "right": "50%",
        "marginRight": -10,
        "width": 20,
        "height": 20,
        "lineHeight": 1,
        "fontFamily": "serif"
    },
    "carousel-control icon-prev": {
        "position": "absolute",
        "top": "50%",
        "marginTop": -10,
        "zIndex": 5,
        "display": "inline-block",
        "left": "50%",
        "marginLeft": -10,
        "width": 20,
        "height": 20,
        "lineHeight": 1,
        "fontFamily": "serif"
    },
    "carousel-control icon-prev:before": {
        "content": "'\\2039'"
    },
    "carousel-control icon-next:before": {
        "content": "'\\203a'"
    },
    "carousel-indicators": {
        "position": "absolute",
        "bottom": 10,
        "left": "50%",
        "zIndex": 15,
        "width": "60%",
        "marginLeft": "-30%",
        "paddingLeft": 0,
        "listStyle": "none",
        "textAlign": "center"
    },
    "carousel-indicators li": {
        "display": "inline-block",
        "width": 10,
        "height": 10,
        "marginTop": 1,
        "marginRight": 1,
        "marginBottom": 1,
        "marginLeft": 1,
        "textIndent": -999,
        "border": "1px solid #fff",
        "borderRadius": 10,
        "cursor": "pointer",
        "backgroundColor": "rgba(0,0,0,0)"
    },
    "carousel-indicators active": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "width": 12,
        "height": 12,
        "backgroundColor": "#fff"
    },
    "carousel-caption": {
        "position": "absolute",
        "left": "15%",
        "right": "15%",
        "bottom": 20,
        "zIndex": 10,
        "paddingTop": 20,
        "paddingBottom": 20,
        "color": "#fff",
        "textAlign": "center",
        "textShadow": "0 1px 2px rgba(0,0,0,.6)"
    },
    "carousel-caption btn": {
        "textShadow": "none"
    },
    "btn-group-vertical>btn-group:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "btn-group-vertical>btn-group:before": {
        "content": " ",
        "display": "table"
    },
    "btn-toolbar:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "btn-toolbar:before": {
        "content": " ",
        "display": "table"
    },
    "clearfix:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "clearfix:before": {
        "content": " ",
        "display": "table"
    },
    "container-fluid:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "container-fluid:before": {
        "content": " ",
        "display": "table"
    },
    "container:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "container:before": {
        "content": " ",
        "display": "table"
    },
    "dl-horizontal dd:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "dl-horizontal dd:before": {
        "content": " ",
        "display": "table"
    },
    "form-horizontal form-group:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "form-horizontal form-group:before": {
        "content": " ",
        "display": "table"
    },
    "modal-footer:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "modal-footer:before": {
        "content": " ",
        "display": "table"
    },
    "modal-header:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "modal-header:before": {
        "content": " ",
        "display": "table"
    },
    "nav:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "nav:before": {
        "content": " ",
        "display": "table"
    },
    "navbar-collapse:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "navbar-collapse:before": {
        "content": " ",
        "display": "table"
    },
    "navbar-header:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "navbar-header:before": {
        "content": " ",
        "display": "table"
    },
    "navbar:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "navbar:before": {
        "content": " ",
        "display": "table"
    },
    "pager:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "pager:before": {
        "content": " ",
        "display": "table"
    },
    "panel-body:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "panel-body:before": {
        "content": " ",
        "display": "table"
    },
    "row:after": {
        "content": " ",
        "display": "table",
        "clear": "both"
    },
    "row:before": {
        "content": " ",
        "display": "table"
    },
    "center-block": {
        "display": "block",
        "marginLeft": "auto",
        "marginRight": "auto"
    },
    "pull-right": {
        "float": "right!important"
    },
    "pull-left": {
        "float": "left!important"
    },
    "hide": {
        "display": "none!important"
    },
    "show": {
        "display": "block!important"
    },
    "invisible": {
        "visibility": "hidden"
    },
    "text-hide": {
        "font": "0/0 a",
        "color": "transparent",
        "textShadow": "none",
        "backgroundColor": "transparent",
        "border": 0
    },
    "hidden": {
        "display": "none!important"
    },
    "affix": {
        "position": "fixed"
    },
    "@-ms-viewport": {
        "width": "device-width"
    },
    "visible-lg": {
        "display": "none!important"
    },
    "visible-lg-block": {
        "display": "none!important"
    },
    "visible-lg-inline": {
        "display": "none!important"
    },
    "visible-lg-inline-block": {
        "display": "none!important"
    },
    "visible-md": {
        "display": "none!important"
    },
    "visible-md-block": {
        "display": "none!important"
    },
    "visible-md-inline": {
        "display": "none!important"
    },
    "visible-md-inline-block": {
        "display": "none!important"
    },
    "visible-print": {
        "display": "none!important"
    },
    "visible-print-block": {
        "display": "none!important"
    },
    "visible-print-inline": {
        "display": "none!important"
    },
    "visible-print-inline-block": {
        "display": "none!important"
    },
    "visible-sm": {
        "display": "none!important"
    },
    "visible-sm-block": {
        "display": "none!important"
    },
    "visible-sm-inline": {
        "display": "none!important"
    },
    "visible-sm-inline-block": {
        "display": "none!important"
    },
    "visible-xs": {
        "display": "none!important"
    },
    "visible-xs-block": {
        "display": "none!important"
    },
    "visible-xs-inline": {
        "display": "none!important"
    },
    "visible-xs-inline-block": {
        "display": "none!important"
    },
    "[class*=\" icon-\"]": {
        "fontFamily": "icomoon!important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "[class^=icon-]": {
        "fontFamily": "icomoon!important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "icon-add-user:before": {
        "content": "\\e919"
    },
    "icon-checked:before": {
        "content": "\\e918"
    },
    "icon-university:before": {
        "content": "\\e913"
    },
    "icon-homestay:before": {
        "content": "\\e914"
    },
    "icon-students:before": {
        "content": "\\e915"
    },
    "icon-schools:before": {
        "content": "\\e916"
    },
    "icon-dashboard:before": {
        "content": "\\e917"
    },
    "icon-close:before": {
        "content": "\\e912"
    },
    "icon-zoom:before": {
        "content": "\\e911"
    },
    "icon-caret-down:before": {
        "content": "\\e900"
    },
    "icon-caret-up:before": {
        "content": "\\e901"
    },
    "icon-caret-left:before": {
        "content": "\\e902"
    },
    "icon-caret-right:before": {
        "content": "\\e903"
    },
    "icon-facebook:before": {
        "content": "\\e904"
    },
    "icon-linkedin:before": {
        "content": "\\e905"
    },
    "icon-list:before": {
        "content": "\\e906"
    },
    "icon-mail:before": {
        "content": "\\e907"
    },
    "icon-phone:before": {
        "content": "\\e908"
    },
    "icon-play:before": {
        "content": "\\e909"
    },
    "icon-top-arrow:before": {
        "content": "\\e90f"
    },
    "icon-bottom-arrow:before": {
        "content": "\\e90a"
    },
    "icon-left-arrow:before": {
        "content": "\\e90b"
    },
    "icon-right-arrow:before": {
        "content": "\\e90c"
    },
    "icon-right-bullet:before": {
        "content": "\\e90d"
    },
    "icon-left-bullet:before": {
        "content": "\\e90e"
    },
    "icon-twitter:before": {
        "content": "\\e910"
    },
    "body bootstrap-datetimepicker-widget table td spanactive": {
        "backgroundColor": "#f3291b",
        "color": "#fff"
    },
    "body bootstrap-datetimepicker-widget table tdactive": {
        "backgroundColor": "#f3291b",
        "color": "#fff"
    },
    "body bootstrap-datetimepicker-widget table tdactive:hover": {
        "backgroundColor": "#f3291b",
        "color": "#fff"
    },
    "select2-container": {
        "zIndex": 9999
    },
    "labelerror-message": {
        "display": "inline-block",
        "maxWidth": "100%",
        "marginBottom": 5,
        "fontWeight": "100"
    },
    "bootstrap-datetimepicker-widget": {
        "listStyle": "none"
    },
    "bootstrap-datetimepicker-widgetdropdown-menu": {
        "marginTop": 2,
        "marginRight": 0,
        "marginBottom": 2,
        "marginLeft": 0,
        "paddingTop": 4,
        "paddingRight": 4,
        "paddingBottom": 4,
        "paddingLeft": 4,
        "width": 19
    },
    "bootstrap-datetimepicker-widgetdropdown-menu:after": {
        "content": "''",
        "display": "inline-block",
        "position": "absolute"
    },
    "bootstrap-datetimepicker-widgetdropdown-menu:before": {
        "content": "''",
        "display": "inline-block",
        "position": "absolute"
    },
    "bootstrap-datetimepicker-widgetdropdown-menubottom:before": {
        "borderLeft": "7px solid transparent",
        "borderRight": "7px solid transparent",
        "borderBottom": "7px solid #ccc",
        "borderBottomColor": "rgba(0,0,0,.2)",
        "top": -7,
        "left": 7
    },
    "bootstrap-datetimepicker-widgetdropdown-menubottom:after": {
        "borderLeft": "6px solid transparent",
        "borderRight": "6px solid transparent",
        "borderBottom": "6px solid #fff",
        "top": -6,
        "left": 8
    },
    "bootstrap-datetimepicker-widgetdropdown-menutop:before": {
        "borderLeft": "7px solid transparent",
        "borderRight": "7px solid transparent",
        "borderTop": "7px solid #ccc",
        "borderTopColor": "rgba(0,0,0,.2)",
        "bottom": -7,
        "left": 6
    },
    "bootstrap-datetimepicker-widgetdropdown-menutop:after": {
        "borderLeft": "6px solid transparent",
        "borderRight": "6px solid transparent",
        "borderTop": "6px solid #fff",
        "bottom": -6,
        "left": 7
    },
    "bootstrap-datetimepicker-widgetdropdown-menupull-right:before": {
        "left": "auto",
        "right": 6
    },
    "bootstrap-datetimepicker-widgetdropdown-menupull-right:after": {
        "left": "auto",
        "right": 7
    },
    "bootstrap-datetimepicker-widget list-unstyled": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "bootstrap-datetimepicker-widget a[data-action]": {
        "paddingTop": 6,
        "paddingRight": 0,
        "paddingBottom": 6,
        "paddingLeft": 0
    },
    "bootstrap-datetimepicker-widget a[data-action]:active": {
        "boxShadow": "none"
    },
    "bootstrap-datetimepicker-widget timepicker-hour": {
        "width": 54,
        "fontWeight": "700",
        "fontSize": 1.2,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "bootstrap-datetimepicker-widget timepicker-minute": {
        "width": 54,
        "fontWeight": "700",
        "fontSize": 1.2,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "bootstrap-datetimepicker-widget timepicker-second": {
        "width": 54,
        "fontWeight": "700",
        "fontSize": 1.2,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "bootstrap-datetimepicker-widget button[data-action]": {
        "paddingTop": 6,
        "paddingRight": 6,
        "paddingBottom": 6,
        "paddingLeft": 6
    },
    "bootstrap-datetimepicker-widget btn[data-action=incrementHours]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Increment Hours"
    },
    "bootstrap-datetimepicker-widget btn[data-action=incrementMinutes]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Increment Minutes"
    },
    "bootstrap-datetimepicker-widget btn[data-action=decrementHours]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Decrement Hours"
    },
    "bootstrap-datetimepicker-widget btn[data-action=decrementMinutes]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Decrement Minutes"
    },
    "bootstrap-datetimepicker-widget btn[data-action=showHours]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Show Hours"
    },
    "bootstrap-datetimepicker-widget btn[data-action=showMinutes]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Show Minutes"
    },
    "bootstrap-datetimepicker-widget btn[data-action=togglePeriod]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Toggle AM/PM"
    },
    "bootstrap-datetimepicker-widget btn[data-action=clear]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Clear the picker"
    },
    "bootstrap-datetimepicker-widget btn[data-action=today]::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Set the date to today"
    },
    "bootstrap-datetimepicker-widget picker-switch": {
        "textAlign": "center"
    },
    "bootstrap-datetimepicker-widget picker-switch::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Toggle Date and Time Screens"
    },
    "bootstrap-datetimepicker-widget picker-switch td": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "height": "auto",
        "width": "auto",
        "lineHeight": "inherit"
    },
    "bootstrap-datetimepicker-widget picker-switch td span": {
        "lineHeight": 2.5,
        "height": 2.5,
        "width": "100%"
    },
    "bootstrap-datetimepicker-widget table": {
        "width": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "bootstrap-datetimepicker-widget table td": {
        "textAlign": "center",
        "borderRadius": 4,
        "height": 54,
        "lineHeight": 54,
        "width": 54
    },
    "bootstrap-datetimepicker-widget table th": {
        "textAlign": "center",
        "borderRadius": 4,
        "height": 20,
        "lineHeight": 20,
        "width": 20
    },
    "bootstrap-datetimepicker-widget table thpicker-switch": {
        "width": 145
    },
    "bootstrap-datetimepicker-widget table thdisabled": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widget table thdisabled:hover": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widget table thprev::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Previous Month"
    },
    "bootstrap-datetimepicker-widget table thnext::after": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0,
        "content": "Next Month"
    },
    "bootstrap-datetimepicker-widget table thead tr:first-child th": {
        "cursor": "pointer"
    },
    "bootstrap-datetimepicker-widget table thead tr:first-child th:hover": {
        "background": "#eee"
    },
    "bootstrap-datetimepicker-widget table tdcw": {
        "fontSize": 0.8,
        "height": 20,
        "lineHeight": 20,
        "color": "#777"
    },
    "bootstrap-datetimepicker-widget table tdday": {
        "height": 20,
        "lineHeight": 20,
        "width": 20
    },
    "bootstrap-datetimepicker-widget table tdday:hover": {
        "background": "#eee",
        "cursor": "pointer"
    },
    "bootstrap-datetimepicker-widget table tdhour:hover": {
        "background": "#eee",
        "cursor": "pointer"
    },
    "bootstrap-datetimepicker-widget table tdminute:hover": {
        "background": "#eee",
        "cursor": "pointer"
    },
    "bootstrap-datetimepicker-widget table tdsecond:hover": {
        "background": "#eee",
        "cursor": "pointer"
    },
    "bootstrap-datetimepicker-widget table tdnew": {
        "color": "#777"
    },
    "bootstrap-datetimepicker-widget table tdold": {
        "color": "#777"
    },
    "bootstrap-datetimepicker-widget table tdtoday": {
        "position": "relative"
    },
    "bootstrap-datetimepicker-widget table tdtoday:before": {
        "content": "''",
        "display": "inline-block",
        "border": "solid transparent",
        "borderWidth": "0 0 7px 7px",
        "borderBottomColor": "#337ab7",
        "borderTopColor": "rgba(0,0,0,.2)",
        "position": "absolute",
        "bottom": 4,
        "right": 4
    },
    "bootstrap-datetimepicker-widget table tdactive": {
        "backgroundColor": "#337ab7",
        "color": "#fff",
        "textShadow": "0 -1px 0 rgba(0,0,0,.25)"
    },
    "bootstrap-datetimepicker-widget table tdactive:hover": {
        "backgroundColor": "#337ab7",
        "color": "#fff",
        "textShadow": "0 -1px 0 rgba(0,0,0,.25)"
    },
    "bootstrap-datetimepicker-widget table tdactivetoday:before": {
        "borderBottomColor": "#fff"
    },
    "bootstrap-datetimepicker-widget table tddisabled": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widget table tddisabled:hover": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widget table td span": {
        "display": "inline-block",
        "width": 54,
        "height": 54,
        "lineHeight": 54,
        "marginTop": 2,
        "marginRight": 1.5,
        "marginBottom": 2,
        "marginLeft": 1.5,
        "cursor": "pointer",
        "borderRadius": 4
    },
    "bootstrap-datetimepicker-widget table td span:hover": {
        "background": "#eee"
    },
    "bootstrap-datetimepicker-widget table td spanactive": {
        "backgroundColor": "#337ab7",
        "color": "#fff",
        "textShadow": "0 -1px 0 rgba(0,0,0,.25)"
    },
    "bootstrap-datetimepicker-widget table td spanold": {
        "color": "#777"
    },
    "bootstrap-datetimepicker-widget table td spandisabled": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widget table td spandisabled:hover": {
        "background": "0 0",
        "color": "#777",
        "cursor": "not-allowed"
    },
    "bootstrap-datetimepicker-widgetusetwentyfour tdhour": {
        "height": 27,
        "lineHeight": 27
    },
    "bootstrap-datetimepicker-widgetwider": {
        "width": 21
    },
    "bootstrap-datetimepicker-widget datepicker-decades decade": {
        "lineHeight": "1.8em!important"
    },
    "input-groupdate input-group-addon": {
        "cursor": "pointer"
    },
    "sr-only": {
        "position": "absolute",
        "width": 1,
        "height": 1,
        "marginTop": -1,
        "marginRight": -1,
        "marginBottom": -1,
        "marginLeft": -1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "overflow": "hidden",
        "clip": "rect(0,0,0,0)",
        "border": 0
    },
    "btnstd-height": {
        "height": 42,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "cancel-btn": {
        "display": "inline-block",
        "marginBottom": 0,
        "fontWeight": "400",
        "textAlign": "center",
        "verticalAlign": "middle",
        "touchAction": "manipulation",
        "cursor": "pointer",
        "backgroundImage": "none",
        "whiteSpace": "nowrap",
        "lineHeight": 1.42857143,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "textTransform": "uppercase",
        "border": "none",
        "fontSize": 13,
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "backgroundColor": "#e5e5e5",
        "color": "#333",
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "cancel-btnactivefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "cancel-btnactive:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "cancel-btnfocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "cancel-btn:activefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "cancel-btn:active:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "cancel-btn:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none",
        "backgroundColor": "#ccc"
    },
    "cancel-btn:hover": {
        "color": "#333",
        "textDecoration": "none",
        "outline": "0!important",
        "backgroundColor": "#ccc"
    },
    "cancel-btnactive": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "cancel-btn:active": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "cancel-btndisabled": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "cancel-btn[disabled]": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] cancel-btn": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "acancel-btndisabled": {
        "pointerEvents": "none"
    },
    "fieldset[disabled] acancel-btn": {
        "pointerEvents": "none"
    },
    "cancel-btnstd-height": {
        "height": 42,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "cancel-btnsm": {
        "fontSize": 12,
        "paddingTop": 5,
        "paddingRight": 15,
        "paddingBottom": 5,
        "paddingLeft": 15
    },
    "cancel-btnlg": {
        "fontSize": 14,
        "paddingTop": 15,
        "paddingRight": 30,
        "paddingBottom": 15,
        "paddingLeft": 30,
        "borderRadius": 4,
        "MozBorderRadius": 4,
        "WebkitBorderRadius": 4,
        "MsBorderRadius": 4
    },
    "primary-btn": {
        "display": "inline-block",
        "marginBottom": 0,
        "fontWeight": "400",
        "textAlign": "center",
        "verticalAlign": "middle",
        "touchAction": "manipulation",
        "cursor": "pointer",
        "backgroundImage": "none",
        "whiteSpace": "nowrap",
        "lineHeight": 1.42857143,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "textTransform": "uppercase",
        "border": "none",
        "fontSize": 13,
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "primary-btnactivefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "primary-btnactive:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "primary-btnfocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "primary-btn:activefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "primary-btn:active:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "primary-btn:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "color": "#fff",
        "textDecoration": "none",
        "backgroundColor": "#da190b"
    },
    "primary-btn:hover": {
        "color": "#fff",
        "textDecoration": "none",
        "outline": "0!important",
        "backgroundColor": "#da190b"
    },
    "primary-btnactive": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "primary-btn:active": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "primary-btndisabled": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "primary-btn[disabled]": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] primary-btn": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "aprimary-btndisabled": {
        "pointerEvents": "none"
    },
    "fieldset[disabled] aprimary-btn": {
        "pointerEvents": "none"
    },
    "primary-btnstd-height": {
        "height": 42,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "primary-btnsm": {
        "fontSize": 12,
        "paddingTop": 5,
        "paddingRight": 15,
        "paddingBottom": 5,
        "paddingLeft": 15
    },
    "primary-btnlg": {
        "fontSize": 14,
        "paddingTop": 15,
        "paddingRight": 30,
        "paddingBottom": 15,
        "paddingLeft": 30,
        "borderRadius": 4,
        "MozBorderRadius": 4,
        "WebkitBorderRadius": 4,
        "MsBorderRadius": 4
    },
    "secondary-btn": {
        "display": "inline-block",
        "marginBottom": 0,
        "fontWeight": "400",
        "textAlign": "center",
        "verticalAlign": "middle",
        "touchAction": "manipulation",
        "cursor": "pointer",
        "backgroundImage": "none",
        "whiteSpace": "nowrap",
        "lineHeight": 1.42857143,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "textTransform": "uppercase",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "backgroundColor": "transparent",
        "color": "#f3291b",
        "fontFamily": "source_sans_proregular,sans-serif",
        "border": "1px solid #f3291b",
        "paddingTop": 13,
        "paddingRight": 30,
        "paddingBottom": 13,
        "paddingLeft": 30,
        "fontSize": 14
    },
    "secondary-btnactivefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "secondary-btnactive:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "secondary-btnfocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "secondary-btn:activefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "secondary-btn:active:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "secondary-btn:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "color": "#fff",
        "textDecoration": "none",
        "backgroundColor": "#f3291b"
    },
    "secondary-btn:hover": {
        "color": "#fff",
        "textDecoration": "none",
        "outline": "0!important",
        "backgroundColor": "#f3291b"
    },
    "secondary-btnactive": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "secondary-btn:active": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "secondary-btndisabled": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "secondary-btn[disabled]": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] secondary-btn": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "asecondary-btndisabled": {
        "pointerEvents": "none"
    },
    "fieldset[disabled] asecondary-btn": {
        "pointerEvents": "none"
    },
    "secondary-btnstd-height": {
        "height": 42,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "secondary-btn i": {
        "fontSize": "80%",
        "marginLeft": 5
    },
    "secondary-btnsm": {
        "fontSize": 12,
        "paddingTop": 8,
        "paddingRight": 15,
        "paddingBottom": 8,
        "paddingLeft": 15
    },
    "secondary-btnlg": {
        "fontSize": 14,
        "paddingTop": 16,
        "paddingRight": 40,
        "paddingBottom": 16,
        "paddingLeft": 40,
        "borderRadius": 4,
        "MozBorderRadius": 4,
        "WebkitBorderRadius": 4,
        "MsBorderRadius": 4
    },
    "default-btn": {
        "display": "inline-block",
        "marginBottom": 0,
        "fontWeight": "400",
        "textAlign": "center",
        "verticalAlign": "middle",
        "touchAction": "manipulation",
        "cursor": "pointer",
        "backgroundImage": "none",
        "whiteSpace": "nowrap",
        "lineHeight": 1.42857143,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "textTransform": "uppercase",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "backgroundColor": "transparent",
        "color": "#fff",
        "fontFamily": "source_sans_proregular,sans-serif",
        "border": "1px solid #fff",
        "fontSize": 14,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "default-btnactivefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "default-btnactive:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "default-btnfocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2,
        "color": "#333",
        "textDecoration": "none"
    },
    "default-btn:activefocus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "default-btn:active:focus": {
        "outline": "-webkit-focus-ring-color auto 5px",
        "outlineOffset": -2
    },
    "default-btn:focus": {
        "outline": "0!important",
        "outlineOffset": -2,
        "color": "#000",
        "textDecoration": "none",
        "backgroundColor": "#fff"
    },
    "default-btn:hover": {
        "color": "#000",
        "textDecoration": "none",
        "outline": "0!important",
        "backgroundColor": "#fff"
    },
    "default-btnactive": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "default-btn:active": {
        "outline": 0,
        "backgroundImage": "none",
        "WebkitBoxShadow": "inset 0 3px 5px rgba(0,0,0,.125)",
        "boxShadow": "inset 0 3px 5px rgba(0,0,0,.125)"
    },
    "default-btndisabled": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "default-btn[disabled]": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "fieldset[disabled] default-btn": {
        "cursor": "not-allowed",
        "opacity": 0.65,
        "filter": "alpha(opacity=65)",
        "WebkitBoxShadow": "none",
        "boxShadow": "none"
    },
    "adefault-btndisabled": {
        "pointerEvents": "none"
    },
    "fieldset[disabled] adefault-btn": {
        "pointerEvents": "none"
    },
    "default-btnstd-height": {
        "height": 42,
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20
    },
    "default-btnsm": {
        "fontSize": 12,
        "paddingTop": 5,
        "paddingRight": 15,
        "paddingBottom": 5,
        "paddingLeft": 15
    },
    "default-btnlg": {
        "fontSize": 14,
        "paddingTop": 15,
        "paddingRight": 30,
        "paddingBottom": 15,
        "paddingLeft": 30,
        "borderRadius": 4,
        "MozBorderRadius": 4,
        "WebkitBorderRadius": 4,
        "MsBorderRadius": 4
    },
    "btn:disabled": {
        "color": "#a0a0a0",
        "backgroundColor": "#ccc"
    },
    "btn[disabled=disabled]": {
        "color": "#a0a0a0",
        "backgroundColor": "#ccc"
    },
    "btn:disabled:hover": {
        "color": "#a0a0a0",
        "backgroundColor": "#ccc"
    },
    "btn[disabled=disabled]:hover": {
        "color": "#a0a0a0",
        "backgroundColor": "#ccc"
    },
    "green-list": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "green-list li": {
        "position": "relative",
        "paddingLeft": 25,
        "listStyle": "none",
        "marginBottom": 10,
        "color": "rgba(51,52,52,.7)",
        "fontSize": 16
    },
    "green-list li::after": {
        "position": "absolute",
        "left": 0,
        "top": 5,
        "fontSize": 10,
        "color": "#51bc68",
        "content": "\\e90c",
        "fontFamily": "icomoon!important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "custom-select": {
        "border": "1px solid #e6e6e6",
        "display": "inline-block",
        "height": 42,
        "position": "relative",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "width": "100%",
        "backgroundColor": "#fff",
        "lineHeight": 42
    },
    "custom-select list-field": {
        "width": "100%",
        "height": 42,
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "display": "none"
    },
    "custom-select active-list": {
        "width": "100%",
        "height": 42,
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10,
        "color": "#c9c9c9",
        "cursor": "pointer",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "textTransform": "uppercase"
    },
    "custom-select active-list:after": {
        "content": "\\e900",
        "fontFamily": "icomoon",
        "position": "absolute",
        "right": 10,
        "top": "50%",
        "height": 42,
        "lineHeight": 42,
        "color": "#474747",
        "fontSize": 10,
        "marginTop": -21
    },
    "custom-select added": {
        "color": "#000"
    },
    "custom-select drop-down-list": {
        "width": "100%",
        "height": "auto",
        "maxHeight": 150,
        "overflowX": "auto",
        "zIndex": 1,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "position": "absolute",
        "top": 41,
        "left": 0,
        "backgroundColor": "#fff",
        "display": "none",
        "MozBoxShadow": "1px 3px 5px rgba(0,0,0,.05)",
        "WebkitBoxShadow": "1px 3px 5px rgba(0,0,0,.05)",
        "boxShadow": "1px 3px 5px rgba(0,0,0,.05)"
    },
    "custom-select drop-down-list li": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "cursor": "pointer",
        "fontSize": 12,
        "lineHeight": "normal",
        "borderTop": "solid 1px #fff",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "textTransform": "uppercase",
        "backgroundColor": "#fff"
    },
    "custom-select drop-down-list li:hover": {
        "backgroundColor": "#f3291b",
        "color": "#fff"
    },
    "radio-switch": {
        "width": "100%",
        "display": "inline-block",
        "border": "1px solid #e6e6e6",
        "clear": "both"
    },
    "radio-switch label": {
        "width": "33.3%",
        "float": "left",
        "fontWeight": "400",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "textTransform": "uppercase",
        "height": 42,
        "lineHeight": 42,
        "textAlign": "center",
        "backgroundColor": "#fff",
        "color": "#cacaca",
        "cursor": "pointer",
        "position": "relative",
        "borderRight": "solid 1px #f0f0f0",
        "borderLeft": "solid 1px #f0f0f0"
    },
    "radio-switch labelactive": {
        "color": "#f3291b"
    },
    "radio-switch input[type=radio]": {
        "opacity": 0,
        "filter": "alpha(opacity=0)",
        "width": "100%",
        "cursor": "pointer",
        "height": "100%",
        "position": "absolute"
    },
    "radio-switch label+label": {
        "borderRight": "none"
    },
    "slider-ui-block": {
        "position": "relative",
        "paddingTop": 0,
        "paddingRight": 38,
        "paddingBottom": 0,
        "paddingLeft": 30,
        "top": 7
    },
    "slider-ui-block slider-value": {
        "position": "absolute",
        "top": -7,
        "fontSize": 13,
        "color": "#a5a5a5",
        "fontFamily": "montserratregular,sans-serif"
    },
    "slider-ui-block slider-valuemin-value": {
        "left": 0,
        "width": 30,
        "textAlign": "left"
    },
    "slider-ui-block slider-valuemax-value": {
        "right": 0,
        "width": 38,
        "textAlign": "right"
    },
    "slider-ui-block ui-slider": {
        "height": 3,
        "display": "block",
        "backgroundColor": "#d6dade",
        "position": "relative",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3
    },
    "slider-ui-block ui-slider-range": {
        "height": "100%",
        "top": 0,
        "display": "block",
        "position": "absolute",
        "backgroundColor": "#f3291b"
    },
    "slider-ui-block ui-slider-handle": {
        "position": "absolute",
        "top": -11,
        "width": 22,
        "height": 22,
        "borderRadius": "50%",
        "MozBorderRadius": "50%",
        "WebkitBorderRadius": "50%",
        "MsBorderRadius": "50%",
        "backgroundColor": "#fff",
        "display": "block",
        "cursor": "pointer",
        "marginLeft": -11,
        "outline": 0,
        "boxShadow": "0 1px 3px rgba(0,0,0,.18)"
    },
    "slider-ui-block ui-slider-handle:after": {
        "width": 10,
        "height": 10,
        "position": "absolute",
        "content": "",
        "display": "block",
        "left": "50%",
        "top": "50%",
        "marginLeft": -5,
        "marginTop": -5,
        "borderRadius": "50%",
        "MozBorderRadius": "50%",
        "WebkitBorderRadius": "50%",
        "MsBorderRadius": "50%",
        "backgroundColor": "#ebebeb"
    },
    "custom-radio label": {
        "width": "auto",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "cursor": "pointer",
        "fontSize": 16,
        "fontFamily": "montserratbold,sans-serif",
        "color": "#333434",
        "textTransform": "uppercase",
        "paddingLeft": 40,
        "position": "relative",
        "fontWeight": "400",
        "paddingTop": 3
    },
    "custom-radio label::after": {
        "content": "''",
        "width": 24,
        "height": 24,
        "position": "absolute",
        "left": 0,
        "top": 0,
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6",
        "borderRadius": "50%",
        "MozBorderRadius": "50%",
        "WebkitBorderRadius": "50%",
        "MsBorderRadius": "50%",
        "display": "inline-block",
        "zIndex": 1
    },
    "custom-radio labelactive::before": {
        "content": "''",
        "width": 12,
        "height": 12,
        "position": "absolute",
        "zIndex": 2,
        "left": 6,
        "top": 6,
        "backgroundColor": "#f3291b",
        "borderRadius": "50%",
        "MozBorderRadius": "50%",
        "WebkitBorderRadius": "50%",
        "MsBorderRadius": "50%",
        "display": "inline-block"
    },
    "custom-radio input[type=radio]": {
        "opacity": 0,
        "filter": "alpha(opacity=0)",
        "position": "absolute",
        "left": 0,
        "top": 0,
        "width": 24,
        "height": 24,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "overlay": {
        "position": "fixed",
        "left": 0,
        "top": 0,
        "width": "100%",
        "height": "100%",
        "display": "none",
        "backgroundColor": "rgba(242,242,242,.9)",
        "zIndex": 9,
        "cursor": "pointer"
    },
    "popup-box": {
        "position": "absolute",
        "width": "70%",
        "left": "15%",
        "top": 100,
        "zIndex": 10,
        "display": "none",
        "backgroundColor": "#fff",
        "WebkitBoxShadow": "2px 4px 8px rgba(0,0,0,.2)",
        "boxShadow": "2px 4px 8px rgba(0,0,0,.2)"
    },
    "popup-box close-btn": {
        "position": "absolute",
        "width": 50,
        "cursor": "pointer",
        "backgroundColor": "transparent",
        "fontSize": 20,
        "textAlign": "center",
        "right": -50,
        "top": 0,
        "WebkitTransition": "all .3s linear",
        "OTransition": "all .3s linear",
        "transition": "all .3s linear"
    },
    "popup-box close-btn:hover": {
        "color": "#f3291b"
    },
    "custom-checkbox": {
        "display": "inline-block",
        "position": "relative"
    },
    "custom-checkbox label": {
        "paddingLeft": 20,
        "fontSize": 14,
        "color": "#a5a5a5",
        "fontWeight": "400",
        "textAlign": "left",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "lineHeight": 1,
        "cursor": "pointer",
        "verticalAlign": "top"
    },
    "custom-checkbox label::after": {
        "content": "''",
        "position": "absolute",
        "width": 13,
        "height": 13,
        "left": 0,
        "top": 0,
        "backgroundColor": "#a5a5a5",
        "zIndex": 1,
        "borderRadius": 2,
        "MozBorderRadius": 2,
        "WebkitBorderRadius": 2,
        "MsBorderRadius": 2
    },
    "custom-checkbox label input[type=checkbox]": {
        "position": "absolute",
        "left": 0,
        "top": 0,
        "opacity": 0,
        "filter": "alpha(opacity=0)"
    },
    "custom-checkbox labelactive": {
        "color": "#333434"
    },
    "custom-checkbox labelactive::after": {
        "backgroundColor": "#f3291b"
    },
    "custom-checkbox labelactive::before": {
        "content": "'✓'",
        "position": "absolute",
        "width": 13,
        "height": 13,
        "zIndex": 2,
        "lineHeight": 13,
        "left": 0,
        "top": 0,
        "color": "#fff",
        "textAlign": "center",
        "fontWeight": "700",
        "fontSize": 10
    },
    "error-message": {
        "color": "#da190b",
        "fontSize": 14,
        "marginBottom": 15
    },
    "ui-input_state_invalid+ui-hint": {
        "color": "#da190b",
        "fontSize": 14,
        "marginTop": 5,
        "display": "block"
    },
    "form-control::-moz-placeholder": {
        "color": "#c9c9c9",
        "opacity": 1
    },
    "form-control:-ms-input-placeholder": {
        "color": "#c9c9c9"
    },
    "form-control::-webkit-input-placeholder": {
        "color": "#c9c9c9"
    },
    "form-control:focus": {
        "borderColor": "rgba(243,41,27,.8)",
        "WebkitBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "MozBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "boxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "textDecoration": "none",
        "outline": "0!important"
    },
    "primary-tabs": {
        "display": "block"
    },
    "primary-tabs nav-tabs": {
        "borderColor": "#e1e1e1",
        "backgroundColor": "#f5f5f5"
    },
    "primary-tabs nav-tabs>li": {
        "marginBottom": 0
    },
    "primary-tabs nav-tabs>li>a": {
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "color": "#333434",
        "fontSize": 14,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 15,
        "paddingRight": 30,
        "paddingBottom": 15,
        "paddingLeft": 30,
        "borderRadius": 0,
        "MozBorderRadius": 0,
        "WebkitBorderRadius": 0,
        "MsBorderRadius": 0
    },
    "primary-tabs nav-tabs>li:last-child a": {
        "borderRight": "none"
    },
    "primary-tabs nav-tabs>liactive>a": {
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "borderColor": "#f3291b"
    },
    "primary-tabs nav-tabs>liactive>a:focus": {
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "borderColor": "#f3291b"
    },
    "primary-tabs nav-tabs>liactive>a:hover": {
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "borderColor": "#f3291b"
    },
    "primary-tabs tab-content": {
        "paddingTop": 30,
        "paddingRight": 0,
        "paddingBottom": 30,
        "paddingLeft": 0
    },
    "common-layout-box": {
        "backgroundColor": "#f4f5f5",
        "borderTop": "1px solid #ddd",
        "paddingTop": 60,
        "paddingRight": 0,
        "paddingBottom": 80,
        "paddingLeft": 0
    },
    "common-layout-box common-layout-box-wrap": {
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "width": 700
    },
    "common-layout-box common-layout-box-wrap header-wrap": {
        "backgroundColor": "#fff",
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 0,
        "paddingLeft": 30,
        "color": "#333434",
        "fontFamily": "montserratbold,sans-serif",
        "fontSize": 16,
        "textTransform": "uppercase"
    },
    "common-layout-box common-layout-box-wrap common-layout-content": {
        "paddingTop": 20,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30
    },
    "common-layout-box common-layout-box-wrap heading-category": {
        "fontSize": 16,
        "textTransform": "uppercase",
        "marginBottom": 15,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "borderBottom": "solid 1px #eee",
        "paddingBottom": 10
    },
    "grid-sm": {
        "marginLeft": -5,
        "marginRight": -5
    },
    "grid-sm [class^=col-]": {
        "paddingLeft": 5,
        "paddingRight": 5
    },
    "owl-carousel owl-wrapper:after": {
        "content": ".",
        "display": "block",
        "clear": "both",
        "visibility": "hidden",
        "lineHeight": 0,
        "height": 0
    },
    "owl-carousel": {
        "display": "none",
        "position": "relative",
        "width": "100%",
        "MsTouchAction": "pan-y"
    },
    "owl-carousel owl-wrapper": {
        "display": "none",
        "position": "relative",
        "WebkitBackfaceVisibility": "hidden",
        "MozBackfaceVisibility": "hidden",
        "MsBackfaceVisibility": "hidden",
        "WebkitTransform": "translate3d(0,0,0)",
        "MozTransform": "translate3d(0,0,0)",
        "MsTransform": "translate3d(0,0,0)"
    },
    "owl-carousel owl-wrapper-outer": {
        "overflow": "hidden",
        "position": "relative",
        "width": "100%"
    },
    "owl-carousel owl-wrapper-outerautoHeight": {
        "WebkitTransition": "height 500ms ease-in-out",
        "MozTransition": "height 500ms ease-in-out",
        "MsTransition": "height 500ms ease-in-out",
        "OTransition": "height 500ms ease-in-out",
        "transition": "height 500ms ease-in-out"
    },
    "owl-carousel owl-item": {
        "float": "left",
        "WebkitBackfaceVisibility": "hidden",
        "MozBackfaceVisibility": "hidden",
        "MsBackfaceVisibility": "hidden",
        "WebkitTransform": "translate3d(0,0,0)",
        "MozTransform": "translate3d(0,0,0)",
        "MsTransform": "translate3d(0,0,0)"
    },
    "owl-controls owl-buttons div": {
        "cursor": "pointer"
    },
    "owl-controls owl-page": {
        "cursor": "pointer"
    },
    "owl-controls": {
        "WebkitUserSelect": "none",
        "KhtmlUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "userSelect": "none",
        "WebkitTapHighlightColor": "rgba(0,0,0,0)"
    },
    "grabbing": {
        "cursor": "url(../images/grabbing.png) 8 8,move"
    },
    "owl-theme owl-controls": {
        "marginTop": 10,
        "textAlign": "center"
    },
    "owl-theme owl-controls owl-buttons div": {
        "color": "#FFF",
        "display": "inline-block",
        "zoom": 1,
        "Display": "inline",
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5,
        "paddingTop": 3,
        "paddingRight": 10,
        "paddingBottom": 3,
        "paddingLeft": 10,
        "fontSize": 12,
        "WebkitBorderRadius": 30,
        "MozBorderRadius": 30,
        "borderRadius": 30,
        "background": "#869791",
        "filter": "alpha(opacity=50)",
        "opacity": 0.5
    },
    "owl-theme owl-controlsclickable owl-buttons div:hover": {
        "filter": "alpha(opacity=100)",
        "opacity": 1,
        "textDecoration": "none"
    },
    "owl-theme owl-controls owl-page": {
        "display": "inline-block",
        "zoom": 1,
        "Display": "inline"
    },
    "owl-theme owl-controls owl-page span": {
        "display": "block",
        "width": 12,
        "height": 12,
        "marginTop": 5,
        "marginRight": 7,
        "marginBottom": 5,
        "marginLeft": 7,
        "filter": "alpha(opacity=50)",
        "opacity": 0.5,
        "WebkitBorderRadius": 20,
        "MozBorderRadius": 20,
        "borderRadius": 20,
        "background": "#869791"
    },
    "owl-theme owl-controls owl-pageactive span": {
        "filter": "alpha(opacity=100)",
        "opacity": 1
    },
    "owl-theme owl-controlsclickable owl-page:hover span": {
        "filter": "alpha(opacity=100)",
        "opacity": 1
    },
    "owl-theme owl-controls owl-page spanowl-numbers": {
        "height": "auto",
        "width": "auto",
        "color": "#FFF",
        "paddingTop": 2,
        "paddingRight": 10,
        "paddingBottom": 2,
        "paddingLeft": 10,
        "fontSize": 12,
        "WebkitBorderRadius": 30,
        "MozBorderRadius": 30,
        "borderRadius": 30
    },
    "owl-itemloading": {
        "minHeight": 150,
        "background": "url(../images/AjaxLoader.gif) center center no-repeat"
    },
    "form-control:hover": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "button:focus": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "button:hover": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "input[type=checkbox]:hover": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "input[type=radio]:hover": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "select:focus": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "select:hover": {
        "textDecoration": "none",
        "outline": "0!important"
    },
    "select:-moz-focusring": {
        "color": "transparent",
        "textShadow": "0 0 0 #000"
    },
    "input[type=text]": {
        "WebkitAppearance": "none",
        "MozAppearance": "none"
    },
    "input[type=email]": {
        "WebkitAppearance": "none",
        "MozAppearance": "none"
    },
    "input[type=password]": {
        "WebkitAppearance": "none",
        "MozAppearance": "none"
    },
    "header fluid-container": {
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "header top-header": {
        "backgroundColor": "#fff",
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0
    },
    "header right-menu": {
        "float": "right",
        "marginTop": 8
    },
    "header right-menu ul": {
        "display": "inline-block",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "header right-menu ul li": {
        "display": "inline-block",
        "position": "relative",
        "verticalAlign": "top"
    },
    "header right-menu ul li a": {
        "fontSize": 13,
        "textTransform": "uppercase",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "color": "#000",
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "header right-menu ul li aactive": {
        "color": "#da190b"
    },
    "header right-menu ul li a:hover": {
        "color": "#da190b"
    },
    "header signin-opt": {
        "display": "inline-block",
        "borderLeft": "solid 1px #d1d4d5"
    },
    "header signin-opt i": {
        "marginLeft": 2,
        "color": "#f3291b",
        "fontSize": 10
    },
    "header signin-opt a": {
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "fontSize": 13,
        "textTransform": "uppercase",
        "marginLeft": 10
    },
    "search-container": {
        "backgroundColor": "#f4f5f5",
        "paddingTop": 35,
        "paddingRight": 0,
        "paddingBottom": 35,
        "paddingLeft": 0
    },
    "search-container search-home-stay": {
        "width": 170,
        "float": "left"
    },
    "search-container search-home-stay h4": {
        "color": "#da190b",
        "textTransform": "uppercase",
        "marginBottom": 8,
        "fontSize": 13,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "search-container search-home-stay p": {
        "color": "#000",
        "fontSize": 13
    },
    "search-container right-wrapper": {
        "marginLeft": 170,
        "paddingLeft": 10
    },
    "search-container right-wrapper row": {
        "marginLeft": -10,
        "marginRight": -10
    },
    "search-container right-wrapper row [class^=col-]": {
        "paddingLeft": 10,
        "paddingRight": 10
    },
    "search-container right-wrapper primary-btnlg": {
        "width": "100%",
        "paddingTop": 15,
        "paddingRight": 0,
        "paddingBottom": 15,
        "paddingLeft": 0,
        "textAlign": "center",
        "marginTop": 22
    },
    "search-container right-wrapper custom-checkbox": {
        "marginTop": 15
    },
    "center-block-wrap": {
        "paddingTop": 0,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20,
        "borderLeft": "solid 1px #d1d4d5",
        "borderRight": "solid 1px #d1d4d5"
    },
    "center-block-wrap h4": {
        "color": "#000",
        "textTransform": "uppercase",
        "marginBottom": 8,
        "fontSize": 13,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "center-block-wrap h4 span": {
        "color": "#a8a9a9"
    },
    "center-block-wrap age-block h4": {
        "float": "left",
        "width": 50,
        "marginBottom": 0
    },
    "center-block-wrap age-block slider-ui-block": {
        "marginLeft": 50
    },
    "center-block-wrap stay-block h4": {
        "float": "left",
        "width": 160,
        "marginBottom": 0
    },
    "center-block-wrap stay-block slider-ui-block": {
        "marginLeft": 160
    },
    "center-block-wrap slider-block": {
        "marginTop": 10
    },
    "center-block-wrap slider-block h4": {
        "paddingTop": 2
    },
    "main-banner": {
        "position": "relative",
        "textAlign": "center"
    },
    "main-banner media-wrapper img": {
        "maxWidth": "100%",
        "minWidth": "100%",
        "maxHeight": 100 * vh
    },
    "main-banner container": {
        "position": "relative",
        "height": "100%"
    },
    "main-banner banner-content": {
        "position": "absolute",
        "height": "100%",
        "top": "35%",
        "left": 0,
        "width": "100%"
    },
    "main-banner h1": {
        "fontSize": 26,
        "paddingTop": 0,
        "paddingRight": "15%",
        "paddingBottom": 0,
        "paddingLeft": "15%",
        "fontFamily": "montserratbold,sans-serif",
        "color": "#fff",
        "textTransform": "uppercase",
        "marginBottom": 10
    },
    "main-banner p": {
        "color": "#fff",
        "fontSize": 16,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "marginBottom": 30
    },
    "main-banner default-btn": {
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15
    },
    "main-bannervideo-banner banner-content": {
        "top": "30%"
    },
    "main-bannervideo-banner h1": {
        "fontSize": 26,
        "paddingTop": 0,
        "paddingRight": "20%",
        "paddingBottom": 0,
        "paddingLeft": "20%"
    },
    "main-bannervideo-banner video-play-btn": {
        "display": "inline-block"
    },
    "main-banner video-play-btn": {
        "display": "none",
        "width": 80,
        "height": 80,
        "textAlign": "center",
        "lineHeight": 80,
        "fontSize": 60,
        "marginBottom": 10,
        "color": "#fff"
    },
    "main-banner video-play-btn:hover": {
        "color": "#f3291b"
    },
    "main-content-wrapper": {
        "overflow": "hidden"
    },
    "homestay-lists": {
        "paddingTop": 90,
        "paddingRight": 0,
        "paddingBottom": 90,
        "paddingLeft": 0
    },
    "main-head-txt": {
        "color": "#3d3d40",
        "fontSize": 18,
        "fontFamily": "montserratregular,sans-serif",
        "textTransform": "uppercase",
        "paddingBottom": 40,
        "marginBottom": 40,
        "position": "relative",
        "textAlign": "center",
        "letterSpacing": 0.5
    },
    "main-head-txt::after": {
        "content": "''",
        "position": "absolute",
        "bottom": 0,
        "left": "50%",
        "width": 170,
        "marginLeft": -85,
        "backgroundColor": "#e7e7e7",
        "height": 2
    },
    "list-block": {
        "width": "100%",
        "position": "relative",
        "marginBottom": 30
    },
    "list-block figure img": {
        "maxWidth": "100%",
        "minWidth": "100%"
    },
    "list-block figure::after": {
        "content": "''",
        "position": "absolute",
        "left": 0,
        "top": 0,
        "width": "100%",
        "height": "100%",
        "opacity": 0.65,
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#a6000000', GradientType=0)",
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear",
        "background": "linear-gradient(to bottom,rgba(0,0,0,0) 0,#000 100%)"
    },
    "list-block:hover figure::after": {
        "opacity": 0.8,
        "filter": "alpha(opacity=80)"
    },
    "list-block list-block-content": {
        "position": "absolute",
        "left": 0,
        "bottom": 0,
        "width": "100%",
        "paddingTop": 15,
        "paddingRight": 25,
        "paddingBottom": 15,
        "paddingLeft": 25
    },
    "list-block list-block-content home-name": {
        "fontSize": 15,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "textTransform": "uppercase",
        "color": "#fff",
        "display": "block",
        "marginBottom": 8
    },
    "list-block list-block-content home-location": {
        "fontSize": 15,
        "color": "#cfcdcd"
    },
    "list-block list-block-content a:hover home-location": {
        "textDecoration": "underline"
    },
    "list-block list-block-content a:hover home-name": {
        "textDecoration": "underline"
    },
    "about-rooms-btn": {
        "marginTop": 60
    },
    "footer address": {
        "marginBottom": 0,
        "textTransform": "uppercase"
    },
    "footer address span": {
        "display": "block",
        "position": "relative",
        "paddingLeft": 30,
        "marginBottom": 15,
        "fontSize": 13
    },
    "footer address i": {
        "fontSize": 16,
        "fontWeight": "400",
        "position": "absolute",
        "left": 0,
        "top": 0,
        "color": "#bebebe"
    },
    "footer address a": {
        "color": "#bebebe"
    },
    "footer address a:hover": {
        "color": "#fff",
        "textDecoration": "underline"
    },
    "footer address p": {
        "fontSize": 13,
        "marginTop": 20,
        "color": "#bebebe",
        "marginBottom": 0,
        "maxWidth": 155
    },
    "footer home-stay-widget": {
        "float": "right",
        "maxWidth": 320
    },
    "footer-menu": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginBottom": 30
    },
    "footer-menu li": {
        "display": "block",
        "marginBottom": 10
    },
    "footer-menu li:last-child": {
        "marginBottom": 0
    },
    "footer-menu a": {
        "fontSize": 12,
        "color": "#bebebe",
        "textTransform": "uppercase",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "footer-menu a:hover": {
        "color": "#fff"
    },
    "social-share a": {
        "border": "1px solid #59595a",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "lineHeight": 42,
        "textAlign": "center",
        "fontSize": 20,
        "color": "#59595a",
        "display": "inline-block",
        "marginRight": 10,
        "width": 42,
        "height": 42
    },
    "social-share a:hover": {
        "borderColor": "#a6a6a6",
        "color": "#a6a6a6"
    },
    "home-stay-widget widget-logo": {
        "marginBottom": 20
    },
    "home-stay-widget widget-logo img": {
        "maxWidth": "100%"
    },
    "home-stay-widget p": {
        "fontSize": 14,
        "color": "#6b6b6f",
        "marginBottom": 30
    },
    "home-stay-widget subscriber": {
        "position": "relative"
    },
    "home-stay-widget subscriber form-control": {
        "width": "100%",
        "height": 42,
        "fontFamily": "source_sans_proregular,sans-serif",
        "border": "1px solid #646465",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "fontSize": 13,
        "backgroundColor": "transparent",
        "color": "#bebebe"
    },
    "home-stay-widget subscriber form-control::-webkit-input-placeholder": {
        "color": "#646465",
        "textTransform": "uppercase"
    },
    "home-stay-widget subscriber form-control:-moz-placeholder": {
        "color": "#646465",
        "textTransform": "uppercase"
    },
    "home-stay-widget subscriber form-control::-moz-placeholder": {
        "color": "#646465",
        "textTransform": "uppercase"
    },
    "home-stay-widget subscriber form-control:-ms-input-placeholder": {
        "color": "#646465",
        "textTransform": "uppercase"
    },
    "home-stay-widget subscriber primary-btn": {
        "width": 110,
        "position": "absolute",
        "height": 42,
        "right": 0,
        "top": 0,
        "borderRadius": "0 3px 3px 0",
        "MozBorderRadius": "0 3px 3px 0",
        "WebkitBorderRadius": "0 3px 3px 0",
        "MsBorderRadius": "0 3px 3px 0"
    },
    "bottom-footer": {
        "marginTop": 60,
        "backgroundColor": "#383839",
        "paddingTop": 20,
        "paddingRight": 0,
        "paddingBottom": 20,
        "paddingLeft": 0
    },
    "bottom-footer copy-right": {
        "color": "#6b6b6f",
        "fontSize": 13
    },
    "bottom-footer a": {
        "color": "#6b6b6f",
        "marginLeft": 30
    },
    "bottom-footer a:hover": {
        "color": "#b6b6b6"
    },
    "search-toggle-btn": {
        "backgroundColor": "#f4f5f5",
        "width": 43,
        "textAlign": "center",
        "height": 50,
        "border": "none",
        "position": "absolute",
        "display": "inline-block",
        "right": 0,
        "top": -5,
        "fontSize": 16,
        "color": "#f3291b",
        "borderRadius": "3px 3px 0 0",
        "MozBorderRadius": "3px 3px 0 0",
        "WebkitBorderRadius": "3px 3px 0 0",
        "MsBorderRadius": "3px 3px 0 0"
    },
    "search-toggle-btn icon-toggle-arrow": {
        "display": "block",
        "width": "100%",
        "height": "100%",
        "lineHeight": 40
    },
    "search-toggle-btn icon-toggle-arrow::before": {
        "content": "\\e911"
    },
    "search-toggle-btn:hover": {
        "color": "#000"
    },
    "search-toggle-btnopen icon-toggle-arrow::before": {
        "content": "\\e90f"
    },
    "star-rating span": {
        "width": 21,
        "height": 21,
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "0 0",
        "display": "inline-block",
        "marginTop": 1,
        "marginRight": 1,
        "marginBottom": 1,
        "marginLeft": 1
    },
    "star-rating star-full": {
        "backgroundImage": "url(../images/star-full.png)"
    },
    "star-rating star-half": {
        "backgroundImage": "url(../images/star-half.png)"
    },
    "star-rating star-empty": {
        "backgroundImage": "url(../images/star-empty.png)"
    },
    "content-head": {
        "fontSize": 22,
        "color": "rgba(51,52,52,.9)",
        "textTransform": "uppercase",
        "fontFamily": "montserratbold,sans-serif",
        "marginBottom": 20
    },
    "details-wrapper": {
        "fontSize": 0,
        "position": "relative"
    },
    "details-wrapper::after": {
        "content": "''",
        "position": "absolute",
        "left": "100%",
        "top": 0,
        "backgroundColor": "#f2f1f1",
        "height": "100%",
        "width": "50%"
    },
    "details-wrapper::before": {
        "content": "''",
        "position": "absolute",
        "left": "-50%",
        "top": 0,
        "backgroundColor": "#f9f9f9",
        "height": "100%",
        "width": "50%"
    },
    "details-wrapper article": {
        "width": "50%",
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "details-wrapper about-content": {
        "paddingTop": 90,
        "paddingRight": 90,
        "paddingBottom": 90,
        "paddingLeft": 0
    },
    "details-wrapper about-content::after": {
        "content": "''",
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "left": 0,
        "top": 0,
        "backgroundColor": "#f9f9f9",
        "zIndex": -1
    },
    "details-wrapper about-content p": {
        "color": "rgba(51,52,52,.8)",
        "fontSize": 16
    },
    "details-wrapper address": {
        "color": "rgba(51,52,52,.8)",
        "fontSize": 16,
        "paddingBottom": 20,
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "borderBottom": "solid 1px #e0e0e0"
    },
    "details-wrapper address span": {
        "display": "block",
        "marginBottom": 5,
        "textTransform": "uppercase",
        "fontSize": 12,
        "fontFamily": "montserratregular,sans-serif",
        "color": "rgba(102,103,103,.7)"
    },
    "details-wrapper specifications": {
        "marginBottom": 20
    },
    "details-wrapper specifications span": {
        "marginRight": 15,
        "color": "rgba(51,52,52,.8)",
        "fontSize": 16
    },
    "details-wrapper specifications span i": {
        "fontStyle": "normal",
        "color": "rgba(243,41,27,.8)",
        "marginLeft": 2,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "details-wrapper specifications span:last-child": {
        "marginRight": 0
    },
    "details-wrapper daily-price-card": {
        "paddingBottom": 20,
        "marginBottom": 20,
        "borderBottom": "solid 1px #e6e6e6"
    },
    "details-wrapper daily-price-card form-control": {
        "marginTop": 10,
        "width": 160,
        "marginRight": 15,
        "textTransform": "uppercase",
        "fontSize": 13,
        "height": 48,
        "fontFamily": "montserratregular,sans-serif"
    },
    "details-wrapper daily-price-card form-control::-moz-placeholder": {
        "color": "#c9c9c9",
        "opacity": 1
    },
    "details-wrapper daily-price-card form-control:-ms-input-placeholder": {
        "color": "#c9c9c9"
    },
    "details-wrapper daily-price-card form-control::-webkit-input-placeholder": {
        "color": "#c9c9c9"
    },
    "details-wrapper daily-price-card form-control:last-child": {
        "marginRight": 0
    },
    "details-wrapper daily-price-card avail-date": {
        "paddingRight": 40,
        "cursor": "pointer",
        "background": "url(../images/calender-icon.png) 125px center no-repeat #fff"
    },
    "details-wrapper daily-price-card text-field": {
        "display": "none",
        "position": "relative"
    },
    "details-wrapper conditions-content": {
        "paddingTop": 90,
        "paddingRight": 0,
        "paddingBottom": 90,
        "paddingLeft": 90
    },
    "details-wrapper conditions-content::after": {
        "content": "''",
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "left": "50%",
        "top": 0,
        "backgroundColor": "#f2f1f1",
        "zIndex": -1
    },
    "details-wrapper conditions-content sub-para": {
        "fontSize": 14,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "color": "#333434",
        "textTransform": "uppercase"
    },
    "details-wrapper conditions-content green-list": {
        "paddingTop": 30,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "requirements-wrapper": {
        "fontSize": 0,
        "position": "relative"
    },
    "requirements-wrapper::after": {
        "content": "''",
        "position": "absolute",
        "left": "100%",
        "top": 0,
        "backgroundColor": "#f9f9f9",
        "height": "100%",
        "width": "50%"
    },
    "requirements-wrapper::before": {
        "content": "''",
        "position": "absolute",
        "left": "-50%",
        "top": 0,
        "backgroundColor": "#f2f1f1",
        "height": "100%",
        "width": "50%"
    },
    "requirements-wrapper aside": {
        "width": "50%",
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "requirements-wrapper content-head": {
        "marginBottom": 30
    },
    "requirements-wrapper services-block": {
        "paddingTop": 90,
        "paddingRight": 90,
        "paddingBottom": 90,
        "paddingLeft": 0,
        "textAlign": "left"
    },
    "requirements-wrapper services-block::after": {
        "content": "''",
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "left": 0,
        "top": 0,
        "backgroundColor": "#f2f1f1",
        "zIndex": -1
    },
    "requirements-wrapper services-block ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "requirements-wrapper services-block ul li": {
        "display": "inline-block",
        "color": "#636466",
        "fontSize": 14,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "textTransform": "uppercase",
        "fontWeight": "400",
        "position": "relative",
        "paddingRight": 15,
        "marginRight": 15,
        "lineHeight": 1,
        "marginBottom": 20
    },
    "requirements-wrapper services-block ul li::after": {
        "content": "''",
        "position": "absolute",
        "width": 2,
        "height": "100%",
        "top": 0,
        "right": 0,
        "backgroundColor": "#f3291b",
        "display": "inline-block"
    },
    "requirements-wrapper tenant-block": {
        "paddingTop": 90,
        "paddingRight": 0,
        "paddingBottom": 90,
        "paddingLeft": 90
    },
    "requirements-wrapper tenant-block::after": {
        "content": "''",
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "backgroundColor": "#f9f9f9",
        "left": "50%",
        "top": 0,
        "zIndex": -1
    },
    "requirements-wrapper specifications": {
        "marginBottom": 20
    },
    "requirements-wrapper specifications span": {
        "marginRight": 15,
        "color": "rgba(51,52,52,.8)",
        "fontSize": 16
    },
    "requirements-wrapper specifications span i": {
        "fontStyle": "normal",
        "color": "rgba(243,41,27,.8)",
        "marginLeft": 2,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "requirements-wrapper specifications span:last-child": {
        "marginRight": 0
    },
    "commentbox-wrapper": {
        "paddingTop": 60,
        "paddingRight": 0,
        "paddingBottom": 60,
        "paddingLeft": 0
    },
    "comment-form form-control": {
        "borderColor": "#ebeff6",
        "fontFamily": "montserratregular,sans-serif",
        "marginBottom": 20,
        "backgroundColor": "#fafbfc",
        "color": "#333434",
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30,
        "minHeight": 100
    },
    "comment-form form-control::-moz-placeholder": {
        "color": "#b7bec1",
        "opacity": 1
    },
    "comment-form form-control:-ms-input-placeholder": {
        "color": "#b7bec1"
    },
    "comment-form form-control::-webkit-input-placeholder": {
        "color": "#b7bec1"
    },
    "comment-form form-control:focus": {
        "backgroundColor": "#fff",
        "borderColor": "rgba(243,41,27,.8)",
        "WebkitBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "MozBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "boxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)"
    },
    "comments-items-wrapper": {
        "paddingTop": 20,
        "marginTop": 30,
        "borderTop": "solid 1px #ebeff6",
        "textAlign": "center"
    },
    "comments-items-wrapper ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "textAlign": "left"
    },
    "comments-items-wrapper li": {
        "display": "block",
        "listStyle": "none",
        "paddingBottom": 20,
        "marginBottom": 30,
        "borderBottom": "solid 1px #ebeff6"
    },
    "comments-items-wrapper li:last-child": {
        "marginBottom": 0
    },
    "comments-items-wrapper comment-header": {
        "marginBottom": 10
    },
    "comments-items-wrapper username": {
        "fontSize": 16,
        "color": "#636466",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "marginRight": 5
    },
    "comments-items-wrapper date": {
        "fontSize": 14,
        "color": "#ababab",
        "marginTop": 5
    },
    "comments-items-wrapper location": {
        "fontSize": 14,
        "color": "#ababab"
    },
    "comments-items-wrapper p": {
        "color": "rgba(51,52,52,.8)",
        "fontSize": 16,
        "maxWidth": "50%"
    },
    "comments-items-wrapper btn": {
        "paddingTop": 5,
        "paddingRight": 0,
        "paddingBottom": 5,
        "paddingLeft": 0,
        "color": "#636466",
        "marginRight": 10
    },
    "comments-items-wrapper btndelete:hover": {
        "color": "#f3291b"
    },
    "comments-items-wrapper btnreply:hover": {
        "color": "#333"
    },
    "comments-items-wrapper ul li ul": {
        "paddingLeft": 30,
        "marginTop": 15
    },
    "comments-items-wrapper ul li ul li": {
        "paddingTop": 20,
        "borderTop": "solid 1px #ebeff6",
        "marginBottom": 0,
        "paddingBottom": 10,
        "borderBottom": "none"
    },
    "comments-items-wrapper ul li ul li:last-child": {
        "paddingBottom": 0
    },
    "comments-items-wrapper loadmore-comments": {
        "marginTop": 15,
        "color": "#828282",
        "backgroundColor": "#f5f5f5",
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15
    },
    "comments-items-wrapper loadmore-comments i": {
        "fontSize": 10,
        "marginLeft": 5
    },
    "comments-items-wrapper loadmore-comments:hover": {
        "color": "#636466"
    },
    "search-result-txt": {
        "fontSize": 18,
        "textTransform": "uppercase",
        "color": "#da190b",
        "marginBottom": 30,
        "fontFamily": "montserratregular,sans-serif"
    },
    "search-lists": {
        "paddingTop": 40,
        "paddingRight": 0,
        "paddingBottom": 90,
        "paddingLeft": 0
    },
    "load-more": {
        "textAlign": "center",
        "marginTop": 20,
        "WebkitTransition": "all .3s linear",
        "OTransition": "all .3s linear",
        "transition": "all .3s linear",
        "opacity": 0.6,
        "filter": "alpha(opacity=60)"
    },
    "load-more load-box": {
        "display": "inline-block"
    },
    "load-more img": {
        "maxWidth": "100%"
    },
    "load-more span": {
        "display": "block",
        "fontSize": 14,
        "textTransform": "uppercase",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "color": "#b7b7b7",
        "marginRight": -10,
        "marginTop": 5
    },
    "load-more a:hover": {
        "opacity": 0.8,
        "filter": "alpha(opacity=80)"
    },
    "videoPopup": {
        "position": "fixed",
        "top": 10 * vh
    },
    "videoPopup iframe": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "width": "100%",
        "height": 80 * vh,
        "border": "none",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "login": {
        "backgroundColor": "#f4f5f5"
    },
    "signup": {
        "backgroundColor": "#f4f5f5"
    },
    "signup user-accounts-wrapper": {
        "width": 600
    },
    "signup user-accounts-wrapper middle-block": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 30,
        "marginLeft": 0
    },
    "user-accounts-wrapper": {
        "width": 450,
        "marginTop": 60,
        "marginRight": "auto",
        "marginBottom": 60,
        "marginLeft": "auto"
    },
    "user-accounts-wrapper header-wrap": {
        "backgroundColor": "#fff",
        "paddingTop": 20,
        "paddingRight": 35,
        "paddingBottom": 20,
        "paddingLeft": 35,
        "color": "#333434",
        "fontFamily": "montserratbold,sans-serif",
        "fontSize": 16,
        "textTransform": "uppercase",
        "border": "1px solid #e6e6e6"
    },
    "user-accounts-wrapper user-form-wrap": {
        "paddingTop": 35,
        "paddingRight": 35,
        "paddingBottom": 35,
        "paddingLeft": 35,
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6",
        "borderTop": "none"
    },
    "user-accounts-wrapper form-control": {
        "borderColor": "#e6e6e6",
        "fontFamily": "montserratregular,sans-serif"
    },
    "user-accounts-wrapper form-control::-moz-placeholder": {
        "color": "#c9c9c9",
        "opacity": 1
    },
    "user-accounts-wrapper form-control:-ms-input-placeholder": {
        "color": "#c9c9c9"
    },
    "user-accounts-wrapper form-control::-webkit-input-placeholder": {
        "color": "#c9c9c9"
    },
    "user-accounts-wrapper form-control:focus": {
        "borderColor": "rgba(243,41,27,.8)",
        "WebkitBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "MozBoxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)",
        "boxShadow": "0 1px 1px rgba(0,0,0,.075) inset,0 0 8px rgba(243,41,27,.2)"
    },
    "user-accounts-wrapper control-label": {
        "fontWeight": "400",
        "textTransform": "uppercase"
    },
    "user-accounts-wrapper custom-checkbox label": {
        "verticalAlign": "middle",
        "paddingLeft": 26
    },
    "user-accounts-wrapper custom-checkbox label::after": {
        "width": 16,
        "height": 16
    },
    "user-accounts-wrapper custom-checkbox labelactive::before": {
        "width": 16,
        "height": 16,
        "lineHeight": 16,
        "fontSize": 13
    },
    "user-accounts-wrapper middle-block": {
        "marginTop": 30,
        "marginRight": 0,
        "marginBottom": 30,
        "marginLeft": 0
    },
    "user-accounts-wrapper forgot-password": {
        "float": "right",
        "marginTop": 1
    },
    "user-accounts-wrapper forgot-password:hover": {
        "textDecoration": "underline"
    },
    "user-accounts-wrapper option-for-user": {
        "fontSize": 14,
        "marginTop": 12,
        "display": "inline-block",
        "color": "rgba(51,52,52,.7)"
    },
    "user-accounts-wrapper option-for-user:hover": {
        "color": "rgba(51,52,52,.9)"
    },
    "user-accounts-wrapper user-logo": {
        "textAlign": "center",
        "marginBottom": 30
    },
    "user-accounts-wrapper user-logo img": {
        "maxWidth": 200
    },
    "user-accounts-wrapper error-message": {
        "marginTop": -5
    },
    "view-profile": {
        "backgroundColor": "#f4f5f5",
        "paddingTop": 60,
        "paddingRight": 0,
        "paddingBottom": 80,
        "paddingLeft": 0,
        "borderTop": "1px solid #ddd"
    },
    "view-profile view-profile-wrapper": {
        "width": 700,
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6"
    },
    "view-profile header-wrap": {
        "paddingTop": 20,
        "paddingRight": 30,
        "paddingBottom": 20,
        "paddingLeft": 30,
        "color": "#333434",
        "fontFamily": "montserratbold,sans-serif",
        "fontSize": 16,
        "textTransform": "uppercase",
        "backgroundColor": "#fff"
    },
    "view-profile form-horizontal error-message": {
        "marginTop": 15,
        "marginBottom": 0
    },
    "view-profile form-horizontal control-label": {
        "fontWeight": "400",
        "paddingTop": 10,
        "fontSize": 14,
        "textAlign": "left",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "view-profile form-horizontal semi": {
        "float": "right",
        "fontStyle": "normal",
        "opacity": 0.7,
        "filter": "alpha(opacity=70)"
    },
    "view-profile form-horizontal form-control": {
        "fontFamily": "montserratregular,sans-serif"
    },
    "view-profile form-controlinput-file": {
        "height": "auto"
    },
    "view-profile uploaded-medias figure": {
        "width": 80,
        "display": "inline-block",
        "marginTop": 10,
        "border": "1px solid #ccc",
        "paddingTop": 3,
        "paddingRight": 3,
        "paddingBottom": 3,
        "paddingLeft": 3
    },
    "view-profile align-with-cols": {
        "paddingRight": 30
    },
    "view-profile primary-tabs tab-content": {
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30
    },
    "view-profile add-more": {
        "textTransform": "none",
        "fontFamily": "source_sans_proregular,sans-serif",
        "marginTop": 15,
        "paddingTop": 5,
        "paddingRight": 10,
        "paddingBottom": 3,
        "paddingLeft": 10,
        "fontSize": 13
    },
    "view-profile profile-category": {
        "fontSize": 16,
        "textTransform": "uppercase",
        "marginBottom": 25,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "borderBottom": "solid 1px #eee",
        "paddingBottom": 10
    },
    "view-profile custom-checkbox": {
        "marginTop": 14
    },
    "view-profile custom-checkbox label": {
        "verticalAlign": "middle",
        "paddingLeft": 26
    },
    "view-profile custom-checkbox label::after": {
        "width": 16,
        "height": 16
    },
    "view-profile custom-checkbox labelactive::before": {
        "width": 16,
        "height": 16,
        "lineHeight": 16,
        "fontSize": 13
    },
    "book-your-room-wrapper": {
        "paddingTop": 20,
        "paddingRight": 30,
        "paddingBottom": 20,
        "paddingLeft": 30
    },
    "book-your-room-wrapper location": {
        "fontFamily": "source_sans_proregular,sans-serif",
        "fontSize": 14
    },
    "book-your-room-wrapper location b": {
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "fontWeight": "400"
    },
    "book-your-room-wrapper bottom-price": {
        "marginTop": 10
    },
    "book-your-room-wrapper price-details": {
        "display": "inline-block",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "fontSize": 16,
        "verticalAlign": "middle"
    },
    "book-your-room-wrapper homestay-image": {
        "border": "1px solid #ddd",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "book-your-room-wrapper star-rating": {
        "display": "inline-block",
        "verticalAlign": "middle",
        "marginLeft": 15,
        "height": 21
    },
    "book-your-room-wrapper star-rating span": {
        "WebkitTransform": "scale(.7)",
        "MsTransform": "scale(.7)",
        "OTransform": "scale(.7)",
        "transform": "scale(.7)",
        "marginTop": 1,
        "marginRight": -2,
        "marginBottom": 1,
        "marginLeft": -2
    },
    "students-form form-horizontal error-message": {
        "marginTop": 15,
        "marginBottom": 0
    },
    "students-form form-horizontal control-label": {
        "fontWeight": "400",
        "paddingTop": 10,
        "fontSize": 14,
        "textAlign": "left",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "students-form form-horizontal semi": {
        "float": "right",
        "fontStyle": "normal",
        "opacity": 0.7,
        "filter": "alpha(opacity=70)"
    },
    "students-form form-horizontal form-control": {
        "fontFamily": "montserratregular,sans-serif"
    },
    "students-form dob": {
        "paddingRight": 40,
        "cursor": "pointer",
        "background": "url(../images/calender-icon.png) 90% center no-repeat #fff"
    },
    "students-form custom-select": {
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3
    },
    "students-form custom-select drop-down-list": {
        "border": "1px solid #e6e6e6",
        "borderTop": "none",
        "width": "calc(100% + 2px)",
        "marginLeft": -1,
        "marginRight": -1
    },
    "students-form cancel-btn": {
        "marginLeft": 10
    },
    "similar-homestays": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0,
        "paddingTop": 20,
        "paddingRight": 0,
        "paddingBottom": 20,
        "paddingLeft": 0,
        "borderBottom": "solid 1px #eee",
        "borderTop": "solid 1px #eee"
    },
    "similar-homestays homestay-items": {
        "width": "100%",
        "display": "block",
        "position": "relative"
    },
    "similar-homestays homestay-items figure img": {
        "width": "100%",
        "maxHeight": 190
    },
    "similar-homestays selected content-box-homestay": {
        "WebkitBoxShadow": "0 0 0 3px #f3291b inset",
        "boxShadow": "0 0 0 3px #f3291b inset"
    },
    "similar-homestays selected content-box-homestay::after": {
        "content": "\\e918",
        "display": "inline-block",
        "fontFamily": "icomoon!important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontVariant": "normal",
        "textTransform": "none",
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale",
        "width": 24,
        "height": 24,
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "lineHeight": 24,
        "textAlign": "center",
        "position": "absolute",
        "right": 0,
        "top": 0,
        "fontSize": 12
    },
    "similar-homestays content-box-homestay": {
        "position": "absolute",
        "left": 0,
        "cursor": "pointer",
        "bottom": 0,
        "backgroundColor": "rgba(0,0,0,.6)",
        "width": "100%",
        "height": "100%",
        "paddingTop": 20,
        "paddingRight": 15,
        "paddingBottom": 20,
        "paddingLeft": 15,
        "color": "#fff"
    },
    "similar-homestays content-box-homestay title-home": {
        "color": "#fff",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "fontSize": 16,
        "display": "block",
        "marginBottom": 5
    },
    "similar-homestays content-box-homestay title-home:hover": {
        "textDecoration": "underline"
    },
    "similar-homestays content-box-homestay p": {
        "color": "#fff",
        "marginBottom": 5,
        "lineHeight": 16,
        "fontSize": 14,
        "maxHeight": 50
    },
    "similar-homestays bottom-price": {
        "marginTop": 10,
        "marginRight": 0,
        "marginBottom": 10,
        "marginLeft": 0,
        "fontSize": 0
    },
    "similar-homestays bottom-price price-details": {
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "fontSize": 16,
        "display": "inline-block",
        "verticalAlign": "middle",
        "width": "50%"
    },
    "similar-homestays bottom-price star-rating": {
        "height": 21,
        "width": "50%",
        "textAlign": "right",
        "display": "inline-block",
        "verticalAlign": "middle"
    },
    "similar-homestays bottom-price star-rating span": {
        "WebkitTransform": "scale(.6)",
        "MsTransform": "scale(.6)",
        "OTransform": "scale(.6)",
        "transform": "scale(.6)",
        "marginTop": 1,
        "marginRight": -3,
        "marginBottom": 1,
        "marginLeft": -3
    },
    "similar-homestays grid-sm btnsm": {
        "height": 30
    },
    "details-homestay homestay-details-image": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "border": "1px solid #ddd",
        "width": 120,
        "float": "left"
    },
    "details-homestay details-wrap-stays": {
        "marginLeft": 140
    },
    "details-homestay": {
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": 30,
        "marginLeft": "auto",
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30,
        "minHeight": 226
    },
    "details-students": {
        "backgroundColor": "#fff",
        "border": "1px solid #e6e6e6",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": 30,
        "marginLeft": "auto",
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30,
        "minHeight": 226
    },
    "details-homestay header-wrap": {
        "backgroundColor": "#fff",
        "paddingBottom": 20,
        "color": "#333434",
        "fontFamily": "montserratbold,sans-serif",
        "fontSize": 16,
        "textTransform": "uppercase"
    },
    "details-students header-wrap": {
        "backgroundColor": "#fff",
        "paddingBottom": 20,
        "color": "#333434",
        "fontFamily": "montserratbold,sans-serif",
        "fontSize": 16,
        "textTransform": "uppercase"
    },
    "details-wrap-stays h4": {
        "fontSize": 16,
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif",
        "marginBottom": 10,
        "color": "#4c4e4e"
    },
    "details-wrap-stays p": {
        "marginBottom": 5,
        "fontSize": 13
    },
    "details-wrap-stays p b": {
        "color": "#4c4e4e"
    },
    "two-col-layout": {
        "width": 700,
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto"
    },
    "two-col-layout common-layout-box-wrap": {
        "width": "100%"
    },
    "common-layout-box common-layout-box-wrapthank-you-page": {
        "textAlign": "center"
    },
    "common-layout-box common-layout-box-wrapthank-you-page header-wrap": {
        "paddingTop": 90,
        "paddingRight": 90,
        "paddingBottom": 0,
        "paddingLeft": 90,
        "fontSize": 20
    },
    "common-layout-box common-layout-box-wrapthank-you-page common-layout-content": {
        "paddingTop": 20,
        "paddingRight": 90,
        "paddingBottom": 80,
        "paddingLeft": 90
    },
    "status-active": {
        "fontSize": 12,
        "color": "#fff",
        "fontWeight": "400",
        "textTransform": "none",
        "backgroundColor": "#66BB6A",
        "paddingTop": 4,
        "paddingRight": 10,
        "paddingBottom": 4,
        "paddingLeft": 10,
        "fontFamily": "source_sans_proregular,sans-serif"
    },
    "status-active:focus": {
        "color": "#fff"
    },
    "status-active:hover": {
        "color": "#fff"
    },
    "status-inactive": {
        "backgroundColor": "#ef5350",
        "fontSize": 12,
        "color": "#fff",
        "textTransform": "none",
        "paddingTop": 4,
        "paddingRight": 10,
        "paddingBottom": 4,
        "paddingLeft": 10,
        "fontFamily": "source_sans_proregular,sans-serif"
    },
    "status-inactive:focus": {
        "color": "#fff"
    },
    "status-inactive:hover": {
        "color": "#fff"
    },
    "assign-user-form select2-container": {
        "zIndex": 9999
    },
    "success-message": {
        "color": "#43A047",
        "marginBottom": 10,
        "display": "inline-block",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3
    },
    "detailSlider owl-controls": {
        "position": "absolute",
        "left": 0,
        "top": "50%",
        "width": "100%",
        "marginTop": -28
    },
    "detailSlider owl-buttons div": {
        "backgroundColor": "rgba(255,255,255,.1)",
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "color": "#fff",
        "display": "inline-block",
        "fontSize": 16,
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5,
        "opacity": 1,
        "filter": "alpha(opacity=100)",
        "lineHeight": 0,
        "paddingTop": 15,
        "paddingRight": 10,
        "paddingBottom": 15,
        "paddingLeft": 10,
        "WebkitTransition": "all .2s linear",
        "OTransition": "all .2s linear",
        "transition": "all .2s linear"
    },
    "detailSlider owl-buttons div:hover": {
        "backgroundColor": "rgba(255,255,255,.3)"
    },
    "detailSlider owl-prev": {
        "float": "left"
    },
    "detailSlider owl-next": {
        "float": "right"
    },
    "db-header": {
        "height": 56
    },
    "db-header fluid-container": {
        "paddingLeft": 20,
        "paddingRight": 20
    },
    "dashboard-footer": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "height": 59
    },
    "dashboard-footer fluid-container": {
        "paddingLeft": 20,
        "paddingRight": 20
    },
    "dashboard-footer bottom-footer": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "dashboard-content-wrapper": {
        "position": "relative",
        "minHeight": "calc(100vh - 115px)"
    },
    "dashboard-content-wrapper left-side-bar": {
        "width": 300,
        "position": "absolute",
        "height": "100%",
        "backgroundColor": "#303032",
        "minHeight": 83 * vh
    },
    "dashboard-content-wrapper left-side-bar ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "dashboard-content-wrapper left-side-bar ul li": {
        "display": "block"
    },
    "dashboard-content-wrapper left-side-bar li a": {
        "paddingTop": 17,
        "paddingRight": 20,
        "paddingBottom": 12,
        "paddingLeft": 30,
        "color": "#fff",
        "fontSize": 16,
        "borderBottom": "solid 1px #49494c",
        "display": "block"
    },
    "dashboard-content-wrapper left-side-bar li aactive": {
        "backgroundColor": "#555559"
    },
    "dashboard-content-wrapper left-side-bar li a:hover": {
        "backgroundColor": "#555559"
    },
    "dashboard-content-wrapper left-side-bar li a i": {
        "width": 30,
        "position": "relative",
        "top": 2,
        "fontSize": 18,
        "display": "inline-block"
    },
    "dashboard-content-wrapper right-side-wrapper": {
        "paddingLeft": 300
    },
    "dashboard-content": {
        "paddingTop": 30,
        "paddingRight": 30,
        "paddingBottom": 30,
        "paddingLeft": 30,
        "borderTop": "solid 1px #eee"
    },
    "db-table": {
        "border": "1px solid #ccc"
    },
    "db-table thead tr th": {
        "backgroundColor": "#fff",
        "border": "none",
        "borderBottom": "solid 2px #ddd",
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "textTransform": "uppercase",
        "fontWeight": "400",
        "fontFamily": "Conv_SourceSansPro-Semibold,sans-serif"
    },
    "db-table tbody tr td": {
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "backgroundColor": "#f5f5f5",
        "border": "none!important"
    },
    "db-table tbody tr:nth-child(2n+1) td": {
        "backgroundColor": "#fff"
    },
    "header signin-opt-drop": {
        "display": "inline-block",
        "marginTop": -5
    },
    "header signin-opt-drop dropdown-menu": {
        "display": "none",
        "left": "auto",
        "right": 3,
        "marginTop": 7,
        "borderRadius": 3,
        "MozBorderRadius": 3,
        "WebkitBorderRadius": 3,
        "MsBorderRadius": 3,
        "border": "none"
    },
    "header signin-opt-drop dropdown-menu::after": {
        "content": "''",
        "width": 0,
        "position": "absolute",
        "height": 0,
        "right": 6,
        "borderLeft": "6px solid transparent",
        "borderRight": "6px solid transparent",
        "borderBottom": "6px solid #da190b",
        "top": -6
    },
    "header signin-opt-drop dropdown-menu::before": {
        "content": "''",
        "width": 0,
        "position": "absolute",
        "height": 0,
        "right": 6,
        "borderLeft": "6px solid transparent",
        "borderRight": "6px solid transparent",
        "borderBottom": "6px solid #ccc",
        "top": -7
    },
    "header signin-opt-dropopen>dropdown-menu": {
        "display": "block"
    },
    "header signin-opt-drop button img": {
        "display": "inline-block",
        "width": 32,
        "border": "1px solid #eee",
        "backgroundColor": "#eee",
        "verticalAlign": "middle",
        "borderRadius": "50%",
        "MozBorderRadius": "50%",
        "WebkitBorderRadius": "50%",
        "MsBorderRadius": "50%",
        "overflow": "hidden"
    },
    "header signin-opt-drop ul li": {
        "display": "block"
    },
    "header signin-opt-drop ul li:first-child a": {
        "borderRadius": "3px 3px 0 0",
        "MozBorderRadius": "3px 3px 0 0",
        "WebkitBorderRadius": "3px 3px 0 0",
        "MsBorderRadius": "3px 3px 0 0"
    },
    "header signin-opt-drop ul li:last-child a": {
        "borderRadius": "0 0 3px 3px",
        "MozBorderRadius": "0 0 3px 3px",
        "WebkitBorderRadius": "0 0 3px 3px",
        "MsBorderRadius": "0 0 3px 3px"
    },
    "header signin-opt-drop ul li a": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "display": "block"
    },
    "header signin-opt-drop ul li aactive": {
        "backgroundColor": "#f3291b",
        "color": "#fff",
        "fontFamily": "montserratregular,sans-serif",
        "textTransform": "uppercase"
    },
    "top-strip-db": {
        "marginBottom": 15
    }
});