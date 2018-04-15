var player = function (x, y) {
    worldobject.call(this, x, y);

    this.yv = 0;
    this.xv = 0;
    this.w = 21;
    this.h = 21;

    this.maxRunSpeed = 4.25;
    this.jumpImpulse = -5.5;
    this.isGrounded = false;
    this.facing = 'R';
    this.state = 'ALIVE';
    this.jumpState = 'NOJUMP';
    this.jumpBoostFrames = 0;
    this.maxJumpBoostFrames = 10;
    this.causeOfDeath = '';

    this.act = function() {
        
        if (this.state === 'ALIVE') {
            if (DOWN.KB[87] && this.isGrounded) {
                this.isGrounded = false;
                this.yv += (this.jumpImpulse - this.yv) / 4;
                this.jumpBoostFrames = 0;
                this.jumpState = 'BOOSTING';
            } else if (DOWN.KB[87] && this.jumpState === 'BOOSTING') {
                this.jumpBoostFrames++;
                this.yv += (this.jumpImpulse - this.yv) / 4;
                if (this.jumpBoostFrames === this.maxJumpBoostFrames) {
                    this.jumpBoostFrames = 0;
                    this.jumpState = 'NOJUMP';
                }
            } else if (!DOWN.KB[87] && this.jumpState === 'BOOSTING') {
                this.jumpState = 'NOJUMP';
            }

            if (this.isGrounded) {
                this.isGrounded = false;
            } else {
                this.yv += Constants.Gravity;
            }

            if (DOWN.KP === 223) { // press ` to toggle debug mode
                DOWN.debug = !DOWN.debug;
            }

            if (DOWN.KB[65]) {
                this.xv -= this.maxRunSpeed / 5;
            } else if (DOWN.KB[68]) {
                this.xv += this.maxRunSpeed / 5;
            } else this.xv *= 0.575;
        } else {
            this.yv += Constants.Gravity * 0.7;
            this.xv *= 0.935;
        }

        this.xv = DOWN.clamp(this.xv, -this.maxRunSpeed, this.maxRunSpeed);
        this.setFacing();
    };

    this.update = function() {

        // Collide and resolve horizontally
        this.x += this.xv;
        this.getMyCollidables();

        for (var i=0; i!=DOWN.collisionTiles.length; ++i) {
            var testTile = DOWN.collisionTiles[i];
            if (!testTile.c) continue;
            if (DOWN.overlap(this, testTile)) {
                this.x = (this.xv < 0) ? testTile.rightEdge() + 0.01 : testTile.leftEdge() - this.w - 0.01;
                this.xv = 0;
            }
        }

        // Collide and resolve vertically
        this.y += this.yv;

        // Treat the top of the play area as a solid ceiling
        if (this.y - DOWN.yOffset < 0) {
            this.y = DOWN.yOffset + 0.01;
            this.yv = 1;
        }

        this.getMyCollidables();

        for (var i=0; i!=DOWN.collisionTiles.length; ++i) {
            var t = DOWN.collisionTiles[i];
            if (!t.c) continue;
            if (DOWN.overlapMoreThanJustATinyBitInTheYDirection(this, t)) {
                if (this.yv < 0) {
                    this.y = t.y + t.h + 0.01;
                    this.yv = 1;
                } else {
                    t.reactToTouch();
                    this.y = t.y - this.h - 0.01;
                    this.isGrounded = true;
                    if (this.yv > Constants.FatalFallVelocity) {
                        this.dieOf('FAILURE TO FLY');
                        this.yv = -3;
                    } else {
                        this.yv = 0;
                    }
                }
            }
        }

        // Have we been squished against the roof while standing on a rising block?
        if (this.y - DOWN.yOffset < 0) {
            this.dieOf('CRUSHING');
        }

        // Have we plummeted into the endless Beyond
        if (this.y >= DOWN.cnv.height) {
            this.dieOf('FALLING FOREVER');
        }
    };

    this.dieOf = function(killer) {
        if (this.state === 'DEAD') return;
        this.state = 'DEAD';
        this.causeOfDeath = killer;
    };
    
    this.draw = function() {
        var spriteString = 'player_' +
            (this.state === 'DEAD' ? 'dead_' : '') +
            (this.facing === 'R' ? 'r' : 'l');
        DOWN.drawWorldSprite(spriteString, this.x, this.y);
    };

    this.setVelocitiesFromAngle = function(a) {
        var velocity = 2;
        this.xv = velocity * Math.cos(a);
        this.yv = velocity * Math.sin(a);
    };
};