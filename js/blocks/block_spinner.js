var spinner_block = function (x, y, t) {
    block.call(this, x, y, t);
    this.c = true;

    DOWN.enemies.push(new spinner(this.x + Constants.BlockSize / 2, this.y + Constants.BlockSize / 2));
};
