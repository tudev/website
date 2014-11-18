module.exports = {
    time: {
        sequence: function(splits) {
            for (var split in splits) {
                setTimeout(splits[split], split);
            }
        }
    },
    ui: {
        waitForImages: function(images, done) {
            var img, count = 0, callback = function() {
                if (count === images.length - 1) {
                    done();
                }
            };

            for (var i = 0; i < images.length; i++) {
                img = new Image();
                img.onload = callback;
                img.src = images[i];
            }
        }
    }
}