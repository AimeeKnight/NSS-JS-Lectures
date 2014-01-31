(function(){
  /* global Animal: false */

  'use strict';

  window.animalFactory = function(){
    var animals = [];
    var animal;

    var photos = [];
    photos[0] = 'url(http://www.petparadisetx.com/dog3.jpeg)';
    photos[1] = 'url(http://www.moveoneinc.com/blog/wp-content/uploads/2011/12/Dog-2.jpg)';
    animal = new Animal('Dog', 'Brown', 'Fido', 3, 'female', 'Happy', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://upload.wikimedia.org/wikipedia/commons/2/22/Turkish_Van_Cat.jpg)';
    photos[1] = 'url(http://jasonlefkowitz.net/wp-content/uploads/2013/07/big_cat_found_spoh-760994.jpg)';
    animal = new Animal('Cat', 'Black', 'Felix', 3, 'male', 'Scared', photos);
    animals.push(animal);

    photos = [];
    photos[0] = 'url(http://digital-photography-school.com/wp-content/uploads/2007/02/images/bird-photography.jpg)';
    photos[1] = 'url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRZh6sgP48_k0DMErOr-tF8E8aIyIiNenA5tS_SnI1GuzgfxSe2)';
    animal = new Animal('Bird', 'Red', 'Flutter', 2, 'female', 'Loud', photos);
    animals.push(animal);
    // debugger;
    return animals;
  };

})();
