require('../styles/styles.scss');


import StickyImageScroller from './components/sticky-image-scroller/sticky-image-scroller';


function init() {
    const component = new StickyImageScroller();
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

