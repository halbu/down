var spike = function(x, y) {
    enemy.call(this, x, y);
    
    this.mySprite = 'spikes';
    this.killerName = 'IMPALEMENT';

    this.getMyHitbox = function() {
        return { x: this.x, y: this.y + Constants.BlockSize / 2, w: this.w, h: Constants.BlockSize / 2 };
    };
};