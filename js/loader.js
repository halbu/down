var AssetManager = function () {
    this.sprites = {};

    this.loadSprites = function(spritelist) {
        spritelist.forEach(s => {
            var i = new Image();
            i.src = "assets/" + s + ".png";
            this.sprites[s] = i;
        });
    };

    this.getSprite = function(str) {
        return this.sprites[str];
    };
};