var worldobject = function(x, y) {
    Object.assign(this, {x, y});
    this.w = Constants.BlockSize;
    this.h = Constants.BlockSize;

    this.getMyGridPosition = function() {
        return {
            x: DOWN.clamp(Math.floor(this.x / Constants.BlockSize), 0, Constants.PlayArea.Width),
            y: DOWN.clamp(Math.floor(this.y / Constants.BlockSize), 0, DOWN.mapGrid.length)
        };
    };

    this.getMyCollidables = function() {
        var gx = this.getMyGridPosition().x;
        var gy = this.getMyGridPosition().y;

        DOWN.collisionTiles = [];

        for (var i = 0; i <= 1; ++i) for (var j = 0; j <= 1; ++j) {
            if (DOWN.mapGrid[gy + j] === undefined) continue;
            if (DOWN.mapGrid[gy + j][gx + i] === undefined) continue;
            
            DOWN.collisionTiles.push(DOWN.mapGrid[gy + j][gx + i]);
        }
    };

    this.setFacing = function() {
        if (this.xv < 0) this.facing = 'L';
        if (this.xv > 0) this.facing = 'R';
    };

    this.leftEdge = function()      { return this.x; };
    this.rightEdge = function()     { return this.x + this.w; };
    this.topEdge = function()       { return this.y; };
    this.bottomEdge = function()    { return this.y + this.h; };

    this.getCentrePoint = function() { // TODO: not currently used
        return { x: (this.x + this.w / 2), y: (this.y + this.h / 2) };
    };
};