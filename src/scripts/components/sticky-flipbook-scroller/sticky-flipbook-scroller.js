'use strict';

require('intersection-observer');


export default class StickyImageScroller {
    constructor(conf) {

        this.container = document.querySelector('[data-webdok-sticky-flipbook-scroll-container]');
        if (!this.container) {
            console.error('No sticky container')
            return;
        }
        this.breakpoint = this.container.dataset.breakpoint;

        this.currentElement = null;
        this.currentImages = null;
        this.currentScrollpos = null;
        this.currentIndex = null;

        this.createPictureComponent();

        this.build();


    }

    build() {
        this.createPictureComponent();
        this.container.appendChild(this.pictureComponent)
        this.setupIntersections();
        this.checkImage();

    }

    checkImage() {
        if (this.currentScrollpos != window.scrollY && this.currentElement && this.currentImages && this.currentImages.length) {
            this.currentScrollpos = window.scrollY;


            const rect = this.currentElement.getBoundingClientRect();
            console.log('rect.top', rect.top)
            console.log('rect.height', rect.height)


            const perImg = (rect.height*2) / (this.currentImages.length);
            const index = this.currentImages.length - (Math.ceil((rect.top + rect.height) / perImg) );
            console.log('length', this.currentImages.length)
            console.log('calc', (Math.floor((rect.top + rect.height) / perImg) ))
            console.log('index', index)
            if (index != this.currentIndex && this.currentImages[index]) {
                console.log(this.currentImages[index].toString().trim())

                console.log(this.img, this.source);
                this.source.srcset = this.currentImagesMobile[index].toString().trim();
                this.img.src = this.currentImages[index].toString().trim();
                this.currentIndex = index;
            }


        }

        window.requestAnimationFrame(() => {
            this.checkImage();
        })
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

        this.intersections = document.querySelectorAll('[data-sticky-flipbook-waypoint]');

        for (let n=0; n<this.intersections.length; n++) {
            this.intersections[n]
            this.observer.observe(this.intersections[n]);
        }


    }


    intersectionCallback(event) {
        if (event[0].isIntersecting) {
            const el = event[0].target;
            this.currentElement = el;
            this.currentImages = (el.dataset.images) ? el.dataset.images.split(',') : null;

            this.currentImagesMobile = (el.dataset.imagesMobile) ? el.dataset.imagesMobile.split(',') : null;



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
        } else {
            const el = event[0].target;
            if (this.currentElement == el) {
                console.log('exit');
                console.log(el);
                this.currentElement = null;
                this.currentIndex = null;
                this.currentImages = null;
                this.source.srcset = '';
                this.img.src = '';
                this.container.classList.add('wsis-noimage')
            }
        }

    }

}