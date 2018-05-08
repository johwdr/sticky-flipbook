require('../styles/styles.scss');


import StickyFlipbookScroller from './components/sticky-flipbook-scroller/sticky-flipbook-scroller';


function init() {
    const component = new StickyFlipbookScroller();
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

