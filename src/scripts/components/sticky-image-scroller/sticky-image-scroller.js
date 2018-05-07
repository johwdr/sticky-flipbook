'use strict';

require('intersection-observer');


export default class StickyImageScroller {
    constructor(conf) {

        this.container = document.querySelector('[data-webdok-sticky-image-scroll-container]');
        if (!this.container) {
            console.error('No sticky container')
            return;
        }
        this.breakpoint = this.container.dataset.breakpoint;

        this.createPictureComponent();

        this.build();


    }

    build() {
        this.createPictureComponent();
        this.container.appendChild(this.pictureComponent)
        this.setupIntersections();

    }

    createPictureComponent() {

        this.pictureComponent = document.createElement('div');
        this.pictureComponent.id = 'wsis-picture-container';

        this.pictureElement =  document.createElement('picture');

        this.source = document.createElement('source');
        this.source.id = 'wsis-picture-mobile';
        this.source.media = `(max-width: ${this.breakpoint}px)`;

        this.img = document.createElement('img');
        this.img.id = 'wsis-picture-desktop';


        this.pictureElement.appendChild(this.source)
        this.pictureElement.appendChild(this.img)

        this.pictureComponent.appendChild(this.pictureElement);

    }
    setupIntersections() {


        var audioObserverOptions = {
            root: null,
            rootMargin: '0px',
        }

        this.observer = new IntersectionObserver(event => {
            this.intersectionCallback(event);
        }, audioObserverOptions);

        this.intersections = document.querySelectorAll('[data-sticky-image-waypoint]');

        for (let n=0; n<this.intersections.length; n++) {
            this.intersections[n]
            this.observer.observe(this.intersections[n]);
        }


    }

    intersectionCallback(event) {
        if (event[0].isIntersecting) {
            const el = event[0].target;
            this.source.srcset = (el.dataset.noImage) ? '' : el.dataset.imageMobile;
            this.img.src = (el.dataset.noImage) ? '' : el.dataset.image;

            if (el.dataset.imageClass && !this.pictureComponent.classList.contains(el.imageClass)) {
                this.container.classList.add(el.dataset.imageClass)
            }
            if (!el.dataset.imageClass || el.dataset.imageClass != this.currentClass) {
                this.container.classList.remove(this.currentClass)
                this.currentClass = (el.dataset.imageClass) ? el.dataset.imageClass : null;
            }

            if (el.dataset.noImage) {
                this.container.classList.add('wsis-noimage')
            } else {
                this.container.classList.remove('wsis-noimage')
            }
        }

    }

}