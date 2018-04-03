var block = function (x, y, t) {
    worldobject.call(this, x, y);
    
    this.t = t;
    this.c = (this.t === 1) ? true : false;

    this.reactToTouch = function() {};

    this.draw = function() {
        if (this.y > DOWN.cnv.height) return; // if we're offscreen don't bother drawing
        
        var spriteString = '';
        switch(t) {
            case 1:     spriteString = 'block';             break;
            case 2:     spriteString = 'bg_witheredtree';   break;
            case 3:     spriteString = 'bg_rock';           break;
            case 7:     spriteString = 'block_spinner';     break;
            case 9:     spriteString = 'bg_chain';          break;
            default:    spriteString = 'nothing';           break;
        }
        
        if (spriteString !== 'nothing') {
            DOWN.drawWorldSprite(spriteString, this.x, this.y);
        }
    };
};
