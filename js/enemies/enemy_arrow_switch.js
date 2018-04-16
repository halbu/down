
var arrow_switch = function(x, y) {
    enemy.call(this, x, y);
    
    this.mySprite = 'enemy_switch';
    this.killerName = 'SOME WEIRD BUG??';

    this.getMyHitbox = function() {
        return {
            x: this.x + Constants.BlockSize / 4,
            y: this.y + 3 * Constants.BlockSize / 4,
            w: this.w - Constants.BlockSize / 2,
            h: Constants.BlockSize / 4
        };
    };

    this.reactToTouch = function() {
        var gx = this.getMyGridPosition().x;
        var gy = this.getMyGridPosition().y;

        var foundSideBlock = false;
        var pos = gx;

        while(pos >=0 && !foundSideBlock) {
            if (DOWN.mapGrid[gy][pos].t === 1) {
                foundSideBlock = true;
            } else pos--;
        }

        if (!foundSideBlock) return;

        this.deleteMe = true;

        DOWN.enemies.push(new arrow((pos + 1) * Constants.BlockSize, gy * Constants.BlockSize));
    };
};