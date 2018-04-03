var enemy = function(x, y) {
    worldobject.call(this, x, y);
    
    this.w = Constants.BlockSize;
    this.h = Constants.BlockSize;
    this.deleteMe = false;

    this.act = function() {};
    this.reactToTouch = function() {};

    this.draw = function() {
        DOWN.drawWorldSprite(this.mySprite, this.x, this.y);
    };
    
    // special instance of hitbox to determine collision vs player
    this.getMyHitbox = function() {
        return { x: this.x, y: this.y, w: this.w, h: this.h };
    };

    // does our special hitbox intersect with the player sprite?
    this.isOverlappingPlayer = function() {
        return DOWN.overlap(DOWN.player, this.getMyHitbox());
    };

    // override this if enemy does anything other than kill the player upon touch
    this.reactToTouch = function() {
        if (!DOWN.debug) {
            var a = DOWN.getAngle(DOWN.player, this.getMyHitbox());
            DOWN.player.setVelocitiesFromAngle(a);
            DOWN.player.dieOf(this.killerName);
        }
    };

    this.drawDebugRects = function() {
        this.drawCollisionRects();
        DOWN.debugRect(this.getMyHitbox(), Constants.Colors.DebugRed);
    };

    this.drawCollisionRects = function() {
        this.getMyCollidables();
        for (var i=0; i!=4; ++i) {
            var t = DOWN.collisionTiles[i];

            if (!t) continue;
            DOWN.debugRect(t, Constants.Colors.DebugMagenta);
        }
    };
};