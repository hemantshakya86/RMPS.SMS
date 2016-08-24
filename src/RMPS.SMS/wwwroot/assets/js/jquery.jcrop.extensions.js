; (function ($) {

    function calculateRatio(currentSize, destinationSize, upscale) {
        var srcSize = currentSize;
        var destSize = destinationSize;
        if (srcSize.width <= destSize.width && srcSize.height <= destSize.height) {

            if (!upscale) return 1;
        }
        var ratioX = destSize.width / srcSize.width;
        var ratioY = destSize.height / srcSize.height;
        // use whichever multiplier is smaller
        return ratioX < ratioY ? ratioX : ratioY;
    }
    function calculateScaledSize(boxSize, actualSize, sizeNeeded) {
        var ratio = calculateRatio(actualSize, boxSize);
        if (sizeNeeded) {
            if (ratio < 1) {
                ratio = calculateRatio(boxSize, actualSize, true);
            }

            return {
                width: sizeNeeded.width * ratio,
                height: sizeNeeded.height * ratio
            };
        } else {
            return {
                width: actualSize.width * ratio,
                height: actualSize.height * ratio
            };
        }
    }
    function calculateCenterPosition(boxSize, actualSize, sizeNeeded) {
        var ratio = calculateRatio(actualSize, boxSize);

        if (ratio < 1) {
            ratio = calculateRatio(boxSize, actualSize, true);
        }

        var width = sizeNeeded.width * ratio;
        var height = sizeNeeded.height * ratio;
        var x = (actualSize.width - width) / 2;
        var y = (actualSize.height - height) / 2;
        return [
            x,
            y,
            x + width,
            y + height
        ];
    }

    var methods = {
        init: function (options) {
            return this.each(function () {
                this.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'

                var boxSize = calculateScaledSize({ width: options.boxSize[0], height: options.boxSize[1] }, { width: options.actualSize[0], height: options.actualSize[1] });
                var minSize = calculateScaledSize({ width: options.boxSize[0], height: options.boxSize[1] }, { width: options.actualSize[0], height: options.actualSize[1] }, { width: options.canvasSize[0], height: options.canvasSize[1] });
                var initPosition = calculateCenterPosition({ width: options.boxSize[0], height: options.boxSize[1] }, { width: options.actualSize[0], height: options.actualSize[1] }, { width: options.canvasSize[0], height: options.canvasSize[1] });

                var $this = $(this).width(boxSize.width).height(boxSize.height);
                if (options.source) {
                    $this.attr('src', options.source);
                }
                

                if (!$this.data('jcrop-canvas')) {
                    var id = _.uniqueId('jcrop-canvas-');
                    $this.data('jcrop-canvas', id);
                    $this.parent().append('<canvas id="' + id + '" width="' + options.canvasSize[0] + '" height="' + options.canvasSize[1] + '" style="display:none;"></canvas>');

                    updatedeviceRatio();

                    $this.Jcrop({
                        trueSize: [options.actualSize[0], options.actualSize[1]],
                        aspectRatio: options.canvasSize[0]/ options.canvasSize[1],
                        minSize: [minSize.width, minSize.height],
                        setSelect: initPosition,
                        onChange: updatePreview,
                        onSelect: updatePreview
                    }, function () {
                        $this.data('jcrop-canvas-api', this);
                    });
                }
                
                
                function updatedeviceRatio() {
                    var canvas = $('#' + $this.data('jcrop-canvas')).get(0);
                    var context = canvas.getContext("2d");
                    var devicePixelRatio = window.devicePixelRatio || 1,
                        backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1,
                        pixelRatio = devicePixelRatio / backingStoreRatio;


                    // upscale the canvas if the two ratios don't match
                    if (devicePixelRatio !== backingStoreRatio) {

                        var oldWidth = canvas.width;
                        var oldHeight = canvas.height;

                        canvas.width = oldWidth * ratio;
                        canvas.height = oldHeight * ratio;

                        canvas.style.width = oldWidth + 'px';
                        canvas.style.height = oldHeight + 'px';

                        // now scale the context to counter
                        // the fact that we've manually scaled
                        // our canvas element
                        context.scale(pixelRatio, pixelRatio);

                    }
                }

                function updatePreview(c) {
                    if (parseInt(c.w) > 0) {
                        var imageObj = $this.get(0);
                        var canvas = $('#' + $this.data('jcrop-canvas')).get(0);
                        var context = canvas.getContext("2d");
                        context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
                    }
                }
            });
        },

        toDataURL: function () {
            var $this = $(this);

            var canvas = $('#' + $this.data('jcrop-canvas')).get(0);

            return canvas.toDataURL("image/jpeg");

        },

        destroy: function() {
            var $this = $(this);
            if ($this.data('jcrop-canvas')) {

                var canvas = $('#' + $this.data('jcrop-canvas')).get(0);
                var cropper = $this.data('jcrop-canvas-api');
                cropper.destroy();
                //canvas.remove();
                canvas.remove; // changed bcz of error in firefox n IE
                $this.removeData('jcrop-canvas', 'jcrop-canvas-api');
            }

            return this;
        }        
    };

    $.fn.jcrop = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };




})(jQuery);