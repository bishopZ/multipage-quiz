import _ from 'underscore';

// helper function
// from https://github.com/ryantenney/underscore/commit/4890699d922cc9924ea28dd9ed21c1fefe33e4de
// similar to https://lodash.com/docs#shuffle
_.mixin({
  shuffle : function(obj) {
    var shuffled = [], rand;
    _.each(obj, function(value, index) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  }
});
